<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<svelte:head>
	<title>{page.status} — The Blog</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center">
	<!-- Minimal header -->
	<header class="w-full border-b border-border">
		<div class="mx-auto flex h-14 w-full max-w-2xl items-center px-6">
			<a
				href="/"
				class="font-anton text-xl tracking-tight text-foreground transition-opacity hover:opacity-70"
			>
				The Blog
			</a>
		</div>
	</header>

	<!-- Error content -->
	<main
		class="flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-3 px-6 text-center"
	>
		<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
			{page.status}
		</p>

		<h1 class="font-ibm text-2xl font-medium tracking-tight text-foreground">
			{#if page.status === 404}
				Page not found
			{:else if page.status === 403}
				Access denied
			{:else if page.status === 400}
				Bad request
			{:else}
				Something went wrong
			{/if}
		</h1>

		<p class="mb-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
			{page.error?.message ?? 'An unexpected error occurred.'}
		</p>

		<div class="flex w-full items-center justify-center gap-6">
			<Button
				variant="default"
				type="button"
				onclick={() => goto('/')}
				class="cursor-pointer px-4 py-1.5 text-sm transition-colors hover:text-foreground"
			>
				Go home
			</Button>
			<Button
				variant="outline"
				type="button"
				onclick={() => history.back()}
				class="cursor-pointer px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				Go back
			</Button>
		</div>
	</main>
</div>
