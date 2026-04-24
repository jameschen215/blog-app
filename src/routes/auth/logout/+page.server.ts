import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/api/auth';

export const actions = {
	default: async ({ url, fetch, cookies }) => {
		await logout(fetch);

		cookies.delete('jwt', { path: '/' });

		const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

		redirect(303, to);
	}
} satisfies Actions;
