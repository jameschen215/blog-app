<script lang="ts">
	import { ChevronLeft } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import Avatar from '$lib/components/Avatar.svelte';
	import PostCard from '$lib/components/PostCard.svelte';

	let { data }: PageProps = $props();

	let author = $derived(data.user);
	let posts = $derived(data.posts ?? []);
</script>

<svelte:head>
	<title>{author.username} — The Blog</title>
	<meta name="description" content="Posts by {author.username}" />
</svelte:head>

<div class="w-full px-6 pb-16">
	<!-- Back link -->
	<div class="py-3">
		<a
			href="/"
			class="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ChevronLeft size={13} />
			All posts
		</a>
	</div>

	<!-- Author header -->
	<div class="flex items-center gap-5 py-9">
		<Avatar username={author.username} className="size-16 text-3xl" />

		<div>
			<h1 class="font-ibm text-2xl font-medium tracking-tight text-foreground">
				{author.username}
			</h1>
			<p class="mt-1 text-sm text-muted-foreground">
				{posts.length}
				{posts.length === 1 ? 'post' : 'posts'}
			</p>
		</div>
	</div>

	<!-- Posts list -->
	{#if posts.length > 0}
		<ul class="px-6">
			{#each posts as post (post.id)}
				<li>
					<PostCard {post} showAuthor={false} />
				</li>
			{/each}
		</ul>
	{:else}
		<div class="border-t border-border py-20 text-center">
			<p class="text-sm text-muted-foreground">No posts yet.</p>
		</div>
	{/if}
</div>
