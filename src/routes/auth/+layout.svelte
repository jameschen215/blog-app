<script lang="ts">
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col items-center">
	<!-- Minimal header — just the brand -->
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

	<main class="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6">
		{@render children()}
	</main>
</div>
