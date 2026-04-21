<script lang="ts">
	import { FileText } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="flex flex-col items-center justify-center py-20 text-center">
	<FileText strokeWidth={1} class="mb-4 size-10 text-muted-foreground opacity-40" />

	<p class="font-ibm text-sm text-muted-foreground">No posts yet.</p>

	<Button
		variant="ghost"
		href="/dashboard/posts/new"
		size="sm"
		class="mt-6 cursor-pointer rounded-sm"
	>
		Write your first post
	</Button>
</div>
