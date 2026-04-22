import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { APIError } from '$lib/api/client';
import { getPost, likePost, createComment, updateComment } from '$lib/api/post';
import { handleLoadError, handleActionError } from '$lib/utils/error-handlers';
import { commentSchema } from '$lib/schema/comment';
import { parseFormData } from '$lib/utils/form';

export async function load({ params, fetch }) {
	const id = Number(params.id);

	if (!Number.isInteger(id) || id < 1) {
		error(400, 'Invalid post ID');
	}

	try {
		return await getPost(id, fetch);
	} catch (err) {
		return handleLoadError(err);
	}
}

export const actions = {
	like: async ({ params, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'You must be logged in to like a post.' });
		}

		const id = Number(params.id);

		if (!Number.isInteger(id) || id < 1) {
			error(400, 'Invalid post ID');
		}

		try {
			await likePost(id, fetch);
			return { success: true };
		} catch (err) {
			if (err instanceof APIError) {
				// Rate limit - return as fail so the client can show a toast
				if (err.status === 429) {
					return fail(429, { message: err.message });
				}

				error(err.status ?? 500, err.message);
			}

			throw err;
		}
	},
	comment: async ({ params, request, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'You must be logged in to comment.' });
		}

		const postId = Number(params.id);

		if (!Number.isInteger(postId) || postId < 1) {
			error(400, 'Invalid post ID');
		}

		const { data, errors } = parseFormData(commentSchema, await request.formData());

		if (!data) return fail(400, { errors });

		try {
			await createComment(postId, data.content, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	},
	editComment: async ({ params, request, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'You must be logged in to edit a comment' });
		}

		const postId = Number(params.id);
		const formData = await request.formData();
		const commentId = Number(formData.get('commentId'));

		if (!Number.isInteger(postId) || postId < 1) {
			error(400, 'Invalid post ID');
		}

		if (!Number.isInteger(commentId) || commentId < 1) {
			return fail(400, 'Invalid comment ID');
		}

		const { data, errors } = parseFormData(commentSchema, formData);

		if (!data) return fail(400, { errors });

		try {
			await updateComment(postId, commentId, data.content, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	}
} satisfies Actions;
