<script lang="ts">
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import { browser } from '$app/environment';

	import { sanitizeHtml } from '$lib/utils/sanitize';

	import ViewMode from './_components/ViewMode.svelte';
	import EditMode from './_components/EditMode.svelte';
	import DraftBanner from './_components/DraftBanner.svelte';

	type DraftSource = 'server' | 'local';
	type EditDraft = {
		title: string;
		content: string;
		published: boolean;
		source: DraftSource;
		savedAt: string | null;
	};

	const { data, form }: PageProps = $props();
	const post = $derived(data.post);

	const STORAGE_KEY = $derived(`draft:edit-post:${post.id}`);

	let mode = $state<'view' | 'edit'>('view');
	let draft = $state<EditDraft>({
		title: '',
		content: '',
		published: false,
		source: 'server',
		savedAt: null
	});
	let hasDraft = $state(false);
	let hydratedPostId = $state<number | null>(null);

	let serverSnapshot = $derived({
		title: post.title,
		content: sanitizeHtml(post.content),
		published: post.published
	});

	let hasChanges = $derived(
		draft.title !== serverSnapshot.title ||
			draft.content !== serverSnapshot.content ||
			draft.published !== serverSnapshot.published
	);

	function createServerDraft(): EditDraft {
		return {
			title: serverSnapshot.title,
			content: serverSnapshot.content,
			published: serverSnapshot.published,
			source: 'server',
			savedAt: null
		};
	}

	function saveDraft() {
		if (!browser || (!draft.title && !draft.content)) return;

		const now = new Date().toLocaleTimeString();
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				title: draft.title,
				content: draft.content,
				published: draft.published,
				savedAt: now
			})
		);
		draft = { ...draft, source: 'local', savedAt: now };

		toast.success('Draft saved locally!');
	}

	function loadStoredDraft(): EditDraft | null {
		if (!browser) return null;

		const saved = localStorage.getItem(STORAGE_KEY);
		if (!saved) return null;

		try {
			const parsed = JSON.parse(saved);

			return {
				title: parsed.title ?? serverSnapshot.title,
				content: parsed.content ?? serverSnapshot.content,
				published: parsed.published ?? serverSnapshot.published,
				source: 'local',
				savedAt: parsed.savedAt ?? null
			};
		} catch {
			return null;
		}
	}

	function restoreDraft() {
		const storedDraft = loadStoredDraft();
		if (!storedDraft) return;

		draft = storedDraft;
		hasDraft = false;

		toast.success('Draft restored.');
	}

	function clearDraft() {
		if (!browser) return;

		localStorage.removeItem(STORAGE_KEY);
		draft = { ...draft, source: 'server', savedAt: null };
	}

	function discardDraft() {
		clearDraft();
		draft = createServerDraft();
		hasDraft = false;
	}

	function draftMatchesServer(candidate: EditDraft): boolean {
		return (
			candidate.title === serverSnapshot.title &&
			candidate.content === serverSnapshot.content &&
			candidate.published === serverSnapshot.published
		);
	}

	function handleContentUpdate(html: string) {
		draft = { ...draft, content: sanitizeHtml(html) };
	}

	$effect(() => {
		if (hydratedPostId === post.id) return;

		hydratedPostId = post.id;
		mode = 'view';
		draft = createServerDraft();

		const storedDraft = loadStoredDraft();
		hasDraft = !!storedDraft && !draftMatchesServer(storedDraft);
	});

	// Auto-save every 30s while editing
	$effect(() => {
		if (!browser || mode !== 'edit') return;

		const interval = setInterval(saveDraft, 30000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>{post.title} - Dashboard</title>
</svelte:head>

<div class="w-full px-6 pb-20">
	{#if hasDraft}
		<DraftBanner {restoreDraft} {discardDraft} bind:mode />
	{/if}

	{#if mode === 'view'}
		<ViewMode bind:mode {post} />
	{:else}
		<EditMode
			bind:mode
			bind:draft
			{form}
			{discardDraft}
			{hasChanges}
			{saveDraft}
			onContentUpdate={handleContentUpdate}
		/>
	{/if}
</div>
