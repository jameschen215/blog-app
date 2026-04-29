import { test, expect } from '@playwright/test';

test.describe('search', () => {
	test('opens a search input when the search button is clicked', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Search posts' }).click();
		await expect(page.getByPlaceholder('Search posts...')).toBeVisible();
	});

	test('typing updates the URL with a search param after debounce', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Search posts' }).click();
		await page.getByPlaceholder('Search posts...').fill('docker');
		await expect(page).toHaveURL(/search=docker/, { timeout: 2000 });
	});

	test('closing the search clears the search param from the URL', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.getByRole('button', { name: 'Search posts' }).click();
		await page.getByPlaceholder('Search posts...').fill('docker');
		await expect(page).toHaveURL(/search=docker/, { timeout: 2000 });

		await page.getByRole('button', { name: 'Close search' }).click();
		await expect(page).toHaveURL('/');
		await expect(page.getByPlaceholder('Search posts...')).not.toBeVisible();
	});

	test('shows no results message for an unmatched query', async ({ page }) => {
		await page.goto('/?search=xyzzy_no_results_expected');
		await expect(page.getByText(/No posts matching/)).toBeVisible();
	});
});
