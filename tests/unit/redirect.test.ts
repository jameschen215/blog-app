import { describe, it, expect } from 'vitest';
import { getSafeRedirect } from '$lib/utils/redirect';

function urlWith(redirect?: string): URL {
	const url = new URL('http://localhost/auth/login');
	if (redirect !== undefined) url.searchParams.set('redirect', redirect);
	return url;
}

describe('getSafeRedirect', () => {
	it('returns the redirect param when it is a safe path', () => {
		expect(getSafeRedirect(urlWith('/dashboard'))).toBe('/dashboard');
	});

	it('returns "/" by default when no redirect param is present', () => {
		expect(getSafeRedirect(urlWith())).toBe('/');
	});

	it('uses the custom default when no redirect param is present', () => {
		expect(getSafeRedirect(urlWith(), '/home')).toBe('/home');
	});

	it('rejects protocol-relative paths starting with //', () => {
		expect(getSafeRedirect(urlWith('//evil.com'))).toBe('/');
	});

	it('rejects paths starting with /\\', () => {
		expect(getSafeRedirect(urlWith('/\\evil'))).toBe('/');
	});

	it('rejects absolute URLs', () => {
		expect(getSafeRedirect(urlWith('http://evil.com'))).toBe('/');
	});
});
