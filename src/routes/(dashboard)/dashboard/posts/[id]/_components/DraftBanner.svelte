<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		restoreDraft: () => void;
		discardDraft: () => void;
		mode: 'view' | 'edit';
	}

	let { restoreDraft, discardDraft, mode = $bindable() }: Props = $props();
</script>

<div
	transition:fade={{ duration: 150 }}
	class="mt-6 flex items-center justify-between rounded-sm border border-amber-500/30 bg-amber-500/10 px-4 py-3"
>
	<span class="text-sm text-amber-700 dark:text-amber-400">
		You have unsaved edits from a previous session.
	</span>
	<div class="flex gap-2">
		<button
			type="button"
			onclick={() => {
				restoreDraft();
				mode = 'edit';
			}}
			class="cursor-pointer rounded-sm px-3 py-1 text-sm font-medium text-amber-700 hover:bg-amber-500/20 dark:text-amber-400"
		>
			Resume editing
		</button>
		<button
			type="button"
			onclick={discardDraft}
			class="cursor-pointer rounded-sm px-3 py-1 text-sm text-muted-foreground hover:bg-accent"
		>
			Discard
		</button>
	</div>
</div>
