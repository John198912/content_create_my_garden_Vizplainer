#!/usr/bin/env node
/**
 * check-design-tokens.mjs — 设计基准静态断言器
 * ------------------------------------------------------------------
 * 基于本次升级的 12 个通用动效原语，对照 qa/design-baseline.json，
 * 静态解析 CSS（不启浏览器），断言：
 *
 *   1. 全局 token（durations / easings / text-ghost）未漂移
 *   2. 12 原语 + window-frame 全部存在，且步进开关契约（.in / .is-active）成立
 *   3. 所有原语在 prefers-reduced-motion 块里都有降级
 *   4. 级联淡入速度：--cascade-step 在 [50,140]ms、--cascade-rise 在 [8,28]px，
 *      且各主题数值与基准一致 + 气质排序（Swiss 最克制 < newsroom 最稳重）不破
 *   5. 辉光强度阈值：--glow-strength 在 [0,0.6]，restrained ≤0.20 / expressive ≥0.40，
 *      --orb-opacity 比 glow 更克制
 *   6. 字体梯度：5 档文字色单调递减（相对底色对比度严格递减），正文 WCAG ≥4.5:1
 *   7. 强调色预算：定义 --accent-2 的主题必须定义 --accent；
 *      --accent-soft / --accent-glow 必须与 --accent 同色相（透明度叠层）
 *   8. 对比表叙事格式：comparison-frame EXAMPLE 的 README 遵守 5 条叙事铁律
 *
 * 用法:
 *   node qa/check-design-tokens.mjs            # 跑全部断言
 *   node qa/check-design-tokens.mjs --quiet    # 只在失败时输出
 *
 * 退出码: 0 = 全过；1 = 有 FAIL
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const QUIET = process.argv.includes('--quiet');

// ───────────────────────── 报告器 ─────────────────────────
let pass = 0;
let fail = 0;
const failures = [];

function ok(msg) {
  pass++;
  if (!QUIET) console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
}
function bad(msg, detail) {
  fail++;
  failures.push({ msg, detail });
  console.log(`  \x1b[31m✕\x1b[0m ${msg}`);
  if (detail) console.log(`      \x1b[2m${detail}\x1b[0m`);
}
function section(title) {
  if (!QUIET) console.log(`\n\x1b[1m${title}\x1b[0m`);
}

// ─────────────────────── 文件载入 ───────────────────────
const baseline = JSON.parse(readFileSync(join(__dirname, 'design-baseline.json'), 'utf8'));

function loadOrDie(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    bad(`源文件缺失: ${rel}`);
    return '';
  }
  return readFileSync(p, 'utf8');
}

const baseCss = loadOrDie(baseline.lastSyncedFrom.base_css);
const animCss = loadOrDie(baseline.lastSyncedFrom.animations_css);
const themesCss = loadOrDie(baseline.lastSyncedFrom.themes_css);

// ─────────────────── CSS 解析工具 ───────────────────
/** 从一段 CSS 文本里取某个自定义属性的值（首次出现） */
function readVar(css, name) {
  const re = new RegExp(`${name.replace(/[-\\]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const m = css.match(re);
  return m ? m[1].trim() : null;
}

/** 抽出某主题 [data-theme="id"] { ... } 的块体 */
function themeBlock(id) {
  const start = themesCss.indexOf(`[data-theme="${id}"]`);
  if (start < 0) return null;
  const open = themesCss.indexOf('{', start);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < themesCss.length; i++) {
    const c = themesCss[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return themesCss.slice(open + 1, i);
    }
  }
  return null;
}

function num(str) {
  if (str == null) return NaN;
  const m = String(str).match(/-?[\d.]+/);
  return m ? parseFloat(m[0]) : NaN;
}

// ────────── 颜色 → 相对亮度 / 对比度（WCAG）──────────
function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const int = parseInt(h, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}
function parseColor(str) {
  if (!str) return null;
  str = str.trim();
  if (str.startsWith('#')) return { rgb: hexToRgb(str), a: 1 };
  const rgba = str.match(/rgba?\(([^)]+)\)/);
  if (rgba) {
    const parts = rgba[1].split(',').map((s) => s.trim());
    return {
      rgb: [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])],
      a: parts[3] != null ? parseFloat(parts[3]) : 1,
    };
  }
  return null;
}
/** 把带 alpha 的前景合成到不透明底色上 */
function flatten(fg, bg) {
  return fg.rgb.map((c, i) => Math.round(c * fg.a + bg.rgb[i] * (1 - fg.a)));
}
function relLum(rgb) {
  const a = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function contrast(fgStr, bgStr) {
  const fg = parseColor(fgStr);
  const bg = parseColor(bgStr);
  if (!fg || !bg) return null;
  const fgFlat = fg.a < 1 ? { rgb: flatten(fg, bg), a: 1 } : fg;
  const L1 = relLum(fgFlat.rgb);
  const L2 = relLum(bg.rgb);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}
/** HSL 色相（用于同色相判断）。带 alpha 的色先合成到中性灰再算。 */
function hueOf(str) {
  const c = parseColor(str);
  if (!c) return null;
  const rgb = c.a < 1 ? flatten(c, { rgb: [128, 128, 128], a: 1 }) : c.rgb;
  const [r, g, b] = rgb.map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d < 0.02) return null; // 近灰，无明显色相
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return h;
}
function hueClose(h1, h2, tol = 25) {
  if (h1 == null || h2 == null) return true; // 一方近灰则跳过（不判失败）
  let d = Math.abs(h1 - h2);
  if (d > 180) d = 360 - d;
  return d <= tol;
}

const V2 = baseline.visualRegression.templates; // 视觉回归快照主题列表
// MOTION = 凡定义了完整动效套件的主题（D-2 后 6 个）。静态 token 校验遍历此列表，
// 与「需要 PNG 快照」的 visualRegression.templates 解耦。
const MOTION = baseline.motionThemes.themes;

// ════════════════════════════════════════════════════════
// 1. 全局 token
// ════════════════════════════════════════════════════════
section('1. 全局动效 token（base.css :root）');
{
  for (const [name, want] of Object.entries(baseline.globalTokens.durations)) {
    const got = readVar(baseCss, name);
    if (got === want) ok(`${name} = ${want}`);
    else bad(`${name} 漂移`, `期望 ${want}，实际 ${got}`);
  }
  for (const [name, want] of Object.entries(baseline.globalTokens.easings)) {
    const got = readVar(baseCss, name);
    const norm = (s) => (s || '').replace(/\s+/g, '');
    if (norm(got) === norm(want)) ok(`${name} = ${want}`);
    else bad(`${name} 漂移`, `期望 ${want}，实际 ${got}`);
  }
  const tg = readVar(baseCss, baseline.globalTokens.textGhost.token);
  const wantTg = baseline.globalTokens.textGhost.expected;
  if (tg && tg.replace(/\s+/g, '') === wantTg.replace(/\s+/g, ''))
    ok(`--text-ghost 默认值 = ${wantTg}`);
  else bad('--text-ghost 默认值漂移', `期望 ${wantTg}，实际 ${tg}`);

  // O-2: scene-gap 语义档（A2 / Top8 #6 单一节奏单元）
  const sg = baseline.globalTokens.sceneGap;
  if (sg) {
    const got = readVar(baseCss, sg.token);
    if (got && got.replace(/\s+/g, '') === sg.expected.replace(/\s+/g, ''))
      ok(`${sg.token} = ${sg.expected}`);
    else bad(`${sg.token} 未落地/漂移`, `期望 ${sg.expected}，实际 ${got}`);
    for (const v of sg.variants || []) {
      if (readVar(baseCss, v)) ok(`scene-gap 变体存在: ${v}`);
      else bad(`scene-gap 变体缺失: ${v}`);
    }
  }
}

// ════════════════════════════════════════════════════════
// 2. 12 原语存在 + 步进开关契约
// ════════════════════════════════════════════════════════
section('2. 动效原语存在性 + 步进开关契约');
{
  for (const cls of baseline.primitives.required) {
    // 找形如 `.cascade ` / `.cascade.` / `.cascade>` / `.cascade{` 的定义
    const re = new RegExp(`\\${cls}(\\s|\\.|>|::|,|{|$)`, 'm');
    if (re.test(animCss)) ok(`原语存在: ${cls}`);
    else bad(`原语缺失: ${cls}`);
  }
  for (const sel of baseline.primitives.stepToggleContract.dotIn) {
    if (animCss.includes(sel)) ok(`步进开关(.in): ${sel}`);
    else bad(`缺步进开关: ${sel}`, '该原语必须靠 .in 驱动，否则违反「一节拍=一step」');
  }
  for (const sel of baseline.primitives.stepToggleContract.isActive) {
    if (animCss.includes(sel)) ok(`步进开关(.is-active): ${sel}`);
    else bad(`缺步进开关: ${sel}`);
  }
}

// ════════════════════════════════════════════════════════
// 3. reduced-motion 降级
// ════════════════════════════════════════════════════════
section('3. prefers-reduced-motion 降级覆盖');
{
  const idx = animCss.indexOf('prefers-reduced-motion');
  if (idx < 0) {
    bad('未找到 prefers-reduced-motion 块');
  } else {
    const rmBlock = animCss.slice(idx);
    for (const cls of baseline.primitives.reducedMotionGuard.mustAppear) {
      if (rmBlock.includes(cls)) ok(`减动降级覆盖: ${cls}`);
      else bad(`减动块缺少: ${cls}`, '减动用户可能看到空帧/抽搐');
    }
  }
}

// ════════════════════════════════════════════════════════
// 4. 级联淡入速度
// ════════════════════════════════════════════════════════
section('4. 级联淡入速度（--cascade-step / --cascade-rise）');
{
  const stepRange = baseline.cascadeSpeed.cascadeStep;
  const riseRange = baseline.cascadeSpeed.cascadeRise;
  const stepByTheme = {};

  for (const theme of MOTION) {
    const block = themeBlock(theme);
    if (!block) {
      bad(`主题块缺失: ${theme}`);
      continue;
    }
    const step = num(readVar(block, '--cascade-step'));
    const rise = num(readVar(block, '--cascade-rise'));
    stepByTheme[theme] = step;

    // 与基准定值一致
    const wantStep = num(baseline.cascadeSpeed.perTheme[theme]['--cascade-step']);
    const wantRise = num(baseline.cascadeSpeed.perTheme[theme]['--cascade-rise']);
    if (step === wantStep) ok(`${theme} --cascade-step = ${step}ms`);
    else bad(`${theme} --cascade-step 漂移`, `期望 ${wantStep}ms，实际 ${step}ms`);
    if (rise === wantRise) ok(`${theme} --cascade-rise = ${rise}px`);
    else bad(`${theme} --cascade-rise 漂移`, `期望 ${wantRise}px，实际 ${rise}px`);

    // 落在全局合理区间
    if (step >= stepRange.minMs && step <= stepRange.maxMs)
      ok(`${theme} cascade-step 在 [${stepRange.minMs},${stepRange.maxMs}]ms`);
    else bad(`${theme} cascade-step 越界`, `${step}ms 不在 [${stepRange.minMs},${stepRange.maxMs}]`);
    if (rise >= riseRange.minPx && rise <= riseRange.maxPx)
      ok(`${theme} cascade-rise 在 [${riseRange.minPx},${riseRange.maxPx}]px`);
    else bad(`${theme} cascade-rise 越界`, `${rise}px 不在 [${riseRange.minPx},${riseRange.maxPx}]`);
  }

  // 气质排序断言：stepAscending 列表必须严格递增（克制→稳重）
  const order = baseline.cascadeSpeed.ordering.stepAscending;
  let monoOk = true;
  let detail = order.map((t) => `${t}=${stepByTheme[t]}ms`).join(' < ');
  for (let i = 1; i < order.length; i++) {
    if (!(stepByTheme[order[i]] >= stepByTheme[order[i - 1]])) monoOk = false;
  }
  if (monoOk) ok(`气质排序成立: ${detail}`);
  else bad('级联气质排序被打破', detail);
}

// ════════════════════════════════════════════════════════
// 5. 辉光强度阈值
// ════════════════════════════════════════════════════════
section('5. 辉光强度阈值（--glow-strength / --orb-opacity）');
{
  const gr = baseline.glowStrength.range;
  const restrainedMax = baseline.glowStrength.thresholds.restrained.max;
  const expressiveMin = baseline.glowStrength.thresholds.expressive.min;
  const cls = baseline.glowStrength.classification;
  const orbRange = baseline.glowStrength.orbOpacity.range;

  for (const theme of MOTION) {
    const block = themeBlock(theme);
    if (!block) continue;
    const glow = num(readVar(block, '--glow-strength'));
    const want = baseline.glowStrength.perTheme[theme];

    if (glow === want) ok(`${theme} --glow-strength = ${glow}`);
    else bad(`${theme} --glow-strength 漂移`, `期望 ${want}，实际 ${glow}`);

    if (glow >= gr.min && glow <= gr.max) ok(`${theme} glow 在 [${gr.min},${gr.max}]`);
    else bad(`${theme} glow 越界`, `${glow} 不在 [${gr.min},${gr.max}]`);

    if (cls.restrained.includes(theme)) {
      if (glow <= restrainedMax) ok(`${theme} 克制档 glow ≤ ${restrainedMax}`);
      else bad(`${theme} 应为克制档但 glow=${glow} > ${restrainedMax}`);
    }
    if (cls.moderate && cls.moderate.includes(theme)) {
      const mod = baseline.glowStrength.thresholds.moderate;
      if (glow >= mod.min && glow <= mod.max) ok(`${theme} 中间档 glow 在 [${mod.min},${mod.max}]`);
      else bad(`${theme} 应为中间档但 glow=${glow} 不在 [${mod.min},${mod.max}]`);
    }
    if (cls.expressive.includes(theme)) {
      if (glow >= expressiveMin) ok(`${theme} 表现档 glow ≥ ${expressiveMin}`);
      else bad(`${theme} 应为表现档但 glow=${glow} < ${expressiveMin}`);
    }

    // orb-opacity 必须比 glow 克制，且在区间
    const orb = num(readVar(block, '--orb-opacity'));
    const wantOrb = baseline.glowStrength.orbOpacity.perTheme[theme];
    if (orb === wantOrb) ok(`${theme} --orb-opacity = ${orb}`);
    else bad(`${theme} --orb-opacity 漂移`, `期望 ${wantOrb}，实际 ${orb}`);
    if (orb >= orbRange.min && orb <= orbRange.max && orb <= glow)
      ok(`${theme} orb-opacity 克制 (≤glow, 在区间)`);
    else bad(`${theme} orb-opacity 不当`, `orb=${orb}, glow=${glow}, 区间[${orbRange.min},${orbRange.max}]`);
  }
}

// ════════════════════════════════════════════════════════
// 6. 字体梯度（单调递减对比度 + WCAG）
// ════════════════════════════════════════════════════════
section('6. 字体/文字梯度（单调递减 + WCAG ≥4.5）');
{
  const minC = baseline.textGradient.minContrastBodyOnSurface;
  for (const theme of MOTION) {
    const block = themeBlock(theme);
    if (!block) continue;
    const surface = readVar(block, '--surface');
    if (!surface) {
      bad(`${theme} 缺 --surface`);
      continue;
    }

    // 取 4 主档 + text-ghost（主题覆盖优先，否则用 base 默认推导）
    const rungs = ['--text', '--text-2', '--text-mute', '--text-faint'];
    const vals = rungs.map((r) => readVar(block, r));
    if (vals.some((v) => !v)) {
      bad(`${theme} 字档不全`, rungs.map((r, i) => `${r}=${vals[i]}`).join(', '));
      continue;
    }

    // text-ghost：主题覆盖优先
    let ghost = readVar(block, '--text-ghost');
    if (!ghost) {
      // base 默认 color-mix(--text 20%) → 用 --text 以 0.2 alpha 合成估算
      const t = parseColor(vals[0]);
      if (t) ghost = `rgba(${t.rgb.join(',')},0.2)`;
    }

    const contrasts = vals.map((v) => contrast(v, surface));
    const ghostC = ghost ? contrast(ghost, surface) : null;

    // WCAG：--text 正文 ≥4.5
    if (contrasts[0] != null && contrasts[0] >= minC)
      ok(`${theme} --text 正文对比度 ${contrasts[0].toFixed(2)}:1 ≥ ${minC}`);
    else bad(`${theme} --text 对比度不足`, `${contrasts[0]?.toFixed(2)} < ${minC}`);

    // 单调递减：text > text-2 > text-mute > text-faint > text-ghost
    const chain = [...contrasts, ghostC].filter((c) => c != null);
    const labels = [...rungs, '--text-ghost'];
    let mono = true;
    let detail = chain.map((c, i) => `${labels[i]}=${c.toFixed(2)}`).join(' > ');
    for (let i = 1; i < chain.length; i++) {
      if (!(chain[i] < chain[i - 1])) mono = false;
    }
    if (mono) ok(`${theme} 文字梯度单调递减: ${detail}`);
    else bad(`${theme} 文字梯度非单调`, detail);
  }
}

// ════════════════════════════════════════════════════════
// 7. 强调色预算（单一饱和色纪律）
// ════════════════════════════════════════════════════════
section('7. 强调色预算（--accent-2 仅渐变伙伴 / soft·glow 同色相）');
{
  for (const [theme, wantA2] of Object.entries(baseline.accentBudget.perThemeAccent2)) {
    const block = themeBlock(theme);
    if (!block) {
      bad(`主题块缺失: ${theme}`);
      continue;
    }
    const accent = readVar(block, '--accent');
    const a2 = readVar(block, '--accent-2');

    // 定义 accent-2 必须定义 accent
    if (a2 && accent) ok(`${theme} 定义 --accent-2 同时有 --accent`);
    else if (a2 && !accent) bad(`${theme} 有 --accent-2 但缺 --accent`);

    // accent-2 与基准一致
    if (a2 && a2.toLowerCase() === wantA2.toLowerCase()) ok(`${theme} --accent-2 = ${wantA2}`);
    else bad(`${theme} --accent-2 漂移`, `期望 ${wantA2}，实际 ${a2}`);

    // accent-soft / accent-glow 必须与 accent 或 accent-2 同色相（动效套件主题都有这些档）
    // 部分主题（如 neon-cyber）用 accent-2 色相做签名双色 glow，合法。
    if (MOTION.includes(theme)) {
      const soft = readVar(block, '--accent-soft');
      const glow = readVar(block, '--accent-glow');
      const hA = hueOf(accent);
      const hA2 = hueOf(a2);
      const allowA2 = baseline.accentBudget.glowMayMatchAccent2;
      for (const [name, val] of [['--accent-soft', soft], ['--accent-glow', glow]]) {
        if (!val) continue;
        const hV = hueOf(val);
        const matchAccent = hueClose(hA, hV);
        const matchAccent2 = allowA2 && a2 && hueClose(hA2, hV);
        if (matchAccent) ok(`${theme} ${name} 与 --accent 同色相`);
        else if (matchAccent2) ok(`${theme} ${name} 与 --accent-2 同色相（签名双色）`);
        else bad(`${theme} ${name} 偏离 accent/accent-2 色相`, `accent ${hA}° / accent-2 ${hA2}° vs ${name} ${hV}°`);
      }
    }
  }
}

// ════════════════════════════════════════════════════════
// 8. 对比表叙事格式
// ════════════════════════════════════════════════════════
section('8. 对比表叙事格式（comparison-frame EXAMPLE）');
{
  const cfg = baseline.comparisonFrameNarrative;
  const readmePath = join(ROOT, cfg.examplePath, 'README.md');
  if (!existsSync(readmePath)) {
    bad(`comparison-frame README 缺失: ${cfg.examplePath}/README.md`);
  } else {
    const txt = readFileSync(readmePath, 'utf8');
    // 负面/指令上下文标记：出现这些字说明 README 是「教作者不要这么做」，不是示范本身采用。
    const NEG_PREFIX = /[禁不严✗✘×到]\s*$/; // 某行/片段末尾是这些负面词 → 后接被禁内容是合法教学
    /** 某个索引处的短语是否处于负面/指令上下文 */
    function inNegativeContext(idx) {
      const before = txt.slice(Math.max(0, idx - 12), idx);
      // 同一行出现「禁/不用/不是/触发反 AI/✗/✘」等则视为教学否定
      const lineStart = txt.lastIndexOf('\n', idx) + 1;
      const lineEnd = txt.indexOf('\n', idx);
      const line = txt.slice(lineStart, lineEnd < 0 ? txt.length : lineEnd);
      return (
        NEG_PREFIX.test(before) ||
        /[禁不✗✘×]/.test(line) ||
        line.includes('触发') ||
        line.includes('反 AI') ||
        line.includes('反\u00a0AI')
      );
    }
    /** 某短语/字符的所有出现是否都处于负面上下文（都是教学否定才合格） */
    function allOccurrencesNegative(needle) {
      let i = txt.indexOf(needle);
      if (i < 0) return true; // 未出现也算合格（没被误用）
      while (i >= 0) {
        if (!inNegativeContext(i)) return false;
        i = txt.indexOf(needle, i + needle.length);
      }
      return true;
    }
    for (const rule of cfg.rules) {
      let rulePass = true;
      const probs = [];
      for (const m of rule.mustMention || []) {
        if (!txt.includes(m)) { rulePass = false; probs.push(`缺关键词「${m}」`); }
      }
      // 被禁短语：只要存在裸用（非负面上下文）就违规；在「禁……」里是合法教学
      for (const f of rule.mustForbidPhrase || []) {
        if (!allOccurrencesNegative(f)) { rulePass = false; probs.push(`裸用被禁短语「${f}」`); }
      }
      // 被禁 emoji：同理，只要被「不用/触发反 AI/✗」修饰就是教作者不要用，合格
      for (const e of rule.forbidEmoji || []) {
        if (!allOccurrencesNegative(e)) { rulePass = false; probs.push(`裸用禁用 emoji「${e}」`); }
      }
      if (rulePass) ok(`叙事铁律 [${rule.id}]: ${rule.desc}`);
      else bad(`叙事铁律违规 [${rule.id}]`, probs.join('; '));
    }
  }
}

// ═══════════════════════════════════════════════════════
// 9. coveredThemes 强制（O-4：防止未来加主题时漏覆盖）
// ═══════════════════════════════════════════════════════
section('9. 动效主题覆盖完整性（motionThemes 与 CSS 实际定义一致）');
{
  // 扫描 all-themes.css，找出所有「定义了 --cascade-step」的主题
  const themesCss = readFileSync(join(ROOT, baseline.lastSyncedFrom.themes_css), 'utf8');
  const defined = [];
  const blockRe = /\[data-theme="([^"]+)"\]\s*\{/g;
  let m;
  while ((m = blockRe.exec(themesCss))) {
    const name = m[1];
    // 抽该块体（括号配对）
    let i = themesCss.indexOf('{', m.index), depth = 0, body = '';
    for (let j = i; j < themesCss.length; j++) {
      if (themesCss[j] === '{') depth++;
      else if (themesCss[j] === '}') { depth--; if (depth === 0) { body = themesCss.slice(i + 1, j); break; } }
    }
    if (/--cascade-step\s*:/.test(body)) defined.push(name);
  }
  const listed = new Set(baseline.motionThemes.themes);
  // 双向：凡 CSS 定义了动效的 → 必须在 motionThemes + 3 个 perTheme 里
  for (const t of defined) {
    if (listed.has(t)) ok(`动效主题已纳入 motionThemes: ${t}`);
    else bad(`动效主题漏覆盖: ${t}`, 'CSS 定义了 --cascade-step 但不在 motionThemes，会造成静默漏报');
    for (const path of [
      ['cascadeSpeed', 'perTheme'],
      ['glowStrength', 'perTheme'],
    ]) {
      const obj = path.reduce((o, k) => (o || {})[k], baseline);
      if (obj && obj[t] !== undefined) ok(`${t} 已在 ${path.join('.')}`);
      else bad(`${t} 缺于 ${path.join('.')}`, 'O-4 强制：动效主题必须有完整 perTheme 基准');
    }
    if (baseline.glowStrength.orbOpacity.perTheme[t] !== undefined)
      ok(`${t} 已在 glowStrength.orbOpacity.perTheme`);
    else bad(`${t} 缺于 orbOpacity.perTheme`);
  }
  // 反向：motionThemes 里的都应在 CSS 真定义了
  for (const t of listed) {
    if (defined.includes(t)) ok(`motionThemes 成员在 CSS 真定义: ${t}`);
    else bad(`motionThemes 列了但 CSS 未定义 --cascade-step: ${t}`);
  }
}

// ═══════════════════════════════════════════════════════
// 10. 指引类锚点存在性（O-1：防止 Vizplainer 借鉴段被误删）
// ═══════════════════════════════════════════════════════
section('10. 指引类文档锚点存在性（guidelineAnchors）');
{
  const ga = baseline.guidelineAnchors;
  if (!ga) {
    ok('（未配置 guidelineAnchors，跳过）');
  } else {
    for (const chk of ga.checks) {
      const fp = join(ROOT, chk.file);
      if (!existsSync(fp)) { bad(`指引文档缺失: ${chk.file}`); continue; }
      const txt = readFileSync(fp, 'utf8');
      for (const needle of chk.mustContain) {
        if (txt.includes(needle)) ok(`${chk.file} 含锚点「${needle}」`);
        else bad(`${chk.file} 缺锚点「${needle}」`, '指引被误删或改标题？');
      }
    }
  }
}

// ─────────────────────── 总结 ───────────────────────
console.log(`\n${'─'.repeat(56)}`);
if (fail === 0) {
  console.log(`\x1b[32m✓ 设计基准检查全部通过\x1b[0m (${pass} 项断言)`);
  process.exit(0);
} else {
  console.log(`\x1b[31m✕ ${fail} 项 FAIL\x1b[0m / ${pass} 项 PASS`);
  console.log('\n失败明细:');
  for (const f of failures) console.log(`  • ${f.msg}${f.detail ? ` — ${f.detail}` : ''}`);
  process.exit(1);
}
