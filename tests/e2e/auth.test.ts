import { test, expect } from '@playwright/test';

test.describe('login page', () => {
	test('renders username and password fields', async ({ page }) => {
		await page.goto('/auth/login');
		await expect(page.getByLabel('username')).toBeVisible();
		await expect(page.getByLabel('password')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
	});

	test('shows an error on invalid credentials', async ({ page }) => {
		await page.goto('/auth/login');
		await page.waitForLoadState('networkidle');
		await page.getByLabel('username').fill('wronguser');
		await page.getByLabel('password').fill('wrongpass');
		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page.locator('#form-message')).toBeVisible();
	});

	test('has a link to the register page', async ({ page }) => {
		await page.goto('/auth/login');
		await page.getByRole('link', { name: 'Register' }).click();
		await expect(page).toHaveURL(/\/auth\/register/);
	});
});

test.describe('dashboard access control', () => {
	test('redirects unauthenticated users to login', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveURL(/\/auth\/login\?redirect=%2Fdashboard/);
	});
});

// Requires TEST_USERNAME and TEST_PASSWORD env vars to be set
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

test.describe('authenticated flow', () => {
	test.skip(!username || !password, 'Set TEST_USERNAME and TEST_PASSWORD to run auth flow tests');

	test('login with valid credentials redirects to home', async ({ page }) => {
		await page.goto('/auth/login');
		await page.getByLabel('username').fill(username!);
		await page.getByLabel('password').fill(password!);
		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page).toHaveURL('/');
	});

	test('logout clears session and redirects to home', async ({ page }) => {
		// Log in first
		await page.goto('/auth/login');
		await page.waitForLoadState('networkidle');
		await page.getByLabel('username').fill(username!);
		await page.getByLabel('password').fill(password!);
		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page).toHaveURL('/');
		await page.waitForLoadState('networkidle');

		// Then log out via the header menu
		await page.getByRole('button', { name: 'Menu' }).click();
		await page.getByRole('menuitem', { name: 'Logout' }).click();
		await expect(page).toHaveURL('/');

		// Dashboard should now redirect to login again
		await page.goto('/dashboard');
		await expect(page).toHaveURL(/\/auth\/login/);
	});
});
