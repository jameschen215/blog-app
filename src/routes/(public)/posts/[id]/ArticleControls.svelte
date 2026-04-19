<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { AuthResultUser, PostDetail } from '$lib/types/data';
	import { formatCompactNum } from '$lib/utils/formatters';
	import { Heart, MessageSquare } from '@lucide/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	interface Props {
		user: AuthResultUser | null;
		post: PostDetail;
		handleCommentClick: () => void;
	}

	let { user, post, handleCommentClick }: Props = $props();

	let isAuthenticated = $derived(!!user);
	let optimisticLiked = $derived(post.isLikedByCurrentUser);
	let optimisticLikes = $derived(post.likesCount ?? 0);
	let pendingRequests = $state(0);

	const handleLikeSubmit: SubmitFunction = ({ cancel }) => {
		if (!isAuthenticated) {
			goto(`/auth/login?redirect=${encodeURIComponent(`/posts/${post.id}`)}`);
			cancel();
			return;
		}

		pendingRequests += 1;

		const originalLiked = optimisticLiked;
		const originalCount = optimisticLikes;

		optimisticLiked = !optimisticLiked;
		optimisticLikes = optimisticLiked ? originalCount + 1 : originalCount - 1;

		return async ({ result, update }) => {
			pendingRequests -= 1;

			if (result.type === 'failure') {
				optimisticLiked = originalLiked;
				optimisticLikes = originalCount;
				toast.error((result.data?.message as string) ?? 'Something went wrong');
				return;
			}

			if (result.type === 'success' && pendingRequests === 0) {
				await update();
			}
		};
	};
</script>

<div class="my-8 flex items-center gap-5 border-y border-border py-4 text-muted-foreground">
	<!-- Like -->
	<form action="?/like" method="post" use:enhance={handleLikeSubmit}>
		{#key optimisticLiked}
			<button
				type="submit"
				in:scale={{ start: 0.85, duration: 180, easing: cubicOut }}
				class="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
			>
				<Heart
					size={15}
					fill={optimisticLiked ? 'currentColor' : 'none'}
					class={optimisticLiked ? 'text-rose-500' : ''}
				/>
				<span class="text-sm">{formatCompactNum(optimisticLikes)}</span>
			</button>
		{/key}
	</form>

	<!-- Comments -->
	<button
		onclick={handleCommentClick}
		class="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
	>
		<MessageSquare size={15} />
		<span class="text-sm">
			{formatCompactNum(post.commentsCount)}
			{post.commentsCount === 1 ? 'comment' : 'comments'}
		</span>
	</button>
</div>
