<script lang="ts">
	import { page } from '$app/state';
	import { enhance, applyAction } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils/shadcn.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import AuthFormField from '../_components/AuthFormField.svelte';
	import { createAuthForm } from '../_components/authForm.svelte';

	let { form } = $props();

	let registerUrl = $derived.by(() => {
		const redirect = page.url.searchParams.get('redirect');
		return redirect ? `/auth/register?redirect=${encodeURIComponent(redirect)}` : '/auth/register';
	});

	const auth = createAuthForm(() => form);

	const handleSubmit: SubmitFunction = () => {
		auth.submitting = true;

		return async ({ result }) => {
			auth.submitting = false;

			if (result.type === 'redirect') {
				toast.message('You are logged in successfully!');
				goto(result.location, { invalidateAll: true });
			} else {
				await applyAction(result);
				if (result.type === 'failure') auth.focusFirstError(result.data);
			}
		};
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to the blog" />
</svelte:head>

<div class="mt-10 flex w-full max-w-md flex-1 sm:mt-20">
	<form class="w-full px-4 sm:px-8" method="post" novalidate use:enhance={handleSubmit}>
		<h1 class="mb-12 scroll-m-20 font-ibm text-3xl font-extrabold tracking-tight lg:text-4xl">
			Login
		</h1>

		<Field.Set>
			<Field.Group class="gap-5">
				<AuthFormField
					name="username"
					label="username"
					value={form?.data?.username ?? ''}
					errors={auth.localErrors?.username}
					onClearError={() => auth.clearError('username')}
					autofocus
				/>

				<AuthFormField
					name="password"
					label="password"
					type="password"
					value={form?.data?.password ?? ''}
					errors={auth.localErrors?.password}
					onClearError={() => auth.clearError('password')}
				/>

				<Field.Field class="gap-2">
					<Button type="submit" class="cursor-pointer" disabled={auth.submitting}>
						{auth.submitting ? 'Logging in...' : 'Login'}
					</Button>

					{#if auth.localFormError}
						<Field.FieldError id="form-message">{auth.localFormError}</Field.FieldError>
					{/if}
				</Field.Field>
			</Field.Group>
		</Field.Set>

		<p class="text-sm leading-7 not-first:mt-6">
			<span>Don't have an account yet?</span>
			<a
				href={registerUrl}
				class={cn(
					'font-medium italic underline transition-all hover:underline-offset-2',
					auth.submitting && 'pointer-events-none cursor-not-allowed opacity-50'
				)}
				aria-disabled={auth.submitting}
			>
				Register
			</a>
			here.
		</p>
	</form>
</div>
