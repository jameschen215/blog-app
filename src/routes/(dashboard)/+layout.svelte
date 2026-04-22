<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { LayoutProps } from '../$types';

	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LayoutDashboard, LogOut, SquarePen } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let { children, data }: LayoutProps = $props();

	let user = $derived(data.user);
</script>

<div class="flex min-h-screen flex-col items-center">
	<!-- Header -->
	<header class="sticky top-0 z-20 w-full border-b border-border bg-background/80 backdrop-blur">
		<div class="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-6">
			<!-- Brand -->
			<a
				href="/dashboard"
				class="font-anton text-xl tracking-normal text-foreground transition-colors hover:opacity-70"
			>
				The Blog
			</a>

			<!-- Right actions -->
			<div class="flex items-center gap-1">
				<!-- New post -->
				<Button
					variant="ghost"
					size="icon"
					href="/dashboard/posts/new"
					class="cursor-pointer rounded-full"
					aria-label="Write new post"
					title="Write new post"
				>
					<SquarePen class="size-[1.1rem]" strokeWidth={1.5} />
				</Button>

				<!-- Avatar dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								aria-label="Menu"
								class="group cursor-pointer rounded-full px-0!"
							>
								<Avatar
									username={user!.username}
									className="size-8 group-hover:border-transparent"
								/>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>

					<DropdownMenu.Content class="w-44 rounded-sm p-2" align="end">
						<DropdownMenu.Label class="text-xs">{user!.username}</DropdownMenu.Label>
						<DropdownMenu.Separator class="mb-1" />

						<DropdownMenu.Group class="space-y-0.5">
							<DropdownMenu.Item class="cursor-pointer" onclick={() => goto('/')}>
								<LayoutDashboard class="size-4" /> Public site
							</DropdownMenu.Item>

							<form action="/auth/logout" method="post" use:enhance>
								<DropdownMenu.Item class="w-full cursor-pointer">
									{#snippet child({ props })}
										<button type="submit" {...props}>
											<LogOut class="size-4" /> Logout
										</button>
									{/snippet}
								</DropdownMenu.Item>
							</form>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</header>

	<LoadingSpinner />

	<main class="mx-auto w-full max-w-4xl flex-1">
		{@render children()}
	</main>
</div>
