import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { login } from '$lib/api/auth';
import { APIError } from '$lib/api/client';
import { loginSchema } from '$lib/schema/auth';
import { parseFormData } from '$lib/utils/form';
import { getSafeRedirect } from '$lib/utils/redirect';

export async function load({ locals }) {
	if (locals.user) redirect(307, '/');
}

export const actions = {
	default: async ({ request, fetch, url, cookies }) => {
		const { data, errors, raw } = parseFormData(loginSchema, await request.formData());

		if (!data) return fail(400, { errors, data: raw });

		try {
			const result = await login(data, fetch);

			cookies.set('jwt', result.token, {
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});

			const to = getSafeRedirect(url);

			redirect(307, to);
		} catch (error) {
			// expected, user-facing error
			if (error instanceof APIError) {
				return fail(error.status!, {
					message: error.message,
					errors: error.fieldErrors
				});
			}

			throw error;
		}
	}
} satisfies Actions;
