<script lang="ts">
	import { navigating } from '$app/state';
	import { LoaderCircle } from '@lucide/svelte';

	import { fade } from 'svelte/transition';
</script>

{#if navigating.to}
	<div
		class="bg-background/80 fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col items-center justify-center gap-2 backdrop-blur-sm"
		transition:fade={{ duration: 150 }}
	>
		<LoaderCircle strokeWidth={1.25} class="text-primary h-8 w-8 animate-spin" />
		Loading...
	</div>
{/if}
