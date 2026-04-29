import { describe, it, expect } from 'vitest';
import { parseFormData } from '$lib/utils/form';
import { loginSchema } from '$lib/schema/auth';

function makeFormData(fields: Record<string, string>): FormData {
	const fd = new FormData();
	for (const [key, value] of Object.entries(fields)) fd.append(key, value);
	return fd;
}

describe('parseFormData', () => {
	it('returns data when input is valid', () => {
		const result = parseFormData(loginSchema, makeFormData({ username: 'alice', password: 'secret123' }));
		expect(result.data).toEqual({ username: 'alice', password: 'secret123' });
		expect(result.errors).toBeNull();
	});

	it('returns errors when username is too short', () => {
		const result = parseFormData(loginSchema, makeFormData({ username: 'ab', password: 'secret123' }));
		expect(result.data).toBeNull();
		expect(result.errors?.username).toBeDefined();
	});

	it('returns errors when password is too short', () => {
		const result = parseFormData(loginSchema, makeFormData({ username: 'alice', password: '123' }));
		expect(result.data).toBeNull();
		expect(result.errors?.password).toBeDefined();
	});

	it('returns errors for all missing fields', () => {
		const result = parseFormData(loginSchema, makeFormData({}));
		expect(result.data).toBeNull();
		expect(result.errors?.username).toBeDefined();
		expect(result.errors?.password).toBeDefined();
	});

	it('includes raw form data regardless of validation result', () => {
		const result = parseFormData(loginSchema, makeFormData({ username: 'ab', password: '123' }));
		expect(result.raw).toMatchObject({ username: 'ab', password: '123' });
	});
});
