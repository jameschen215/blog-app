<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { getExcerpt } from '$lib/utils/formatters';

	import TiptapEditor from '../../_components/TiptapEditor.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	type DraftSource = 'server' | 'local';
	type EditDraft = {
		title: string;
		content: string;
		published: boolean;
		source: DraftSource;
		savedAt: string | null;
	};

	interface FormResult {
		success?: boolean;
		message?: string;
		errors?: Record<string, string[]>;
		data?: { title: string; content: string; published: boolean };
	}

	interface Props {
		form: FormResult | null;
		mode: 'view' | 'edit';
		draft: EditDraft;
		hasChanges: boolean;
		discardDraft: () => void;
		saveDraft: () => void;
		onContentUpdate: (html: string) => void;
	}

	let {
		form,
		mode = $bindable(),
		draft = $bindable(),
		hasChanges,
		discardDraft,
		saveDraft,
		onContentUpdate
	}: Props = $props();

	let submitting = $state(false);
	let isTitleFocused = $state(false);
	let hasMeaningfulInput = $derived(
		draft.title.trim().length > 0 || getExcerpt(draft.content).length > 0
	);

	const handleSubmit: SubmitFunction = ({ formData }) => {
		submitting = true;
		formData.set('content', draft.content);
		formData.set('published', String(draft.published));

		return async ({ result, update }) => {
			submitting = false;
			await update({ reset: false });

			if (result.type === 'success') {
				mode = 'view';
				discardDraft();
				toast.success('Post updated!');
			}
		};
	};

	// Keyboard shortcut for save - Cmd+s / Ctrl+s
	let formEl = $state<HTMLFormElement | null>(null);

	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 's') {
				e.preventDefault();

				if (!submitting && hasChanges) {
					formEl?.requestSubmit();
				}
			}
		}

		window.addEventListener('keydown', handleKeydown);

		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<section class="fixed inset-x-0 top-14 bottom-0 flex flex-col overflow-hidden bg-background">
	<form
		method="post"
		bind:this={formEl}
		action="?/updatePost"
		class="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-6 py-6"
		use:enhance={handleSubmit}
	>
		<!-- Title input -->
		<Field.Field class="shrink-0">
			<input
				name="title"
				placeholder="Post title"
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
					onUpdate={onContentUpdate}
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
					{draft.published ? 'Published' : 'Draft'}
				</Label>
			</div>

			<div class="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					class="min-w-22 cursor-pointer rounded-sm"
					disabled={submitting}
					onclick={() => (mode = 'view')}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					class="min-w-22 cursor-pointer rounded-sm"
					disabled={submitting || !hasChanges}
				>
					{submitting ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</div>
	</form>
</section>
