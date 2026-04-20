import { error } from '@sveltejs/kit';
import { getPostsByAuthor } from '$lib/api/post';
import { handleLoadError } from '$lib/utils/error-handlers';

export async function load({ params, fetch }) {
	const authorId = Number(params.id);

	if (!Number.isInteger(authorId) || authorId < 1) {
		error(400, 'Invalid author ID');
	}

	try {
		return await getPostsByAuthor(authorId, fetch);
	} catch (err) {
		return handleLoadError(err);
	}
}
