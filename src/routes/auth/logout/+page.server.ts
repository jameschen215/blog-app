import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ url, cookies }) => {
		cookies.delete('jwt', { path: '/' });

		const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

		redirect(303, to);
	}
} satisfies Actions;
