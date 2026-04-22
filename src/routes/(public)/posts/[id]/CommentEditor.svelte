<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		value: string;
		maxLength: number;
		remaining: number;
		disabled?: boolean;
		placeholder?: string;
		id?: string;
		textareaEl?: HTMLTextAreaElement | null;
		actions: Snippet;
	}

	let {
		value = $bindable(),
		maxLength,
		remaining,
		disabled = false,
		placeholder = '',
		id,
		textareaEl = $bindable(),
		actions
	}: Props = $props();
</script>

<div
	class="overflow-hidden rounded-md border border-border transition-colors focus-within:border-foreground/30"
>
	<textarea
		{id}
		bind:this={textareaEl}
		bind:value
		name="content"
		maxlength={maxLength}
		{disabled}
		{placeholder}
		rows={3}
		class="w-full resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
	></textarea>

	<div class="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2">
		<span class="text-xs {remaining === 0 ? 'text-destructive' : 'text-muted-foreground'}">
			{remaining} left
		</span>
		{@render actions()}
	</div>
</div>
