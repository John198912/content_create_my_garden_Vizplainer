// @ts-check
/**
 * visual-regression.spec.mjs — 核心 v2 模板布局快照回归
 * ------------------------------------------------------------------
 * 用 @playwright/test 的 toHaveScreenshot 对 4 个核心 v2 主题在
 * qa/fixture/verify.html（覆盖全部 12 原语 + window-frame + 5 档文字梯度）
 * 上各截一张布局快照，与基准 PNG 逐像素对比。
 *
 * 任何主题改动若让动效原语落点 / 字体梯度 / 强调色渐变偏离基准，
 * 像素差超过 maxDiffPixelRatio 即 FAIL。
 *
 * 跑测前：visual-regression.spec 会为每个主题把该主题的 :root token
 * 写进 qa/fixture/tokens.css（用 scripts/extract-theme.mjs），再 goto。
 *
 * 用法:
 *   npx playwright test qa/visual-regression.spec.mjs              # 对比
 *   npx playwright test qa/visual-regression.spec.mjs --update-snapshots   # 写/更新基准
 *
 * 决定性措施:
 *   • 屏蔽 Google Fonts 网络请求 → 全平台一致的 fallback 字体度量（测布局非字形）
 *   • 注入 CSS 关掉所有 animation/transition → 截图取入场终态，不受时序抖动影响
 *   • 固定 viewport 1280×760 @2x，settle 给布局稳定时间
 */

import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const baseline = JSON.parse(readFileSync(join(__dirname, 'design-baseline.json'), 'utf8'));

const VR = baseline.visualRegression;
const THEMES_CSS = join(ROOT, baseline.lastSyncedFrom.themes_css);
const EXTRACT = join(ROOT, 'scripts', 'extract-theme.mjs');
const FIXTURE = join(__dirname, 'fixture', 'verify.html');
const TOKENS_OUT = join(__dirname, 'fixture', 'tokens.css');

// 主题中文名（仅用于截图标题，可读性）
let META = {};
try {
  META = JSON.parse(readFileSync(join(ROOT, 'themes', 'all-themes-meta.json'), 'utf8'));
} catch { /* 无 meta 不阻断 */ }

// 关动效 + 锁字体回退，保证截图决定性
const FREEZE_CSS = `
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  animation-iteration-count: 1 !important;
}
/* 锁定字体族到稳定 sans 回退（测的是布局/梯度落点，不是字形渲染） */
html, body, * { font-family: Arial, "Liberation Sans", sans-serif !important; }
`;

test.describe('核心 v2 模板布局快照回归', () => {
  test.beforeAll(() => {
    if (!existsSync(EXTRACT)) throw new Error(`缺 extract-theme.mjs: ${EXTRACT}`);
    if (!existsSync(FIXTURE)) throw new Error(`缺 fixture: ${FIXTURE}`);
  });

  for (const themeId of VR.templates) {
    test(`${themeId} 布局快照`, async ({ page }) => {
      // 1) 把该主题 :root token 展开写进 fixture 的 tokens.css
      // 不传 out-path → extract-theme.mjs 打到 stdout
      const css = execFileSync('node', [EXTRACT, THEMES_CSS, themeId], {
        encoding: 'utf8',
      });
      writeFileSync(TOKENS_OUT, css, 'utf8');

      // 2) 屏蔽外部字体请求 → 决定性
      await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());

      // 3) 固定视口
      await page.setViewportSize({ width: VR.viewport.width, height: VR.viewport.height });

      // 4) 打开 fixture
      const nameZh = (META[themeId] && (META[themeId].nameZh || META[themeId].name)) || themeId;
      const url = pathToFileURL(FIXTURE).href +
        `?theme=${encodeURIComponent(themeId)}&name=${encodeURIComponent(nameZh)}`;
      await page.goto(url, { waitUntil: 'load' });

      // 5) 注入冻结样式 + 等布局稳定
      await page.addStyleTag({ content: FREEZE_CSS });
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
      await page.waitForTimeout(VR.settleMs);

      // 6) 对舞台元素截图并与基准比对
      const stage = page.locator('#stage');
      await expect(stage).toHaveScreenshot(`${themeId}.png`, {
        maxDiffPixelRatio: VR.maxDiffPixelRatio,
        threshold: VR.pixelDiffThreshold,
        animations: 'disabled',
      });
    });
  }
});
