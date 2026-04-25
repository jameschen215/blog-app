<script lang="ts">
	import Header from './Header.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	let { children, data } = $props();
</script>

<div class="flex min-h-screen flex-col items-center">
	<Header user={data.user} />

	<main class="flex- mx-auto w-full max-w-2xl">
		{@render children()}
	</main>

	<BackToTop />
</div>
