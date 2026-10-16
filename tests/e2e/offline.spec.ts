// Requiere: npm i -D @playwright/test && npx playwright install chromium && npm run build && npm run preview
import { test, expect } from '@playwright/test';
test('abre y navega sin Internet tras la primera carga', async ({ page, context }) => {
  await page.goto('http://localhost:4173/');
  await expect(page.getByRole('heading', { name: /Mantenimiento de compresores/ })).toBeVisible();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: /Mantenimiento de compresores/ })).toBeVisible();
});
