import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/api/auth';

export const actions = {
	default: async ({ url, fetch }) => {
		await logout(fetch);

		const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

		redirect(303, to);
	}
} satisfies Actions;
