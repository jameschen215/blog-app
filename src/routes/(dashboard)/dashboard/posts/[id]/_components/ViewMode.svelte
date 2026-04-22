<script lang="ts">
	import { format } from 'date-fns';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	import Avatar from '$lib/components/Avatar.svelte';
	import { sanitizeHtml } from '$lib/utils/sanitize';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { CommentWithAuthor, PostDetail } from '$lib/types/data';
	import { formatCompactNum, getReadingTime } from '$lib/utils/formatters';
	import { Check, ChevronLeft, Eraser, Heart, MessageSquare, Trash2, X } from '@lucide/svelte';

	interface Props {
		post: PostDetail;
		mode: 'view' | 'edit';
	}

	let { post, mode = $bindable() }: Props = $props();

	// Handle comment moderating state
	let confirmingDeleteId = $state<number | null>(null);
	let deletedCommentIds = new SvelteSet<number>();
	let deletedComments = new SvelteMap<number, CommentWithAuthor>();

	let visibleComments = $derived(post.comments.filter((c) => !deletedCommentIds.has(c.id)));

	const enhanceDeleteComment: SubmitFunction = ({ formData }) => {
		const commentId = Number(formData.get('commentId'));
		const comment = post.comments.find((c) => c.id === commentId);

		if (!comment) return;

		// Snapshot for rollback
		deletedCommentIds.add(commentId);
		deletedComments.set(commentId, comment);
		confirmingDeleteId = null;
		toast.success('Comment deleted.');

		return async ({ result, update }) => {
			if (result.type !== 'success') {
				toast.error('Failed to delete comment.');
			}

			await update({ reset: false });

			// Clean up after response received in case leading to changes
			// in visibleComments before it should be.
			deletedComments.delete(commentId);
			deletedCommentIds.delete(commentId);
		};
	};
</script>

<section class="w-full">
	<!-- Back link -->
	<div class="border-b border-border py-3.5">
		<a
			href="/dashboard"
			class="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ChevronLeft size={13} /> Dashboard
		</a>
	</div>

	<!-- Post header - title, meta, edit button -->
	<div class="flex justify-between gap-4 py-8">
		<div class="min-w-0 flex-1">
			<!-- Published/draft badge -->
			<div class="mb-3">
				{#if post.published}
					<span
						class="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
					>
						Published
					</span>
				{:else}
					<span
						class="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400"
					>
						Draft
					</span>
				{/if}
			</div>

			<h1 class="font-ibm text-3xl leading-snug font-medium tracking-tight text-foreground">
				{post.title}
			</h1>

			<!-- Meta row -->
			<div class="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
				<span>{format(post.createdAt, 'MMM d, yyyy')}</span>
				<span class="text-muted-foreground/40">·</span>
				<span class="flex items-center gap-1">
					<Heart size={13} />
					{formatCompactNum(post.likesCount)}
				</span>
				<span class="text-muted-foreground/40">·</span>
				<span class="flex items-center gap-1">
					<MessageSquare size={13} />
					{formatCompactNum(post.commentsCount)}
				</span>
				<span class="text-muted-foreground/40">·</span>
				<span>{getReadingTime(post.content)}</span>
			</div>
		</div>

		<!-- Edit button -->
		<Button
			variant="outline"
			onclick={() => (mode = 'edit')}
			class="mt-1 shrink-0 cursor-pointer rounded-md"
		>
			<Eraser class="size-3.5" /> Edit
		</Button>
	</div>

	<!-- Content -->
	<div class="prose max-w-none border-t border-border pt-6 prose-zinc dark:prose-invert">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html sanitizeHtml(post.content)}
	</div>

	<!-- Comments -->
	<div class="mt-10 border-t border-border pt-6">
		<h2 class="mb-4 font-ibm text-xl font-medium">
			Comments ({formatCompactNum(visibleComments.length)})
		</h2>

		{#if visibleComments.length > 0}
			<ul>
				{#each visibleComments as comment (comment.id)}
					<li class="group border-b border-border py-4 last:border-b-0">
						<div class="flex justify-between gap-3">
							<div class="flex min-w-0 flex-1 gap-3">
								{#if comment.author}
									<Avatar
										username={comment.author.username}
										className="size-7 shrink-0 text-[12px]"
									/>
								{:else}
									<div
										class="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-[12px] text-muted-foreground"
									>
										?
									</div>
								{/if}

								<div class="min-w-0 flex-1">
									<div class="mb-1 flex items-center justify-between">
										<div class="flex items-baseline gap-2">
											<span class="text-sm font-medium text-foreground">
												{comment.author?.username ?? 'Deleted user'}
											</span>
											<span class="text-xs text-muted-foreground">
												{format(comment.createdAt, 'MMM d, yyyy')}
											</span>
										</div>

										<!-- Delete with inline confirm -->
										{#if confirmingDeleteId === comment.id}
											<div
												class="flex shrink-0 items-center gap-1"
												in:slide={{ axis: 'x', duration: 200 }}
											>
												<form
													action="?/deleteComment"
													method="post"
													use:enhance={enhanceDeleteComment}
												>
													<input type="hidden" name="commentId" value={comment.id} />
													<button
														type="submit"
														title="Confirm delete"
														class="cursor-pointer rounded-sm bg-destructive/10 p-1.5 text-destructive transition-colors hover:bg-destructive/20"
													>
														<Check class="size-3.5" />
													</button>
												</form>

												<button
													type="button"
													title="Cancel"
													onclick={() => (confirmingDeleteId = null)}
													class="cursor-pointer rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
												>
													<X class="size-3.5" />
												</button>
											</div>
										{:else}
											<button
												type="button"
												title="Delete comment"
												onclick={() => (confirmingDeleteId = comment.id)}
												class="cursor-pointer rounded-sm p-1.5 text-muted-foreground opacity-0 transition-all duration-200 group-focus-within:opacity-100 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
											>
												<Trash2 class="size-3.5" />
											</button>
										{/if}
									</div>

									<div
										class="prose max-w-none text-sm text-muted-foreground prose-zinc dark:prose-invert"
									>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html sanitizeHtml(comment.content)}
									</div>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="py-8 text-center text-sm text-muted-foreground">No comments yet.</p>
		{/if}
	</div>
</section>
