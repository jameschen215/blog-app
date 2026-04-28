import { flattenError } from 'zod';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { createPost } from '$lib/api/post';
import { createPostSchema } from '$lib/schema/post';
import { handleActionError } from '$lib/utils/error-handlers';
import { decodeFormContent } from '$lib/utils/content-encoding';

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const data = {
			title: formData.get('title') ?? '',
			content: decodeFormContent(formData.get('contentEncoded'), formData.get('content')),
			published: formData.get('published') === 'true'
		};

		const validateResult = createPostSchema.safeParse(data);
		if (!validateResult.success) {
			return fail(400, {
				errors: flattenError(validateResult.error).fieldErrors,
				data
			});
		}

		let newPostId: number;

		try {
			const result = await createPost(validateResult.data, fetch);
			newPostId = result.post.id;
		} catch (err) {
			return handleActionError(err);
		}

		redirect(303, `/dashboard/posts/${newPostId}`);
	}
} satisfies Actions;
