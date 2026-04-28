<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/Avatar.svelte';
	import { CONSTANTS } from '$lib/constants';
	import type { AuthResultUser, PostDetail } from '$lib/types/data';
	import { formatCompactNum } from '$lib/utils/formatters';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { format } from 'date-fns';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import CommentEditor from './CommentEditor.svelte';

	const MAX_LENGTH = CONSTANTS.COMMENT.MAX_LENGTH;

	interface FormResult {
		success?: boolean;
		message?: string;
		errors?: Record<string, string[]>;
		data?: { content: string };
	}

	interface Props {
		user: AuthResultUser | null;
		post: PostDetail;
		form: FormResult | null;
	}

	let { user, post, form }: Props = $props();

	let authenticated = $derived(!!user);
	let content = $state('');
	let submitting = $state(false);
	let remaining = $derived(Math.max(0, MAX_LENGTH - content.length));

	let textarea = $state<HTMLTextAreaElement | null>(null);

	// Edit state
	let editingCommentId = $state<number | null>(null);
	let editContent = $state('');
	let editSubmitting = $state(false);
	let editRemaining = $derived(Math.max(0, MAX_LENGTH - editContent.length));

	export function focus() {
		textarea?.focus();
	}

	export function scrollIntoView() {
		textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	async function startEditing(commentId: number, currentContent: string) {
		editingCommentId = commentId;
		editContent = currentContent;

		// Wait for DOM to update before focusing the edit textarea
		await tick();

		document.getElementById(`edit-textarea-${commentId}`)?.focus();
	}

	function cancelEditing() {
		editingCommentId = null;
		editContent = '';
	}

	function isEdited(createdAt: string, updatedAt: string): boolean {
		return new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 2000;
	}

	const handleCommentSubmit: SubmitFunction = () => {
		submitting = true;

		return async ({ result, update }) => {
			submitting = false;

			if (result.type === 'success') {
				content = '';
				toast.success('Comment posted!');
				await update();
			} else if (result.type === 'failure') {
				if (result.data?.message) {
					toast.error(result.data.message as string);
				}

				// If unauthenticated, redirect to login
				if (result.status === 401) {
					goto(`/auth/login?redirect=/posts/${post.id}`);
				}
			}
		};
	};

	const handleEditSubmit: SubmitFunction = () => {
		editSubmitting = true;

		return async ({ result, update }) => {
			editSubmitting = false;

			if (result.type === 'success') {
				cancelEditing();
				toast.success('Comment updated.');
				await update();
			} else if (result.type === 'failure') {
				toast.error((result.data?.message as string) ?? 'Failed to update comment.');
			}
		};
	};
</script>

<section>
	<h2 class="mb-6 font-ibm text-xl font-medium tracking-tight">
		Comments ({formatCompactNum(post.commentsCount)})
	</h2>

	<!-- Comment form -->
	<form action="?/comment" method="post" use:enhance={handleCommentSubmit} class="mb-10">
		{#if authenticated}
			<div class="mb-3 flex items-center gap-2">
				<Avatar username={user!.username} className="size-6 text-[12px]" />
				<span class="text-sm font-medium">{user!.username}</span>
			</div>
		{/if}

		<CommentEditor
			bind:value={content}
			bind:textareaEl={textarea}
			maxLength={MAX_LENGTH}
			{remaining}
			placeholder={authenticated ? 'What are your thoughts?' : 'Log in to leave a comment'}
			disabled={!authenticated || submitting}
		>
			{#snippet actions()}
				{#if authenticated}
					<button
						type="submit"
						disabled={!content.trim() || submitting}
						class="rounded-md bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-opacity disabled:pointer-events-none disabled:opacity-40"
					>
						{submitting ? 'Posting...' : 'Submit'}
					</button>
				{:else}
					<a
						href="/auth/login?redirect=/posts/{post.id}"
						class="rounded-md border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
					>
						Login to comment
					</a>
				{/if}
			{/snippet}
		</CommentEditor>

		{#if form?.errors?.content}
			<p class="mt-1.5 text-xs text-destructive">{form.errors.content[0]}</p>
		{/if}
	</form>

	<!-- Comments list -->
	{#if post.commentsCount > 0}
		<ul class="space-y-0">
			{#each post.comments as comment (comment.id)}
				<li class="border-t border-border py-6">
					<div class="min-w-0 flex-1">
						<!-- Head row -->
						<div class="mb-1.5 flex items-baseline justify-between gap-2">
							<div class="flex items-baseline gap-2">
								<div class="mb-3 flex items-center gap-2">
									{#if comment.author}
										<a
											href="/users/{comment.author.id}"
											class="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-[12px] font-medium text-foreground uppercase transition-colors hover:border-foreground/30"
										>
											{comment.author.username[0]}
										</a>
										<a
											href="/users/{comment.author.id}"
											class="text-sm font-medium text-foreground transition-colors hover:underline hover:underline-offset-2"
										>
											{comment.author.username}
										</a>
									{:else}
										<div
											class="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-[11px] font-medium text-muted-foreground"
										>
											?
										</div>
										<span class="text-sm font-medium text-foreground">Deleted user</span>
									{/if}
								</div>

								<span class="text-xs text-muted-foreground">
									{format(comment.createdAt, 'MMM d, yyyy')}
								</span>

								{#if isEdited(comment.createdAt, comment.updatedAt)}
									<span class="text-xs text-muted-foreground/50">edited</span>
								{/if}
							</div>

							<!-- Edit button - only for comment author -->
							{#if user?.id === comment.author?.id && editingCommentId !== comment.id}
								<button
									type="button"
									onclick={() => startEditing(comment.id, comment.content)}
									class="cursor-pointer text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
								>
									Edit
								</button>
							{/if}
						</div>

						<!-- View mode -->
						{#if editingCommentId !== comment.id}
							<p class="foreground ml-9 text-sm leading-relaxed text-muted-foreground">
								{comment.content}
							</p>
							<!-- Edit mode -->
						{:else}
							<form
								action="?/editComment"
								method="post"
								use:enhance={handleEditSubmit}
								class="mt-1"
							>
								<input type="hidden" name="commentId" value={comment.id} />

								<CommentEditor
									bind:value={editContent}
									maxLength={MAX_LENGTH}
									remaining={editRemaining}
									id="edit-textarea-{comment.id}"
									disabled={editSubmitting}
								>
									{#snippet actions()}
										<div class="flex items-center gap-2">
											<button
												type="button"
												onclick={cancelEditing}
												disabled={editSubmitting}
												class="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-40"
											>
												Cancel
											</button>
											<button
												type="submit"
												disabled={!editContent.trim() ||
													editSubmitting ||
													editContent === comment.content}
												class="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity disabled:pointer-events-none disabled:opacity-40"
											>
												{editSubmitting ? 'Saving...' : 'Save'}
											</button>
										</div>
									{/snippet}
								</CommentEditor>
							</form>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="py-10 text-center text-sm text-muted-foreground">No comments yet. Be the first.</p>
	{/if}
</section>
