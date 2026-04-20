<script lang="ts">
	import './layout.css';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<LoadingSpinner />
<Toaster position="bottom-left" />

{@render children()}
