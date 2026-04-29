import { test, expect } from '@playwright/test';

test.describe('register page', () => {
	test('renders all form fields', async ({ page }) => {
		await page.goto('/auth/register');
		await expect(page.getByLabel('username')).toBeVisible();
		await expect(page.getByLabel('email')).toBeVisible();
		await expect(page.getByLabel('password', { exact: true })).toBeVisible();
		await expect(page.getByLabel('confirmPassword')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
	});

	test('has a link to the login page', async ({ page }) => {
		await page.goto('/auth/register');
		await page.getByRole('link', { name: 'Login' }).click();
		await expect(page).toHaveURL(/\/auth\/login/);
	});

	test('shows an error when passwords do not match', async ({ page }) => {
		await page.goto('/auth/register');
		await page.getByLabel('username').fill('newuser');
		await page.getByLabel('email').fill('new@example.com');
		await page.getByLabel('password', { exact: true }).fill('secret123');
		await page.getByLabel('confirmPassword').fill('different');
		await page.getByRole('button', { name: 'Register' }).click();
		await expect(page.locator('#confirmPassword-error')).toBeVisible();
	});

	test('shows an error when registering with an existing username', async ({ page }) => {
		await page.goto('/auth/register');
		await page.getByLabel('username').fill('James');
		await page.getByLabel('email').fill('taken@example.com');
		await page.getByLabel('password', { exact: true }).fill('secret123');
		await page.getByLabel('confirmPassword').fill('secret123');
		await page.getByRole('button', { name: 'Register' }).click();
		await expect(page.locator('#form-message')).toBeVisible();
	});
});
