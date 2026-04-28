<script lang="ts">
	import { format } from 'date-fns';
	import { Heart, MessageSquare, Clock } from '@lucide/svelte';
	import type { PostWithAuthor } from '$lib/types/data';
	import Avatar from '$lib/components/Avatar.svelte';
	import {
		formatCompactNum,
		getExcerptOfTheFirstPara,
		getReadingTime,
		getThumbnailColor
	} from '$lib/utils/formatters';

	interface Props {
		post: PostWithAuthor;
		showAuthor?: boolean;
	}

	let { post, showAuthor = true }: Props = $props();
</script>

<a
	href="/posts/{post.id}"
	class="-mx-6 grid grid-cols-1 items-start gap-4 border-t border-border py-5 transition-colors hover:bg-accent/30 sm:grid-cols-[1fr_auto] sm:px-3"
>
	<!-- Left: text content -->
	<div class="min-w-0">
		<!-- Author + date -->
		<div class="mb-2.5 flex items-center gap-2">
			{#if showAuthor}
				<Avatar username={post.author.username} className="size-6 text-[12px]" />
				<span class="text-sm text-muted-foreground">{post.author.username}</span>
				<span class="text-muted-foreground">·</span>
			{/if}
			<span class="text-sm text-muted-foreground">{format(post.createdAt, 'MMM d, yyyy')}</span>
		</div>

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
				<MessageSquare size={13} />
				{formatCompactNum(post.commentsCount)}
			</span>
			<span class="flex items-center gap-1 text-xs text-muted-foreground">
				<Clock size={13} />
				{getReadingTime(post.content)}
			</span>
		</div>
	</div>

	<!-- Right: thumbnail -->
	<div
		class="hidden size-20 shrink-0 rounded-md font-ibm text-foreground/80 sm:flex
			{getThumbnailColor(post.title)} items-center justify-center text-2xl font-medium"
		aria-hidden="true"
	>
		{post.title[0].toUpperCase()}
	</div>
</a>
