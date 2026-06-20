// @ts-check
/**
 * playwright.config.mjs — 视觉回归测试运行器配置
 * 仅服务于 qa/visual-regression.spec.mjs（核心 v2 模板布局快照）。
 *
 * 跑测:   npx playwright test --config qa/playwright.config.mjs
 * 写基准: npx playwright test --config qa/playwright.config.mjs --update-snapshots
 */
import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(readFileSync(join(__dirname, 'design-baseline.json'), 'utf8'));
const vp = baseline.visualRegression.viewport;

export default defineConfig({
  testDir: __dirname,
  testMatch: 'visual-regression.spec.mjs',
  // 基准 PNG 存到 qa/__snapshots__/，按平台后缀隔离（避免跨 OS 抗锯齿差异误报）
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: join(__dirname, 'playwright-report'), open: 'never' }]],
  outputDir: join(__dirname, 'test-results'),
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: baseline.visualRegression.maxDiffPixelRatio,
      threshold: baseline.visualRegression.pixelDiffThreshold,
    },
  },
  use: {
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    ...devices['Desktop Chrome'],
    // 覆盖 devices 默认 viewport/dsf（devices 会带自己的）
    launchOptions: { args: ['--force-color-profile=srgb', '--disable-lcd-text'] },
  },
  projects: [
    {
      name: 'chromium-vr',
      use: {
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.deviceScaleFactor,
      },
    },
  ],
});
