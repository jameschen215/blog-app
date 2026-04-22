<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageProps } from './$types';

	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import * as Field from '$lib/components/ui/field/index.js';

	import { getExcerpt } from '$lib/utils/formatters';
	import { sanitizeHtml } from '$lib/utils/sanitize';
	import TiptapEditor from '../[id]/_components/TiptapEditor.svelte';

	const STORAGE_KEY = 'draft:new-post';

	type NewDraft = {
		title: string;
		content: string;
		published: boolean;
		savedAt: string | null;
	};

	let { form }: PageProps = $props();

	let draft = $state<NewDraft>({
		title: '',
		content: '',
		published: false,
		savedAt: null
	});

	let submitting = $state(false);
	let isTitleFocused = $state(false);
	let hydrated = $state(false);
	let formEl = $state<HTMLFormElement | null>(null);

	let hasMeaningfulInput = $derived(
		draft.title.trim().length > 0 || getExcerpt(draft.content).length > 0
	);

	function saveDraft() {
		if (!browser || !hasMeaningfulInput) return;

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
		draft = { ...draft, savedAt: now };

		toast.success('Draft saved locally!');
	}

	function loadStoredDraft() {
		if (!browser) return;

		const saved = localStorage.getItem(STORAGE_KEY);
		if (!saved) return;

		try {
			const parsed = JSON.parse(saved);
			draft = {
				title: parsed.title ?? '',
				content: parsed.content ?? '',
				published: parsed.published ?? false,
				savedAt: parsed.savedAt ?? null
			};
		} catch {
			// bad JSON in storage — ignore
		}
	}

	function clearDraft() {
		if (!browser) return;
		localStorage.removeItem(STORAGE_KEY);
	}

	function handleContentUpdate(html: string) {
		draft = { ...draft, content: sanitizeHtml(html) };
	}

	// Hydrate once on mount
	$effect(() => {
		if (hydrated) return;
		hydrated = true;
		loadStoredDraft();
	});

	// Auto-save every 30s while there's meaningful content
	$effect(() => {
		if (!browser || !hasMeaningfulInput) return;

		const interval = setInterval(saveDraft, 30000);
		return () => clearInterval(interval);
	});

	// Cmd/Ctrl+S shortcut
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 's') {
				e.preventDefault();
				if (!submitting && hasMeaningfulInput) {
					formEl?.requestSubmit();
				}
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	const handleSubmit: SubmitFunction = ({ formData }) => {
		submitting = true;
		formData.set('content', draft.content);
		formData.set('published', String(draft.published));

		return async ({ result, update }) => {
			submitting = false;

			if (result.type === 'redirect') {
				clearDraft();
				toast.success('Post created!');
			}

			await update({ reset: false });
		};
	};
</script>

<svelte:head>
	<title>New post — Dashboard</title>
</svelte:head>

<section class="fixed inset-x-0 top-14 bottom-0 flex flex-col overflow-hidden bg-background">
	<form
		bind:this={formEl}
		method="post"
		class="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-6 py-6"
		use:enhance={handleSubmit}
	>
		<!-- Title -->
		<Field.Field class="shrink-0">
			<input
				name="title"
				placeholder="New post title"
				bind:value={draft.title}
				onfocus={() => (isTitleFocused = true)}
				onblur={() => (isTitleFocused = false)}
				class="w-full border-l bg-transparent px-2 font-roboto text-2xl tracking-tight placeholder:text-muted-foreground/40 focus:outline-none {isTitleFocused
					? 'border-transparent'
					: 'border-border'}"
			/>
			{#if form?.errors?.title}
				<Field.FieldError>{form.errors.title[0]}</Field.FieldError>
			{/if}
		</Field.Field>

		<!-- Tiptap editor -->
		<Field.Field class="mt-5 flex flex-1 flex-col overflow-hidden">
			<div class="flex flex-1 flex-col overflow-hidden rounded-sm border border-border">
				<TiptapEditor
					content={draft.content}
					lastSaved={draft.savedAt}
					disableSave={!hasMeaningfulInput}
					onUpdate={handleContentUpdate}
					{saveDraft}
				/>
			</div>
			{#if form?.errors?.content}
				<Field.FieldError>{form.errors.content[0]}</Field.FieldError>
			{/if}
		</Field.Field>

		<!-- Bottom bar: publish toggle + actions -->
		<div class="mt-5 flex shrink-0 items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<Switch
					bind:checked={draft.published}
					id="published"
					disabled={submitting}
					class="cursor-pointer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input [&_span]:data-[state=checked]:translate-x-[calc(100%-2px)]"
				/>
				<Label for="published" class="cursor-pointer text-sm text-muted-foreground">
					{draft.published ? 'Publish on save' : 'Save as draft'}
				</Label>
			</div>

			<div class="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					class="min-w-22 cursor-pointer rounded-sm"
					disabled={submitting}
					href="/dashboard"
				>
					Cancel
				</Button>
				<Button
					type="submit"
					class="min-w-22 cursor-pointer rounded-sm"
					disabled={submitting || !hasMeaningfulInput}
				>
					{submitting ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</div>
	</form>
</section>
