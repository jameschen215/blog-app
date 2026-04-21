<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import type { PageProps } from './$types';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PostWithAuthor } from '$lib/types/data';
	import ListRow from './_components/ListRow.svelte';
	import PageHeader from './_components/PageHeader.svelte';
	import StatsCards from './_components/StatsCards.svelte';
	import ListHeader from './_components/ListHeader.svelte';
	import EmptyState from './_components/EmptyState.svelte';

	let { data }: PageProps = $props();

	let posts = $derived(data.posts ?? []);

	// Optimistic UI state
	let optimisticPublishedMap = new SvelteMap<number, boolean>();
	let optimisticUpdatedAtMap = new SvelteMap<number, string>();
	let togglePublishedSubmittingIds = new SvelteSet<number>();
	let deletingPostIds = new SvelteSet<number>();
	let deletedPosts = new SvelteMap<number, PostWithAuthor>();

	let sortedPosts = $derived(
		[...posts].sort((a, b) => {
			const aPublished = getPublished(a) ? 1 : 0;
			const bPublished = getPublished(b) ? 1 : 0;
			if (bPublished !== aPublished) return bPublished - aPublished;

			const dateDiff = new Date(getUpdatedAt(b)).getTime() - new Date(getUpdatedAt(a)).getTime();
			if (dateDiff !== 0) return dateDiff;

			return a.title.localeCompare(b.title);
		})
	);

	function getPublished(post: PostWithAuthor): boolean {
		const original = optimisticPublishedMap.get(post.id);
		return original !== undefined ? !original : post.published;
	}

	function getUpdatedAt(post: PostWithAuthor): string {
		return optimisticUpdatedAtMap.get(post.id) ?? post.updatedAt;
	}

	const enhanceToggle: SubmitFunction = ({ formData }) => {
		const id = Number(formData.get('id'));
		const post = posts.find((p) => p.id === id);
		if (!post) return;

		optimisticPublishedMap.set(post.id, post.published);
		optimisticUpdatedAtMap.set(post.id, new Date().toISOString());
		togglePublishedSubmittingIds.add(post.id);

		toast.success(`Post ${post.published ? 'unpublished.' : 'published!'}`);

		return async ({ result, update }) => {
			if (result.type !== 'success') {
				toast.error('Failed to update publish status.');

				optimisticPublishedMap.delete(post.id);
				optimisticUpdatedAtMap.delete(post.id);
				togglePublishedSubmittingIds.delete(post.id);

				return;
			}

			await update({ reset: false });
			optimisticPublishedMap.delete(post.id);
			optimisticUpdatedAtMap.delete(post.id);
			togglePublishedSubmittingIds.delete(post.id);
		};
	};

	const enhanceDelete: SubmitFunction = async ({ formData }) => {
		const id = Number(formData.get('id'));
		const post = posts.find((p) => p.id === id);
		if (!post) return;

		deletedPosts.set(id, post);
		deletingPostIds.add(id);
		posts = posts.filter((p) => p.id !== id);

		toast.success('Post deleted.');

		return async ({ result, update }) => {
			if (result.type !== 'success') {
				posts = [...posts, deletedPosts.get(id)!];

				toast.error('Failed to delete post.');

				return;
			}

			await update({ reset: false });
			deletingPostIds.delete(id);
			deletedPosts.delete(id);
		};
	};
</script>

<svelte:head>
	<title>Dashboard - The Blog</title>
</svelte:head>

<div class="w-full px-6 py-10">
	<PageHeader user={data.user!} />

	<StatsCards {posts} {getPublished} />

	<div>
		<ListHeader />

		{#each sortedPosts as post (post.id)}
			<div
				class="border-b border-border last:border-b-0"
				animate:flip={{ duration: 300, easing: cubicOut }}
			>
				<ListRow
					{post}
					{getPublished}
					{enhanceDelete}
					{enhanceToggle}
					toggleButtonDisabled={togglePublishedSubmittingIds.has(post.id)}
				/>
			</div>
		{/each}

		{#if sortedPosts.length === 0}
			<EmptyState />
		{/if}
	</div>
</div>
