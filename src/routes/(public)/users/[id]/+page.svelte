<script lang="ts">
	import { format } from 'date-fns';
	import { Heart, MessageCircle, ChevronLeft } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import {
		formatCompactNum,
		getExcerptOfTheFirstPara,
		getReadingTime,
		getThumbnailColor
	} from '$lib/utils/formatters';
	import Avatar from '$lib/components/Avatar.svelte';

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
					<a
						href="/posts/{post.id}"
						class="-mx-6 grid grid-cols-1 items-start gap-4 border-t border-border px-3 py-5 transition-colors hover:bg-accent/30 sm:grid-cols-[1fr_auto]"
					>
						<!-- Left: text content -->
						<div class="min-w-0">
							<!-- Date only — no author since we're on their profile -->
							<p class="mb-2.5 text-sm text-muted-foreground">
								{format(post.createdAt, 'MMM d, yyyy')}
							</p>

							<!-- Title -->
							<h2
								class="mb-1.5 line-clamp-2 font-ibm text-[17px] leading-snug font-medium tracking-tight text-foreground"
							>
								{post.title}
							</h2>

							<!-- Excerpt -->
							<p class="mb-3.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
								{getExcerptOfTheFirstPara(post.content)}
							</p>

							<!-- Stats -->
							<div class="flex items-center gap-4">
								<span class="flex items-center gap-1 text-xs text-muted-foreground">
									<Heart size={13} />
									{formatCompactNum(post.likesCount)}
								</span>
								<span class="flex items-center gap-1 text-xs text-muted-foreground">
									<MessageCircle size={13} />
									{formatCompactNum(post.commentsCount)}
								</span>
								<span class="text-xs text-muted-foreground">
									{getReadingTime(post.content)}
								</span>
							</div>
						</div>

						<!-- Right: thumbnail (hidden on mobile) -->
						<div
							class="hidden size-20 shrink-0 rounded-md font-ibm text-foreground/80 sm:flex
								{getThumbnailColor(post.title)} items-center justify-center text-2xl font-medium"
							aria-hidden="true"
						>
							{post.title[0].toUpperCase()}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="border-t border-border py-20 text-center">
			<p class="text-sm text-muted-foreground">No posts yet.</p>
		</div>
	{/if}
</div>
