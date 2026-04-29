import { test, expect, type Page } from '@playwright/test';

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

async function login(page: Page) {
	await page.goto('/auth/login');
	await page.waitForLoadState('networkidle');
	await page.getByLabel('username').fill(username!);
	await page.getByLabel('password').fill(password!);
	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page).toHaveURL('/');
}

test.describe('dashboard', () => {
	test.skip(!username || !password, 'Set TEST_USERNAME and TEST_PASSWORD to run dashboard tests');

	test.beforeEach(async ({ page }) => {
		await login(page);
	});

	test('is accessible after login', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveURL('/dashboard');
	});

	test('header "Write new post" button navigates to the create form', async ({ page }) => {
		await page.goto('/dashboard');
		await page.getByRole('link', { name: 'Write new post' }).click();
		await expect(page).toHaveURL('/dashboard/posts/new');
		await expect(page.getByPlaceholder('New post title')).toBeVisible();
	});

	test('can create a post and it appears in the dashboard', async ({ page }) => {
		const title = `E2E test post ${Date.now()}`;

		await page.goto('/dashboard/posts/new');
		await page.waitForLoadState('networkidle');
		await page.getByPlaceholder('New post title').fill(title);
		await page.locator('.ProseMirror').click();
		await page.keyboard.type('Test content written by Playwright.');
		await page.getByRole('button', { name: 'Save' }).click();

		await expect(page).toHaveURL(/\/dashboard\/posts\/\d+/);

		await page.goto('/dashboard');
		await expect(page.getByText(title)).toBeVisible();
	});

	test('can toggle a post between draft and published', async ({ page }) => {
		const title = `E2E toggle test ${Date.now()}`;

		// Create a draft post
		await page.goto('/dashboard/posts/new');
		await page.waitForLoadState('networkidle');
		await page.getByPlaceholder('New post title').fill(title);
		await page.locator('.ProseMirror').click();
		await page.keyboard.type('Toggle test content.');
		await page.getByRole('button', { name: 'Save' }).click();
		await expect(page).toHaveURL(/\/dashboard\/posts\/\d+/);

		// Find the row on the dashboard
		await page.goto('/dashboard');
		await page.waitForLoadState('networkidle');
		const row = page.locator('div.border-b').filter({ has: page.getByText(title, { exact: true }) });

		// Should start as Draft
		await expect(row.getByText('Draft', { exact: true })).toBeVisible();

		// Publish it
		await row.getByTitle('Publish').click();
		await expect(row.getByText('Published', { exact: true })).toBeVisible();

		// Unpublish it
		await row.getByTitle('Unpublish').click();
		await expect(row.getByText('Draft', { exact: true })).toBeVisible();

		// Clean up: reload to reset component state before deleting
		await page.goto('/dashboard');
		await page.waitForLoadState('networkidle');
		const cleanupRow = page.locator('div.border-b').filter({ has: page.getByText(title, { exact: true }) });
		await cleanupRow.getByTitle('Delete post').click();
		await cleanupRow.getByTitle('Confirm delete').click();
	});

	test('can delete a post', async ({ page }) => {
		const title = `E2E delete test ${Date.now()}`;

		// Create a post to delete
		await page.goto('/dashboard/posts/new');
		await page.waitForLoadState('networkidle');
		await page.getByPlaceholder('New post title').fill(title);
		await page.locator('.ProseMirror').click();
		await page.keyboard.type('This post will be deleted.');
		await page.getByRole('button', { name: 'Save' }).click();
		await expect(page).toHaveURL(/\/dashboard\/posts\/\d+/);

		await page.goto('/dashboard');
		await page.waitForLoadState('networkidle');
		const row = page.locator('div.border-b').filter({ has: page.getByText(title, { exact: true }) });

		// Two-step delete: trash icon → confirm checkmark
		await row.getByTitle('Delete post').click();
		await row.getByTitle('Confirm delete').click();

		await expect(page.getByText(title)).not.toBeVisible();
	});
});
