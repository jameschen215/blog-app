<script lang="ts">
	import { format } from 'date-fns';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { Heart, Clock, ChevronLeft, ChevronRight, MessageSquare } from '@lucide/svelte';

	import Avatar from '$lib/components/Avatar.svelte';
	import { formatCompactNum, getReadingTime } from '$lib/utils/formatters';

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

	// Note: this sorts within the current page only.
	// For true global sorting, the server API would need a sort param.
	let sortedPosts = $derived.by(() => {
		let result = [...posts];

		if (sort === 'likes') return result.sort((a, b) => b.likesCount - a.likesCount);

		if (sort === 'comments') return result.sort((a, b) => b.commentsCount - a.commentsCount);

		return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	});

	function setSort(value: SortKey) {
		const url = new URL(page.url);
		url.searchParams.set('sort', value);
		url.searchParams.delete('page');
		goto(url.toString());
	}

	function setPage(nextPage: number) {
		const url = new URL(page.url);
		url.searchParams.set('page', String(nextPage));
		goto(url.toString());
	}

	function getExcerpt(content: string): string {
		return content.replace(/<[^>]*>/g, '').trim();
	}

	const THUMBNAIL_COLORS = [
		'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
		'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
		'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
		'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200',
		'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200'
	];

	function getThumbnailColor(title: string): string {
		return THUMBNAIL_COLORS[title.charCodeAt(0) % THUMBNAIL_COLORS.length];
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
	<div class="px-6">
		{#each sortedPosts as post (post.id)}
			<a
				href="/posts/{post.id}"
				class="-mx-6 grid grid-cols-[1fr_auto] items-start gap-4 border-t border-border px-3 py-5 transition-colors hover:bg-accent/30"
			>
				<!-- Left: text content -->
				<div class="min-w-0">
					<!-- Author + date -->
					<div class="mb-2.5 flex items-center gap-2">
						<Avatar username={post.author.username} className="size-6 text-[12px]" />
						<span class="text-sm text-muted-foreground">{post.author.username}</span>
						<span class="text-muted-foreground">·</span>
						<span class="text-sm text-muted-foreground">{format(post.createdAt, 'MMM d')}</span>
					</div>

					<!-- Title -->
					<h2
						class="mb-1.5 line-clamp-2 font-ibm text-[17px] leading-snug font-medium tracking-tight text-foreground"
					>
						{post.title}
					</h2>

					<!-- Excerpt -->
					<p class="mb-3.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
						{getExcerpt(post.content)}
					</p>

					<!-- Stats -->
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-xs text-muted-foreground">
							<Heart size={13} />
							{formatCompactNum(post.likesCount)}
						</span>
						<span class="flex items-center gap-1 text-xs text-muted-foreground">
							<MessageSquare size={13} />
							{formatCompactNum(post.commentsCount)}
						</span>
						<span class="flex items-center gap-1 text-xs text-muted-foreground">
							<Clock size={13} />
							{getReadingTime(post.content)}
						</span>
					</div>
				</div>

				<!-- Right: thumbnail placeholder -->
				<div
					class="size-20 shrink-0 rounded-md border border-border bg-muted/50 font-ibm uppercase {getThumbnailColor(
						post.title
					)} flex items-center justify-center text-2xl font-medium"
					aria-hidden="true"
				>
					{post.title[0]}
				</div>
			</a>
		{/each}

		<!-- Empty state -->
		{#if sortedPosts.length === 0}
			<div class="border-t border-border text-center">
				{#if search}
					<p class="text-sm text-muted-foreground">
						No posts matching <span class="text-foreground">{search}</span>
					</p>
				{:else}
					<p class="text-sm text-muted-foreground">No posts yet.</p>
				{/if}
			</div>
		{/if}
	</div>

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
