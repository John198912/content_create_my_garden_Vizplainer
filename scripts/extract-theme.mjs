#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// extract-theme.mjs —— 从合并的 themes/all-themes.css 里抽出
// 单个主题的 [data-theme="<id>"] { ... } 块,展开成 :root { ... }
// 写出一份独立的 tokens.css(脚手架产物用)。
//
// 用法:
//   node extract-theme.mjs <all-themes.css> <theme-id>          # 打印到 stdout
//   node extract-theme.mjs <all-themes.css> <theme-id> <out>    # 写到文件
//   node extract-theme.mjs --list <all-themes-meta.json>        # 列主题
//
// 设计:让脚手架产物保持原结构(App.tsx 仍 import tokens.css,
// :root 生效),无需在运行时切 data-theme。存储侧用合并文件,
// 脚手架侧展开成单主题 —— 两全。
// ─────────────────────────────────────────────────────────────
import fs from "node:fs";

const args = process.argv.slice(2);

if (args[0] === "--list") {
  const meta = JSON.parse(fs.readFileSync(args[1], "utf8"));
  // meta 是 { "<id>": {name,nameZh,descriptionZh,...}, ... }
  const ids = Object.keys(meta).sort();
  for (const id of ids) {
    const t = meta[id] || {};
    const nameZh = t.nameZh || t.name || id;
    const desc = t.descriptionZh || t.description || "";
    process.stdout.write(`  • ${id.padEnd(18)} ${nameZh}\n      ${desc}\n\n`);
  }
  process.exit(0);
}

const [cssPath, themeId, outPath] = args;
if (!cssPath || !themeId) {
  console.error("用法: node extract-theme.mjs <all-themes.css> <theme-id> [out]");
  console.error("      node extract-theme.mjs --list <all-themes-meta.json>");
  process.exit(2);
}

const css = fs.readFileSync(cssPath, "utf8");

// 找到 [data-theme="<id>"] { ... } 的完整块(花括号配对)。
const selector = `[data-theme="${themeId}"]`;
const start = css.indexOf(selector);
if (start === -1) {
  console.error(`✗ 在 ${cssPath} 里找不到主题 '${themeId}'`);
  process.exit(1);
}
const braceOpen = css.indexOf("{", start);
if (braceOpen === -1) {
  console.error(`✗ 主题 '${themeId}' 块格式异常(没有 '{')`);
  process.exit(1);
}
// 花括号配对扫描,处理块内嵌套(如 @font-face / 嵌套规则一般没有,但稳妥起见)
let depth = 0;
let i = braceOpen;
for (; i < css.length; i++) {
  const ch = css[i];
  if (ch === "{") depth++;
  else if (ch === "}") {
    depth--;
    if (depth === 0) break;
  }
}
if (depth !== 0) {
  console.error(`✗ 主题 '${themeId}' 块花括号不配对`);
  process.exit(1);
}
const body = css.slice(braceOpen + 1, i); // 不含外层花括号

const header = `/* tokens.css — 主题 '${themeId}'(由 scaffold 从 all-themes.css 展开)
 * 切换主题:重新跑 scaffold 的展开,或手动把另一主题的 [data-theme] 块改成 :root。
 * 不要手改这里的值表达主题性格 —— 回 themes/all-themes.css 改源,再重新展开。 */
`;
const output = `${header}:root {${body}}\n`;

if (outPath) {
  fs.writeFileSync(outPath, output);
  process.stderr.write(`✓ 已写出 ${outPath}(主题 ${themeId})\n`);
} else {
  process.stdout.write(output);
}
