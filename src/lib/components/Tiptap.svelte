<!-- $lib/components/Tiptap.svelte -->

<script lang="ts">
	import { Editor } from '@tiptap/core';
	import { onMount, onDestroy } from 'svelte';
	import { StarterKit } from '@tiptap/starter-kit';
	import { Placeholder } from '@tiptap/extension-placeholder';
	import { Bold, CodeXml, Italic, List, ListOrdered, Quote, Save } from '@lucide/svelte';

	interface Props {
		content: string;
		lastSaved?: string | null;
		disableSave: boolean;
		onUpdate?: (html: string) => void;
		saveDraft?: () => void;
	}

	let { content, lastSaved = null, disableSave, onUpdate, saveDraft }: Props = $props();

	let element = $state<HTMLDivElement>();
	let editor = $state<Editor | null>(null);
	let activeFormats = $state({
		bold: false,
		italic: false,
		codeBlock: false,
		bulletList: false,
		orderedList: false,
		blockquote: false
	});

	function syncActiveFormats(currentEditor: Editor | null) {
		if (!currentEditor) return;

		queueMicrotask(() => {
			activeFormats = {
				bold: currentEditor.isActive('bold'),
				italic: currentEditor.isActive('italic'),
				codeBlock: currentEditor.isActive('codeBlock'),
				bulletList: currentEditor.isActive('bulletList'),
				orderedList: currentEditor.isActive('orderedList'),
				blockquote: currentEditor.isActive('blockquote')
			};
		});
	}

	onMount(() => {
		editor = new Editor({
			element: element!,
			extensions: [StarterKit, Placeholder.configure({ placeholder: 'New blog content here...' })],
			content,
			autofocus: true,
			editorProps: {
				attributes: {
					class:
						'tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none w-full px-3 focus:outline-none'
				}
			},
			onTransaction: ({ editor }) => {
				syncActiveFormats(editor);
			},
			onUpdate: ({ editor }) => {
				onUpdate?.(editor.getHTML());
			}
		});

		syncActiveFormats(editor);
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<!-- Toolbar -->
{#if editor}
	<div class="border-border flex flex-wrap gap-1 border-b px-3 py-2">
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleBold().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm"
			class:bg-accent={activeFormats.bold}
		>
			<Bold size={16} />
		</button>
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleItalic().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm italic"
			class:bg-accent={activeFormats.italic}
		>
			<Italic size={16} />
		</button>

		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
			class="font-roboto hover:bg-accent hidden cursor-pointer rounded-sm px-2 py-1 text-sm sm:block"
			class:bg-accent={activeFormats.codeBlock}
		>
			<CodeXml size={18} />
		</button>

		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleBulletList().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm"
			class:bg-accent={activeFormats.bulletList}
		>
			<List strokeWidth={1.5} size={20} />
		</button>
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleOrderedList().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm"
			class:bg-accent={activeFormats.orderedList}
		>
			<ListOrdered strokeWidth={1.5} size={20} />
		</button>
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleBlockquote().run()}
			class="font-roboto hover:bg-accent hidden cursor-pointer rounded-sm px-2 py-1 text-sm sm:block"
			class:bg-accent={activeFormats.blockquote}
		>
			<Quote strokeWidth={1.5} size={18} />
		</button>

		<div class="ml-auto flex items-center gap-1">
			{#if lastSaved}
				<span class="text-muted-foreground/60 flex items-center text-xs">Saved</span>
			{/if}
			<button
				type="button"
				onclick={saveDraft}
				disabled={disableSave}
				class="font-roboto not-disabled:hover:bg-accent disabled:text-muted-foreground cursor-pointer rounded-sm px-2 py-1 text-sm disabled:cursor-default"
			>
				<Save strokeWidth={1.5} size={20} />
			</button>
		</div>
	</div>
{/if}

<!-- Editor area -->
<div
	class="min-h-120 w-full cursor-text py-2"
	bind:this={element}
	role="textbox"
	tabindex="0"
	onclick={() => editor?.commands.focus()}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			editor?.commands.focus();
		}
	}}
></div>

<style>
	:global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		color: var(--muted-foreground);
		font-weight: 300;
		float: left;
		pointer-events: none;
		height: 0;
	}

	:global(.tiptap) {
		font-size: 16px;
		font-family: 'Roboto', sans-serif;
		line-height: 1.75;
	}
</style>
