// $lib/api/post.ts

import { apiDelete, apiGet, apiPost, apiPut } from '$lib/api/client';
import type { PostDetailResult, PostsResult, PostWithAuthor, UserResult } from '$lib/types/data';

interface PaginationParams {
	page?: number;
	limit?: number;
	search?: string;
	sort?: 'latest' | 'likes' | 'comments';
}

export async function getPosts(
	params: PaginationParams,
	customFetch = fetch
): Promise<PostsResult> {
	const queryParams = new URLSearchParams();

	if (params.page) queryParams.append('page', params.page.toString());
	if (params.limit) queryParams.append('limit', params.limit.toString());
	if (params.search) queryParams.append('search', params.search);
	if (params.sort) queryParams.append('sort', params.sort);

	const query = queryParams.toString();
	const endpoint = query ? `/api/posts?${query}` : '/api/posts';

	return apiGet<PostsResult>(endpoint, customFetch);
}

export async function getPost(id: number, customFetch = fetch): Promise<PostDetailResult> {
	return apiGet<PostDetailResult>(`/api/posts/${id}`, customFetch);
}

export async function getPostsByAuthor(authorId: number, customFetch = fetch): Promise<UserResult> {
	return apiGet<UserResult>(`/api/posts/authors/${authorId}`, customFetch);
}

export async function togglePostPublish(id: number, customFetch = fetch): Promise<PostWithAuthor> {
	return apiPost(`/api/posts/${id}/publish`, undefined, customFetch);
}

export async function deletePost(id: number, customFetch = fetch) {
	return apiDelete(`/api/posts/${id}`, customFetch);
}

export function createPost(
	data: { title: string; content: string; published?: boolean },
	customFetch = fetch
) {
	return apiPost<{ post: PostWithAuthor }>('/api/posts', data, customFetch);
}

export function updatePost(
	id: number,
	data: { title?: string; content?: string; published?: boolean },
	customFetch = fetch
) {
	return apiPut<{ post: PostWithAuthor }>(`/api/posts/${id}`, data, customFetch);
}

export function createComment(postId: number, content: string, customFetch = fetch) {
	return apiPost(`/api/posts/${postId}/comments`, { content }, customFetch);
}

export function updateComment(
	postId: number,
	commentId: number,
	content: string,
	customFetch = fetch
) {
	return apiPut(`/api/posts/${postId}/comments/${commentId}`, { content }, customFetch);
}

export function deleteComment(postId: number, commentId: number, customFetch = fetch) {
	return apiDelete(`/api/posts/${postId}/comments/${commentId}`, customFetch);
}
