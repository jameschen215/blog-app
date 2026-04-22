<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		maxWidth?: string;
		el?: HTMLElement | null;
		children: Snippet;
	}

	let { maxWidth = 'max-w-2xl', el = $bindable(), children }: Props = $props();
</script>

<header
	bind:this={el}
	class="sticky top-0 z-20 w-full border-b border-border bg-background/80 backdrop-blur"
>
	<div class="relative mx-auto flex h-14 w-full {maxWidth} items-center justify-between px-6">
		{@render children()}
	</div>
</header>
