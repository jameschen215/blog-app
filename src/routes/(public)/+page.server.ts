import { getPosts } from '$lib/api/post';
import { handleLoadError } from '$lib/utils/error-handlers';

export async function load({ url, fetch }) {
	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : undefined;
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;

	try {
		const result = await getPosts({ page, limit }, fetch);

		return {
			posts: result.posts,
			pagination: result.pagination
		};
	} catch (err) {
		return handleLoadError(err);
	}
}
