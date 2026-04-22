<script lang="ts">
	import type { AuthResultUser } from '$lib/types/data';

	const { user }: { user: AuthResultUser } = $props();
</script>

<div class="mb-8 flex items-start justify-between gap-4">
	<div>
		<h1 class="font-ibm text-3xl font-medium tracking-tight">
			{user.username}
		</h1>

		<p class="mt-1 text-sm text-muted-foreground">Manage your posts and moderate comments.</p>
	</div>
</div>
