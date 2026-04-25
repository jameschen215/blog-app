<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ArrowUp } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	interface Props {
		threshold?: number;
		maxWidth?: string;
	}

	let { threshold = 400, maxWidth = 'max-w-2xl' }: Props = $props();

	let visible = $state(false);

	function handleScroll() {
		visible = window.scrollY > threshold;
	}

	function scrollToTop() {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({
			top: 0,
			behavior: prefersReducedMotion ? 'auto' : 'smooth'
		});
	}

	$effect(() => {
		console.log({ visible });

		// Initial check (e.g. after navigation lands deep on a page)
		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if visible}
	<div
		transition:fade={{ duration: 300 }}
		class="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-6"
	>
		<div class="relative w-full {maxWidth}">
			<div class="pointer-events-auto absolute right-0 bottom-0">
				<Button
					variant="outline"
					size="icon"
					onclick={scrollToTop}
					class="cursor-pointer rounded-full shadow-lg backdrop-blur"
					aria-label="Scroll to top"
					title="Scroll to top"
				>
					<ArrowUp class="size-[1.1rem]" strokeWidth={1.5} />
				</Button>
			</div>
		</div>
	</div>
{/if}
