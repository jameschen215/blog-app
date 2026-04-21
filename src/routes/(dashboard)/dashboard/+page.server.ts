import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';

import { deletePostSchema, togglePublishSchema } from '$lib/schema/post.js';
import { deletePost, getPostsByAuthor, togglePostPublish } from '$lib/api/post';
import { handleActionError, handleLoadError } from '$lib/utils/error-handlers';

export async function load({ locals, fetch }) {
	try {
		const result = await getPostsByAuthor(locals.user!.id, fetch);

		return {
			posts: result.posts
		};
	} catch (err) {
		return handleLoadError(err);
	}
}

export const actions = {
	togglePublish: async ({ request, fetch }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const validateResult = togglePublishSchema.safeParse(data);

		if (!validateResult.success) {
			return fail(400);
		}

		try {
			await togglePostPublish(validateResult.data.id, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	},
	deletePost: async ({ request, fetch }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const validateResult = deletePostSchema.safeParse(data);

		if (!validateResult.success) {
			return fail(400);
		}

		try {
			await deletePost(validateResult.data.id, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	}
} satisfies Actions;
