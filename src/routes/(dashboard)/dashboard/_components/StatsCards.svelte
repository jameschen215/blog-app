<script lang="ts">
	import type { PostWithAuthor } from '$lib/types/data';
	import { CircleCheck, Clock, FileText, MessageCircleMore } from '@lucide/svelte';

	interface Props {
		posts: PostWithAuthor[];
		getPublished: (post: PostWithAuthor) => boolean;
	}

	let { posts, getPublished }: Props = $props();

	let totalPosts = $derived(posts.length);
	let publishedCount = $derived(posts.filter((p) => getPublished(p)).length);
	let draftCount = $derived(posts.filter((p) => !getPublished(p)).length);
	let totalComments = $derived(posts.reduce((a, c) => a + (c.commentsCount ?? 0), 0));

	let statsData = $derived([
		{ label: 'Total posts', value: totalPosts, icon: FileText, accent: 'text-foreground' },
		{ label: 'Published', value: publishedCount, icon: CircleCheck, accent: 'text-emerald-500' },
		{ label: 'Drafts', value: draftCount, icon: Clock, accent: 'text-amber-500' },
		{ label: 'Comments', value: totalComments, icon: MessageCircleMore, accent: 'text-sky-500' }
	]);
</script>

<div class="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
	{#each statsData as stat (stat.label)}
		<div class="rounded-sm border border-border bg-card p-4">
			<div class="mb-3 flex items-center justify-between">
				<span class="font-ibm text-xs font-medium tracking-widest text-muted-foreground uppercase">
					{stat.label}
				</span>
				<stat.icon class="size-4 opacity-70 {stat.accent}" />
			</div>
			<span class="font-ibm text-3xl font-bold">{stat.value}</span>
		</div>
	{/each}
</div>
