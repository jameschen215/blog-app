import { describe, it, expect } from 'vitest';
import { handleLoadError, handleActionError } from '$lib/utils/error-handlers';
import { APIError } from '$lib/api/client';

// ─── handleLoadError ──────────────────────────────────────────────────────────

describe('handleLoadError', () => {
	it('throws a SvelteKit HTTP error with the APIError status', () => {
		let caught: any;
		try { handleLoadError(new APIError('Not found', 404)); } catch (e) { caught = e; }
		expect(caught?.status).toBe(404);
	});

	it('propagates the APIError message in the error body', () => {
		let caught: any;
		try { handleLoadError(new APIError('Unauthorized', 401)); } catch (e) { caught = e; }
		expect(caught?.body?.message).toBe('Unauthorized');
	});

	it('defaults to status 500 when APIError has no status', () => {
		let caught: any;
		try { handleLoadError(new APIError('Oops')); } catch (e) { caught = e; }
		expect(caught?.status).toBe(500);
	});

	it('re-throws non-APIError errors unchanged', () => {
		const err = new Error('generic failure');
		expect(() => handleLoadError(err)).toThrow('generic failure');
	});
});

// ─── handleActionError ────────────────────────────────────────────────────────

describe('handleActionError', () => {
	it('returns a fail response with the APIError status', () => {
		const result = handleActionError(new APIError('Bad request', 400));
		expect(result.status).toBe(400);
	});

	it('includes the APIError message in the response data', () => {
		const result = handleActionError(new APIError('Not found', 404));
		expect((result as any).data.message).toBe('Not found');
	});

	it('includes fieldErrors in the response data', () => {
		const fieldErrors = { email: ['Invalid email'] };
		const result = handleActionError(new APIError('Validation failed', 422, undefined, fieldErrors));
		expect((result as any).data.errors).toEqual(fieldErrors);
	});

	it('defaults to status 500 for non-APIError errors', () => {
		const result = handleActionError(new Error('unexpected'));
		expect(result.status).toBe(500);
	});

	it('returns a generic message for unexpected errors', () => {
		const result = handleActionError(new Error('unexpected'));
		expect((result as any).data.message).toBe('An unexpected error occurred. Please try again.');
	});
});
