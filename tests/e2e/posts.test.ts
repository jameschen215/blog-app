import { test, expect } from '@playwright/test';

test.describe('post list', () => {
	test('shows at least one post card', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('ul li a').first()).toBeVisible();
	});

	test('each post card shows a title, author, and reading time', async ({ page }) => {
		await page.goto('/');
		const firstCard = page.locator('ul li a').first();
		await expect(firstCard.getByRole('heading')).toBeVisible();
		// author avatar + date row
		await expect(firstCard.locator('span').first()).toBeVisible();
	});

	test('clicking a post card navigates to the post page', async ({ page }) => {
		await page.goto('/');
		const firstCard = page.locator('ul li a').first();
		const title = (await firstCard.getByRole('heading').textContent())!.trim();

		await firstCard.click();

		await expect(page).toHaveURL(/\/posts\/\d+/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
		await expect(page).toHaveTitle(`${title} - The Blog`);
	});
});

test.describe('post detail page', () => {
	test('shows post title, author, and content', async ({ page }) => {
		await page.goto('/');
		await page.locator('ul li a').first().click();

		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.locator('.prose')).toBeVisible();
	});

	test('"All posts" link returns to home', async ({ page }) => {
		await page.goto('/');
		await page.locator('ul li a').first().click();

		await page.getByRole('link', { name: 'All posts' }).click();

		await expect(page).toHaveURL('/');
		await expect(page.getByRole('heading', { name: 'All posts' })).toBeVisible();
	});
});

test.describe('sort filters', () => {
	test('switching sort updates the URL', async ({ page }) => {
		await page.goto('/');
		// Wait for networkidle so SvelteKit hydration and the LoadingSpinner overlay settle
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Most liked' }).click();
		await expect(page).toHaveURL(/sort=likes/);
	});

	test('switching back to Latest removes the sort param', async ({ page }) => {
		await page.goto('/?sort=likes');
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Latest' }).click();
		await expect(page).toHaveURL(/sort=latest/);
	});
});
