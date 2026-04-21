<script lang="ts">
	import { format } from 'date-fns';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PostWithAuthor } from '$lib/types/data';
	import { Check, Eye, EyeOff, MessageCircleMore, Trash2, X } from '@lucide/svelte';

	interface Props {
		post: PostWithAuthor;
		toggleButtonDisabled: boolean;
		getPublished: (post: PostWithAuthor) => boolean;
		enhanceDelete: SubmitFunction;
		enhanceToggle: SubmitFunction;
	}

	let { post, toggleButtonDisabled, getPublished, enhanceDelete, enhanceToggle }: Props = $props();

	let deletingPostId = $state<number | null>(null);
</script>

<div
	class="grid grid-cols-3 gap-y-3 py-4 hover:bg-accent/25 sm:grid-cols-[1fr_86px_76px_92px] sm:items-center sm:gap-4"
>
	<!-- Title + comment count -->
	<button
		class="col-span-3 min-w-0 cursor-pointer text-left sm:col-span-1"
		onclick={() => goto(`/dashboard/posts/${post.id}`)}
	>
		<p class="truncate font-ibm text-sm leading-snug font-semibold">
			{post.title}
		</p>
		<span class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
			<MessageCircleMore class="size-3" />
			{post.commentsCount ?? 0}
			{post.commentsCount === 1 ? 'comment' : 'comments'}
		</span>
	</button>

	<!-- Status badge -->
	<div class="flex justify-start">
		{#if getPublished(post)}
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
			>
				Published
			</span>
		{:else}
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400"
			>
				Draft
			</span>
		{/if}
	</div>

	<!-- Date -->
	<span class="self-center text-center font-ibm text-xs text-muted-foreground">
		{format(post.updatedAt, 'yyyy-MM-dd')}
	</span>

	<!-- Actions -->
	<div
		class="relative flex w-full items-center justify-center gap-1 place-self-end sm:place-self-center"
	>
		<!-- Publish/unpublish toggle -->
		<form method="POST" action="?/togglePublish" use:enhance={enhanceToggle}>
			<input type="hidden" name="id" value={post.id} />
			<button
				title={getPublished(post) ? 'Unpublish' : 'Publish'}
				type="submit"
				disabled={toggleButtonDisabled}
				class="cursor-pointer rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
			>
				{#if getPublished(post)}
					<EyeOff class="size-4" />
				{:else}
					<Eye class="size-4" />
				{/if}
			</button>
		</form>

		<!-- Delete with inline confirm -->
		{#if deletingPostId === post.id}
			<div
				class="absolute z-10 flex items-center justify-center gap-1 bg-background"
				in:fly={{ x: 20, duration: 200 }}
			>
				<form action="?/deletePost" method="post" use:enhance={enhanceDelete}>
					<input type="hidden" name="id" value={post.id} />
					<button
						title="Confirm delete"
						type="submit"
						class="cursor-pointer rounded-sm bg-destructive/10 p-1.5 text-destructive transition-colors hover:bg-destructive/20"
					>
						<Check class="size-4" />
					</button>
				</form>
				<button
					title="Cancel"
					onclick={() => (deletingPostId = null)}
					class="cursor-pointer rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
				>
					<X class="size-4" />
				</button>
			</div>
		{:else}
			<button
				title="Delete post"
				onclick={() => (deletingPostId = post.id)}
				class="cursor-pointer rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
			>
				<Trash2 class="size-4" />
			</button>
		{/if}
	</div>
</div>
