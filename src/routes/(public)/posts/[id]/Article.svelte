<script lang="ts">
	import type { PostDetail } from '$lib/types/data';
	import { getReadingTime } from '$lib/utils/formatters';
	import { sanitizeHtml } from '$lib/utils/sanitize';
	import { ChevronLeft } from '@lucide/svelte';
	import { format } from 'date-fns';

	interface Props {
		post: PostDetail;
	}

	let { post }: Props = $props();
</script>

<section class="w-full">
	<!-- Back link -->
	<div class="border-b border-border py-3.5">
		<a
			href="/"
			aria-label="Back to Home"
			class="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ChevronLeft size={13} />
			All posts
		</a>
	</div>

	<!-- Title -->
	<div class="pt-9 pb-6">
		<h1
			class="font-ibm text-3xl leading-snug font-medium tracking-tight text-foreground sm:text-4xl"
		>
			{post.title}
		</h1>
	</div>

	<!-- Author + meta -->
	<div class="mb-8 flex items-center gap-2.5">
		<a
			href="/users/{post.author.id}"
			aria-label="To user page"
			class="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-[12px] font-medium text-foreground uppercase transition-colors hover:border-foreground/30"
		>
			{post.author.username[0]}
		</a>
		<a
			href="/users/{post.author.id}"
			aria-label="To user page"
			class="text-sm font-medium text-foreground transition-colors hover:underline hover:underline-offset-2"
		>
			{post.author.username}
		</a>
		<span class="text-muted-foreground/40">·</span>
		<span class="text-sm text-muted-foreground">
			{format(post.createdAt, 'MMM d, yyyy')}
		</span>
		<span class="text-muted-foreground/40">·</span>
		<span class="text-sm text-muted-foreground">
			{getReadingTime(post.content)}
		</span>
	</div>

	<!-- Content -->
	<div class="prose max-w-none prose-zinc dark:prose-invert">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html sanitizeHtml(post.content)}
	</div>
</section>
