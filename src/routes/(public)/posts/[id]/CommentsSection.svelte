<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/Avatar.svelte';
	import { CONSTANTS } from '$lib/constants';
	import type { AuthResultUser, PostDetail } from '$lib/types/data';
	import { formatCompactNum } from '$lib/utils/formatters';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { format } from 'date-fns';
	import { toast } from 'svelte-sonner';

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

	let isAuthenticated = $derived(!!user);
	let content = $state('');
	let submitting = $state(false);
	let remaining = $derived(Math.max(0, MAX_LENGTH - content.length));

	let textarea = $state<HTMLTextAreaElement | null>(null);

	export function focus() {
		textarea?.focus();
	}

	export function scrollIntoView() {
		textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
</script>

<section>
	<h2 class="mb-6 font-ibm text-xl font-medium tracking-tight">
		Comments ({formatCompactNum(post.commentsCount)})
	</h2>

	<!-- Comment form -->
	<form action="?/comment" method="post" use:enhance={handleCommentSubmit} class="mb-10">
		{#if isAuthenticated}
			<div class="mb-3 flex items-center gap-2">
				<Avatar username={user!.username} className="size-7 text-[12px]" />
				<span class="text-sm font-medium">{user!.username}</span>
			</div>
		{/if}

		<div
			class="overflow-hidden rounded-md border border-border transition-colors focus-within:border-foreground/30"
		>
			<textarea
				bind:this={textarea}
				bind:value={content}
				name="content"
				placeholder={isAuthenticated ? 'What are your thoughts?' : 'Log in to leave a comment'}
				maxlength={MAX_LENGTH}
				disabled={!isAuthenticated || submitting}
				class="w-full resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				rows={3}
			></textarea>

			<div class="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2">
				<span class="text-xs {remaining === 0 ? 'text-destructive' : 'text-muted-foreground'}">
					{remaining} left
				</span>

				{#if isAuthenticated}
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
						Log in to comment
					</a>
				{/if}
			</div>
		</div>

		{#if form?.errors?.content}
			<p class="mt-1.5 text-xs text-destructive">{form.errors.content[0]}</p>
		{/if}
	</form>

	<!-- Comments list -->
	{#if post.commentsCount > 0}
		<ul class="space-y-0">
			{#each post.comments as comment (comment.id)}
				<li class="border-t border-border py-6">
					<div class="flex items-start gap-3">
						{#if comment.author}
							<Avatar username={comment.author.username} className="size-7 shrink-0 text-[11px]" />
						{:else}
							<div
								class="justify-content flex size-7 shrink-0 items-center rounded-full border border-border bg-muted/50 text-[11px] font-medium text-muted-foreground"
							>
								?
							</div>
						{/if}

						<div class="min-w-0 flex-1">
							<div class="mb-1.5 flex items-baseline gap-2">
								<span class="text-sm font-medium text-foreground">
									{comment.author?.username ?? 'Deleted user'}
								</span>
								<span class="text-xs text-muted-foreground">
									{format(comment.createdAt, 'MMM d, yyyy')}
								</span>
							</div>
							<p class="text-sm leading-relaxed text-muted-foreground">
								{comment.content}
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="py-10 text-center text-sm text-muted-foreground">No comments yet. Be the first.</p>
	{/if}
</section>
