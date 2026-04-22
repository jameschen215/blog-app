import { flattenError } from 'zod';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { handleLoadError, handleActionError } from '$lib/utils/error-handlers';
import { deletePostSchema, togglePublishSchema, updatePostSchema } from '$lib/schema/post';
import { getPost, updatePost, deletePost, deleteComment, togglePostPublish } from '$lib/api/post';

export async function load({ locals, params, fetch }) {
	const id = parseInt(params.id);

	if (isNaN(id) || id < 1) {
		error(400, 'Invalid post ID');
	}

	try {
		return await getPost(id, fetch);
	} catch (err) {
		return handleLoadError(err);
	}
}

export const actions = {
	updatePost: async ({ request, params, fetch }) => {
		const id = parseInt(params.id);

		if (isNaN(id) || id < 1) {
			error(400, 'Invalid post ID');
		}

		const formData = await request.formData();
		const data = {
			title: formData.get('title') as string,
			content: formData.get('content') as string,
			published: formData.get('published') === 'true'
		};

		const validateResult = updatePostSchema.safeParse(data);
		if (!validateResult.success) {
			return fail(400, {
				errors: flattenError(validateResult.error).fieldErrors,
				data
			});
		}

		try {
			await updatePost(id, validateResult.data, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err); // fixed: was missing return
		}
	},

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
	},

	deleteComment: async ({ request, params, fetch }) => {
		const formData = await request.formData();
		const commentId = Number(formData.get('commentId'));
		const postId = parseInt(params.id);

		if (isNaN(commentId) || commentId < 1) {
			return fail(400, { message: 'Invalid comment ID' });
		}

		try {
			await deleteComment(postId, commentId, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	}
} satisfies Actions;
