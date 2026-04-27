<script lang="ts">
	import { cn } from '$lib/utils/shadcn';

	let { username, className = '' } = $props();
</script>

<div
	class={cn(
		'flex items-center justify-center rounded-full border border-border font-roboto text-lg font-normal dark:border-zinc-900',
		className
	)}
>
	<span>
		{username[0].toUpperCase()}
	</span>
	<span class="sr-only">User avatar - {username[0]}</span>
</div>
