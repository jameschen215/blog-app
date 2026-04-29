import { test, expect } from '@playwright/test';

test.describe('home page', () => {
	test('has correct title', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle('The Blog');
	});

	test('shows the all posts heading', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'All posts' })).toBeVisible();
	});

	test('shows sort filter buttons', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('button', { name: 'Latest' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Most liked' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Most discussed' })).toBeVisible();
	});
});

test.describe('navigation', () => {
	test('login page is reachable from the header menu', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Menu' }).click();
		await page.getByRole('menuitem', { name: 'Login' }).click();
		await expect(page).toHaveURL(/\/auth\/login/);
	});

	test('register page is reachable from the header menu', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Menu' }).click();
		await page.getByRole('menuitem', { name: 'Register' }).click();
		await expect(page).toHaveURL(/\/auth\/register/);
	});
});
