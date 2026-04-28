<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	import PostCard from '$lib/components/PostCard.svelte';

	let { data }: PageProps = $props();

	let posts = $derived(data.posts ?? []);
	let pagination = $derived(data.pagination);

	type SortKey = 'latest' | 'likes' | 'comments';

	const filters: { label: string; value: SortKey }[] = [
		{ label: 'Latest', value: 'latest' },
		{ label: 'Most liked', value: 'likes' },
		{ label: 'Most discussed', value: 'comments' }
	];

	let sort = $derived((page.url.searchParams.get('sort') ?? 'latest') as SortKey);
	let search = $derived(page.url.searchParams.get('search')?.trim() ?? '');

	function setSort(value: SortKey) {
		const url = new URL(page.url);
		url.searchParams.set('sort', value);
		url.searchParams.delete('page');
		goto(url.toString(), { invalidateAll: true });
	}

	function setPage(nextPage: number) {
		const url = new URL(page.url);
		url.searchParams.set('page', String(nextPage));
		goto(url.toString());
	}
</script>

<svelte:head>
	<title>The Blog</title>
	<meta name="description" content="A collection of posts" />
</svelte:head>

<div class="w-full px-6 pb-16">
	<!-- Page Heading -->
	<div class="pt-10 pb-6">
		<p class="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">Latest</p>
		<h1 class="font-ibm text-3xl font-medium tracking-tight">All posts</h1>
	</div>

	<!-- Sort filters -->
	<div class="mb-6 flex flex-wrap gap-2">
		{#each filters as filter (filter.value)}
			<button
				onclick={() => setSort(filter.value)}
				class="rounded-full border px-3 py-1 text-xs transition-colors {sort === filter.value
					? 'border-foreground bg-foreground text-background'
					: 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'}"
			>
				{filter.label}
			</button>
		{/each}
	</div>

	<!-- Post list -->
	<ul class="px-6">
		{#each posts as post (post.id)}
			<li>
				<PostCard {post} />
			</li>
		{/each}

		<!-- Empty state -->
		{#if posts.length === 0}
			<div class="-mx-6 border-t border-border text-center">
				{#if search}
					<p class="text-sm text-muted-foreground">
						No posts matching <span class="text-foreground">{search}</span>
					</p>
				{:else}
					<p class="mt-8 text-sm text-muted-foreground">No posts yet.</p>
				{/if}
			</div>
		{/if}
	</ul>

	<!-- Pagination - hidden during search since we filter client-side -->
	{#if pagination && pagination.totalPages > 1 && !search}
		<div class="grid grid-cols-3 items-center justify-items-center border-t border-border pt-5">
			<button
				disabled={!pagination.hasPrevPage}
				onclick={() => setPage(pagination.page - 1)}
				class="flex min-w-22 cursor-pointer items-center justify-center gap-1.5 justify-self-start rounded-md border border-border py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
			>
				<ChevronLeft size={13} />
				Previous
			</button>

			<span class="text-sm text-muted-foreground">
				Page {pagination.page} of {pagination.totalPages}
			</span>

			<button
				disabled={!pagination.hasNextPage}
				onclick={() => setPage(pagination.page + 1)}
				class="flex min-w-20 cursor-pointer items-center gap-1.5 justify-self-end rounded-md border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
			>
				Next
				<ChevronRight size={13} />
			</button>
		</div>
	{/if}
</div>
