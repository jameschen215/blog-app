<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { cn } from '$lib/utils/shadcn';
	import * as Field from '$lib/components/ui/field/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import AuthFormField from '../_components/AuthFormField.svelte';
	import { createAuthForm } from '../_components/authForm.svelte';

	let { form }: PageProps = $props();

	let loginUrl = $derived.by(() => {
		const redirect = page.url.searchParams.get('redirect');
		return redirect ? `/auth/login?redirect=${encodeURIComponent(redirect)}` : '/auth/login';
	});

	const auth = createAuthForm(() => form);

	const handleSubmit: SubmitFunction = () => {
		auth.submitting = true;

		return async ({ result }) => {
			auth.submitting = false;
			await applyAction(result);
			if (result.type === 'failure') auth.focusFirstError(result.data);
		};
	};
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register to the blog" />
</svelte:head>

<div class="mt-10 flex w-full max-w-md flex-1 sm:mt-20">
	<form class="w-full px-4 sm:px-8" method="post" novalidate use:enhance={handleSubmit}>
		<h1 class="mb-12 scroll-m-20 font-ibm text-3xl font-extrabold tracking-tight lg:text-4xl">
			Register
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
					name="email"
					label="email"
					type="email"
					value={form?.data?.email ?? ''}
					errors={auth.localErrors?.email}
					onClearError={() => auth.clearError('email')}
				/>

				<AuthFormField
					name="password"
					label="password"
					type="password"
					value={form?.data?.password ?? ''}
					errors={auth.localErrors?.password}
					onClearError={() => auth.clearError('password')}
				/>

				<AuthFormField
					name="confirmPassword"
					label="confirmPassword"
					type="password"
					value={form?.data?.confirmPassword ?? ''}
					errors={auth.localErrors?.confirmPassword}
					onClearError={() => auth.clearError('confirmPassword')}
				/>

				<Field.Field class="gap-2">
					<Button type="submit" class="cursor-pointer" disabled={auth.submitting}>
						{auth.submitting ? 'Registering...' : 'Register'}
					</Button>

					{#if auth.localFormError}
						<Field.FieldError id="form-message">{auth.localFormError}</Field.FieldError>
					{/if}
				</Field.Field>
			</Field.Group>
		</Field.Set>

		<p class="text-sm leading-7 not-first:mt-6">
			<span>Have an account already?</span>
			<a
				href={loginUrl}
				class={cn(
					'font-medium italic underline transition-all hover:underline-offset-2',
					auth.submitting && 'pointer-events-none cursor-not-allowed opacity-50'
				)}
				aria-disabled={auth.submitting}
			>
				Login
			</a>
			here.
		</p>
	</form>
</div>
