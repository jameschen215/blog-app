<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import {
		Search,
		SquarePen,
		X,
		Menu,
		LogIn,
		LogOut,
		UserPlus,
		LayoutDashboard
	} from '@lucide/svelte';

	import Avatar from '$lib/components/Avatar.svelte';
	import type { AuthResultUser } from '$lib/types/data';
	import { fade, slide } from 'svelte/transition';

	interface Props {
		user: AuthResultUser | null;
	}

	let { user }: Props = $props();
	let authenticated = $derived(!!user);

	// let redirect = $derived(page.url.pathname + page.url.hash);
	let redirect = $derived(page.url.pathname + page.url.hash + page.url.search);

	// Search state
	let searchOpen = $state(false);
	let searchInput = $state<HTMLInputElement | null>(null);
	let searchValue = $derived(page.url.searchParams.get('search') ?? '');

	async function openSearch() {
		searchOpen = true;
		await tick();
		searchInput?.focus();
	}

	function closeSearch() {
		searchOpen = false;
		searchValue = '';

		syncUrl('');
	}

	function syncUrl(value: string) {
		const url = new URL(page.url);

		if (value.trim()) {
			url.searchParams.set('search', value.trim());
			url.searchParams.delete('page');
		} else {
			url.searchParams.delete('search');
		}

		goto(url, { replaceState: true, keepFocus: true, noScroll: true });
	}

	let debounceTimer: ReturnType<typeof setTimeout>;

	function handleSearchInput() {
		console.log({ searchValue });

		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => syncUrl(searchValue), 300);
	}

	function handleSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeSearch();
		}
	}

	// Close search input when clicking out of header
	let headerEl = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!searchOpen) return;

		function handleClick(e: MouseEvent) {
			if (headerEl && !headerEl.contains(e.target as Node)) {
				closeSearch();
			}
		}

		document.addEventListener('mousedown', handleClick);

		return () => document.removeEventListener('mousedown', handleClick);
	});
</script>

<header
	bind:this={headerEl}
	class="sticky top-0 z-20 w-full border-b border-border bg-background/80 backdrop-blur"
>
	<div class="relative mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-6">
		<!-- Brand -->
		{#if !searchOpen}
			<div
				class="flex w-full items-center justify-between transition-opacity duration-200"
				class:opacity-0={searchOpen}
				class:pointer-events-none={searchOpen}
			>
				<a href="/" class="font-anton text-xl tracking-normal">The Blog</a>
			</div>
		{/if}

		<!-- Search overlay -->
		{#if searchOpen}
			<div
				transition:fade={{ duration: 150 }}
				class="absolute inset-x-6 flex items-center gap-2 bg-background"
			>
				<Search size={15} class="shrink-0 text-muted-foreground" />
				<input
					type="text"
					bind:this={searchInput}
					bind:value={searchValue}
					placeholder="Search posts..."
					oninput={handleSearchInput}
					onkeydown={handleSearchKeydown}
					class="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
				/>
				<button
					type="button"
					aria-label="Close search"
					onclick={closeSearch}
					class="shrink-0 cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
				>
					<X size={15} />
				</button>
			</div>
		{/if}

		<!-- Right actions -->
		{#if !searchOpen}
			<div transition:fade={{ duration: 150 }} class="flex items-center gap-1">
				<!-- Search toggle -->
				<Button
					variant="ghost"
					size="icon"
					aria-label="Search posts"
					onclick={openSearch}
					class="cursor-pointer rounded-full"
				>
					<Search class="size-[1.1rem]" />
				</Button>

				<!-- Write - only shown when authenticated -->
				{#if authenticated}
					<Button
						variant="ghost"
						size="icon"
						aria-label="Write a post"
						href="/dashboard/posts/new"
						class="cursor-pointer rounded-full"
					>
						<SquarePen class="size-[1.1rem]" />
					</Button>
				{/if}

				<!-- Avatar / menu dropdown -->
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
								{#if authenticated}
									<Avatar
										username={user!.username}
										className="w-full h-full group-hover:border-transparent"
									/>
								{:else}
									<Menu class="size-[1.1rem]" />
								{/if}
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>

					<DropdownMenu.Content class="w-40 rounded-sm p-2" align="end">
						{#if authenticated}
							<DropdownMenu.Label class="text-xs">{user!.username}</DropdownMenu.Label>
							<DropdownMenu.Separator class="mb-1" />
						{/if}

						<DropdownMenu.Group class="space-y-0.5">
							{#if authenticated}
								<DropdownMenu.Item class="cursor-pointer" onclick={() => goto('/dashboard')}>
									<LayoutDashboard class="size-4" /> Dashboard
								</DropdownMenu.Item>

								<form action="/auth/logout" method="post" use:enhance>
									<DropdownMenu.Item class="w-full cursor-pointer">
										{#snippet child({ props })}
											<button {...props} type="submit">
												<LogOut class="size-[1.1rem]" /> Logout
											</button>
										{/snippet}
									</DropdownMenu.Item>
								</form>
							{:else}
								<DropdownMenu.Item
									class="cursor-pointer"
									onclick={() => goto(`/auth/login?redirect=${encodeURIComponent(redirect)}`)}
								>
									<LogIn class="size-4" /> Login
								</DropdownMenu.Item>

								<DropdownMenu.Item
									class="cursor-pointer"
									onclick={() => goto(`/auth/register?redirect=${encodeURIComponent(redirect)}`)}
								>
									<UserPlus class="size-4" /> Register
								</DropdownMenu.Item>
							{/if}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/if}
	</div>
</header>
