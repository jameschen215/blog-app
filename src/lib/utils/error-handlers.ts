import { APIError } from '$lib/api/client';
import { error, fail } from '@sveltejs/kit';

/**
 * For load functions - throws error (shows error page)
 */
export function handleLoadError(err: unknown): never {
	if (err instanceof APIError) {
		error(err.status ?? 500, err.message);
	}

	throw err;
}

/**
 * For form actions - returns fail (stays on page)
 * Handles ALL API errors including rate limits, validation, etc.
 */
export function handleActionError(err: unknown) {
	if (err instanceof APIError) {
		return fail(err.status ?? 500, {
			message: err.message,
			errors: err.fieldErrors
		});
	}

	console.error('Unexpected action error:', err);
	return fail(500, { message: 'An unexpected error occurred. Please try again.' });
}
