import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { register } from '$lib/api/auth';
import { APIError } from '$lib/api/client';
import { registerSchema } from '$lib/schema/auth';
import { parseFormData } from '$lib/utils/form';

export const actions = {
	default: async ({ request, url, fetch, cookies }) => {
		const { data, errors, raw } = parseFormData(registerSchema, await request.formData());

		if (!data) return fail(400, { errors, data: raw });

		try {
			const result = await register(data, fetch);

			cookies.set('jwt', result.token, {
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});

			const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

			redirect(307, to);
		} catch (error) {
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
