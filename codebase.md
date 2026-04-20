# .gitignore

```
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

```

# .npmrc

```
engine-strict=true

```

# .prettierignore

```
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lock
bun.lockb

# Miscellaneous
/static/

```

# .prettierrc

```
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	"overrides": [
		{
			"files": "*.svelte",
			"options": {
				"parser": "svelte"
			}
		}
	],
	"tailwindStylesheet": "./src/routes/layout.css"
}

```

# .vscode/extensions.json

```json
{
	"recommendations": [
		"svelte.svelte-vscode",
		"esbenp.prettier-vscode",
		"dbaeumer.vscode-eslint",
		"bradlc.vscode-tailwindcss"
	]
}

```

# .vscode/settings.json

```json
{
	"files.associations": {
		"*.css": "tailwindcss"
	},
	"git.ignoreLimitWarning": true
}

```

# components.json

```json
{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"tailwind": {
		"css": "src/routes/layout.css",
		"baseColor": "zinc"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils/shadcn",
		"ui": "$lib/components/ui",
		"hooks": "$lib/hooks",
		"lib": "$lib"
	},
	"typescript": true,
	"registry": "https://shadcn-svelte.com/registry"
}

```

# eslint.config.js

```js
import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
			'svelte/no-navigation-without-resolve': [
				'error',
				{ ignoreLinks: true, ignoreGoto: true, url: ignore }
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		// Override or add rule settings here, such as:
		// 'svelte/button-has-type': 'error'
		rules: {}
	}
);

```

# package.json

```json
{
	"name": "blog-app",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --check . && eslint .",
		"format": "prettier --write ."
	},
	"devDependencies": {
		"@eslint/compat": "^2.0.4",
		"@eslint/js": "^10.0.1",
		"@fontsource-variable/inter": "^5.2.8",
		"@internationalized/date": "^3.12.1",
		"@lucide/svelte": "^1.8.0",
		"@sveltejs/adapter-auto": "^7.0.1",
		"@sveltejs/kit": "^2.57.0",
		"@sveltejs/vite-plugin-svelte": "^7.0.0",
		"@tailwindcss/typography": "^0.5.19",
		"@tailwindcss/vite": "^4.2.2",
		"@tiptap/core": "^3.x",
		"@tiptap/extension-placeholder": "^3.x",
		"@tiptap/pm": "^3.x",
		"@tiptap/starter-kit": "^3.x",
		"@types/jsonwebtoken": "^9.0.10",
		"@types/node": "^22",
		"bits-ui": "^2.18.0",
		"clsx": "^2.1.1",
		"date-fns": "^4.1.0",
		"eslint": "^10.2.0",
		"eslint-config-prettier": "^10.1.8",
		"eslint-plugin-svelte": "^3.17.0",
		"globals": "^17.4.0",
		"isomorphic-dompurify": "^3.x",
		"jsonwebtoken": "^9.0.3",
		"mode-watcher": "^1.1.0",
		"prettier": "^3.8.1",
		"prettier-plugin-svelte": "^3.5.1",
		"prettier-plugin-tailwindcss": "^0.7.2",
		"shadcn-svelte": "^1.2.7",
		"svelte": "^5.55.2",
		"svelte-check": "^4.4.6",
		"svelte-sonner": "^1.1.0",
		"tailwind-merge": "^3.5.0",
		"tailwind-variants": "^3.2.2",
		"tailwindcss": "^4.2.2",
		"tw-animate-css": "^1.4.0",
		"typescript": "^6.0.2",
		"typescript-eslint": "^8.58.1",
		"vite": "^8.0.7",
		"zod": "^4.x"
	}
}

```

# README.md

```md
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`sh
# create a new project
npx sv create my-app
\`\`\`

To recreate this project with the same configuration:

\`\`\`sh
# recreate this project
npx sv@0.15.1 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography" --install npm blog-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`sh
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

```

# src/app.d.ts

```ts
// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthResultUser } from '$lib/types/data';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthResultUser | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

```

# src/app.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="text-scale" content="scale" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>

```

# src/hooks.server.ts

```ts
import jwt from 'jsonwebtoken';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import type { AuthResultUser, Role } from '$lib/types/data';
import { SECRET_KEY } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('jwt');

	if (token) {
		try {
			const payload = jwt.verify(token, SECRET_KEY) as AuthResultUser & { role: Role };

			event.locals.user = {
				id: payload.id,
				username: payload.username,
				email: payload.email,
				role: payload.role
			};
		} catch {
			event.locals.user = null;
		}
	}

	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.includes('/api/')) {
		request.headers.set('cookie', event.request.headers.get('cookie') ?? '');
	}
	return fetch(request);
};

```

# src/lib/api/auth.ts

```ts
import { apiPost } from '$lib/api/client';
import type { LoginInput, RegisterInput } from '$lib/schema/auth';
import type { AuthResult } from '$lib/types/data';

export function login(credentials: LoginInput, customFetch = fetch): Promise<AuthResult> {
	return apiPost<AuthResult>('/api/auth/login', credentials, customFetch);
}

export function register(credentials: RegisterInput, customFetch = fetch): Promise<AuthResult> {
	return apiPost<AuthResult>('/api/auth/register', credentials, customFetch);
}

export function logout(customFetch = fetch) {
	return apiPost('/api/auth/logout', undefined, customFetch);
}

```

# src/lib/api/client.ts

```ts
// custom api error class

import { CONSTANTS } from '$lib/constants';

const TIMEOUT = CONSTANTS.API.TIMEOUT;
const BASE_URL = CONSTANTS.API.BASE_URL;

export class APIError extends Error {
	status?: number;
	response?: Response;
	fieldErrors?: Record<string, string[]>;

	constructor(
		message: string,
		status?: number,
		response?: Response,
		fieldErrors?: Record<string, string[]>
	) {
		super(message);

		this.name = 'APIError';
		this.status = status;
		this.response = response;
		this.fieldErrors = fieldErrors;
	}
}

async function apiFetch<T>(
	endpoint: string,
	customFetch = fetch,
	options: RequestInit = {}
): Promise<T> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

	try {
		const res = await customFetch(BASE_URL + endpoint, {
			...options,
			credentials: 'include',
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			}
		});

		clearTimeout(timeoutId);

		if (!res.ok) {
			let message = `API request failed: ${res.status} ${res.statusText}`;
			let fieldErrors: Record<string, string[]> | undefined;

			try {
				const data = await res.json();
				message = data.message ?? message;

				if (Array.isArray(data.errors)) {
					fieldErrors = data.errors.reduce(
						(acc: Record<string, string[]>, err: { field: string; message: string }) => {
							if (!acc[err.field]) {
								acc[err.field] = [];
							}
							acc[err.field].push(err.message);

							return acc;
						},
						{}
					);
				}
			} catch {
				// non-JSON error body
			}

			throw new APIError(message, res.status, res, fieldErrors);
		}

		// Need a 204 guard here before calling res.json() in case you get a failure response when deleting things
		if (res.status === 204) return null as T;

		return await res.json();
	} catch (error) {
		clearTimeout(timeoutId);

		if (error instanceof DOMException && error.name === 'AbortError') {
			throw new APIError('Request timeout', 408);
		}

		if (error instanceof APIError) throw error;

		throw new APIError(error instanceof Error ? error.message : 'Unknown error');
	}
}

export function apiGet<T>(endpoint: string, customFetch = fetch, options?: RequestInit) {
	return apiFetch<T>(endpoint, customFetch, {
		method: 'GET',
		...options
	});
}

export function apiPost<T>(
	endpoint: string,
	data?: unknown,
	customFetch = fetch,
	options?: RequestInit
) {
	return apiFetch<T>(endpoint, customFetch, {
		method: 'POST',
		body: data ? JSON.stringify(data) : undefined,
		...options
	});
}

export function apiPut<T>(
	endpoint: string,
	data: unknown,
	customFetch = fetch,
	options?: RequestInit
) {
	return apiFetch<T>(endpoint, customFetch, {
		method: 'PUT',
		body: JSON.stringify(data),
		...options
	});
}

export function apiDelete<T>(endpoint: string, customFetch = fetch, options?: RequestInit) {
	return apiFetch<T>(endpoint, customFetch, {
		method: 'DELETE',
		...options
	});
}

```

# src/lib/api/post.ts

```ts
import { apiDelete, apiGet, apiPost, apiPut } from '$lib/api/client';
import type { PostDetailResult, PostsResult, PostWithAuthor } from '$lib/types/data';

interface PaginationParams {
	page?: number;
	limit?: number;
	search?: string;
}

export async function getPosts(
	params: PaginationParams,
	customFetch = fetch
): Promise<PostsResult> {
	const queryParams = new URLSearchParams();

	if (params.page) {
		queryParams.append('page', params.page.toString());
	}

	if (params.limit) {
		queryParams.append('limit', params.limit.toString());
	}

	if (params.search) {
		queryParams.append('limit', params.search);
	}

	const query = queryParams.toString();
	const endpoint = query ? `/api/posts?${query}` : '/api/posts';

	return apiGet<PostsResult>(endpoint, customFetch);
}

export async function getPost(id: number, customFetch = fetch): Promise<PostDetailResult> {
	return apiGet<PostDetailResult>(`/api/posts/${id}`, customFetch);
}

export async function getPostsByAuthor(
	params: PaginationParams,
	authorId: number,
	customFetch = fetch
): Promise<PostsResult> {
	const queryParams = new URLSearchParams();

	if (params.page) {
		queryParams.append('page', params.page.toString());
	}

	if (params.limit) {
		queryParams.append('limit', params.limit.toString());
	}

	const query = queryParams.toString();
	const endpoint = query
		? `/api/posts/authors/${authorId}?${query}`
		: `/api/posts/authors/${authorId}`;

	return apiGet<PostsResult>(endpoint, customFetch);
}

export async function togglePostPublish(id: number, customFetch = fetch): Promise<PostWithAuthor> {
	return apiPost(`/api/posts/${id}/publish`, undefined, customFetch);
}

export async function deletePost(id: number, customFetch = fetch) {
	return apiDelete(`/api/posts/${id}`, customFetch);
}

export function createPost(
	data: { title: string; content: string; published?: boolean },
	customFetch = fetch
) {
	return apiPost<{ post: PostWithAuthor }>('/api/posts', data, customFetch);
}

export function updatePost(
	id: number,
	data: { title?: string; content?: string; published?: boolean },
	customFetch = fetch
) {
	return apiPut<{ post: PostWithAuthor }>(`/api/posts/${id}`, data, customFetch);
}

export async function likePost(id: number, customFetch = fetch) {
	return apiPost(`/api/posts/${id}/like`, undefined, customFetch);
}

export function createComment(postId: number, content: string, customFetch = fetch) {
	return apiPost(`/api/posts/${postId}/comments`, { content }, customFetch);
}

export async function updateComment(
	postId: number,
	commentId: number,
	content: string,
	customFetch = fetch
) {
	return apiPut(`/api/posts/${postId}/comments/${commentId}`, { content }, customFetch);
}

export function deleteComment(postId: number, commentId: number, customFetch = fetch) {
	return apiDelete(`/api/posts/${postId}/comments/${commentId}`, customFetch);
}

```

# src/lib/components/AuthFormField.svelte

```svelte
<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Field from '$lib/components/ui/field/index.js';

	interface Props {
		name: string;
		label: string;
		type?: 'text' | 'password' | 'email';
		value?: string | File;
		errors?: string[];
		autofocus?: boolean;
		onClearError: () => void;
	}

	let {
		name,
		label,
		type = 'text',
		value = '',
		errors,
		autofocus = false,
		onClearError
	}: Props = $props();

	const stringValue = $derived(typeof value === 'string' ? value : '');
</script>

<Field.Field class="gap-2">
	<Field.Label for={name} class="capitalize">{label}</Field.Label>
	<Input
		{type}
		id={name}
		{name}
		value={stringValue}
		oninput={onClearError}
		{autofocus}
		class="rounded-sm"
	/>

	{#if errors && errors.length > 0}
		<Field.FieldError id="{name}-error">{errors[0]}</Field.FieldError>
	{/if}
</Field.Field>

```

# src/lib/components/Avatar.svelte

```svelte
<script lang="ts">
	import { cn } from '$lib/utils/shadcn';

	let { username, className = '' } = $props();
</script>

<div
	class={cn(
		'flex items-center justify-center rounded-full border border-zinc-100 text-lg font-semibold dark:border-zinc-900',
		className
	)}
>
	<span>
		{username[0].toUpperCase()}
	</span>
	<span class="sr-only">User avatar - {username[0]}</span>
</div>

```

# src/lib/components/LoadingSpinner.svelte

```svelte
<script lang="ts">
	import { navigating } from '$app/state';
	import { LoaderCircle } from '@lucide/svelte';

	import { fade } from 'svelte/transition';
</script>

{#if navigating.to}
	<div
		class="bg-background/80 fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col items-center justify-center gap-2 backdrop-blur-sm"
		transition:fade={{ duration: 150 }}
	>
		<LoaderCircle strokeWidth={1.25} class="text-primary h-8 w-8 animate-spin" />
		Loading...
	</div>
{/if}

```

# src/lib/components/Pagination.svelte

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import type { PaginationMeta } from '$lib/types/data';

	type PostsPaginationProps = {
		pagination: PaginationMeta;
	};

	let { pagination }: PostsPaginationProps = $props();

	const handlePageChange = (nextPage: number) => {
		const url = new URL(page.url);
		url.searchParams.set('page', String(nextPage));
		goto(url);
	};
</script>

<Pagination.Root
	count={pagination.total}
	perPage={pagination.limit}
	page={pagination.page}
	onPageChange={handlePageChange}
>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>

			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}

			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>

```

# src/lib/components/Tiptap.svelte

```svelte
<!-- $lib/components/Tiptap.svelte -->

<script lang="ts">
	import { Editor } from '@tiptap/core';
	import { onMount, onDestroy } from 'svelte';
	import { StarterKit } from '@tiptap/starter-kit';
	import { Placeholder } from '@tiptap/extension-placeholder';
	import { Bold, CodeXml, Italic, List, ListOrdered, Quote, Save } from '@lucide/svelte';

	interface Props {
		content: string;
		lastSaved?: string | null;
		disableSave: boolean;
		onUpdate?: (html: string) => void;
		saveDraft?: () => void;
	}

	let { content, lastSaved = null, disableSave, onUpdate, saveDraft }: Props = $props();

	let element = $state<HTMLDivElement>();
	let editor = $state<Editor | null>(null);
	let activeFormats = $state({
		bold: false,
		italic: false,
		codeBlock: false,
		bulletList: false,
		orderedList: false,
		blockquote: false
	});

	function syncActiveFormats(currentEditor: Editor | null) {
		if (!currentEditor) return;

		queueMicrotask(() => {
			activeFormats = {
				bold: currentEditor.isActive('bold'),
				italic: currentEditor.isActive('italic'),
				codeBlock: currentEditor.isActive('codeBlock'),
				bulletList: currentEditor.isActive('bulletList'),
				orderedList: currentEditor.isActive('orderedList'),
				blockquote: currentEditor.isActive('blockquote')
			};
		});
	}

	onMount(() => {
		editor = new Editor({
			element: element!,
			extensions: [StarterKit, Placeholder.configure({ placeholder: 'New blog content here...' })],
			content,
			autofocus: true,
			editorProps: {
				attributes: {
					class:
						'tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none w-full px-3 focus:outline-none'
				}
			},
			onTransaction: ({ editor }) => {
				syncActiveFormats(editor);
			},
			onUpdate: ({ editor }) => {
				onUpdate?.(editor.getHTML());
			}
		});

		syncActiveFormats(editor);
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<!-- Toolbar -->
{#if editor}
	<div class="border-border flex flex-wrap gap-1 border-b px-3 py-2">
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleBold().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm"
			class:bg-accent={activeFormats.bold}
		>
			<Bold size={16} />
		</button>
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleItalic().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm italic"
			class:bg-accent={activeFormats.italic}
		>
			<Italic size={16} />
		</button>

		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
			class="font-roboto hover:bg-accent hidden cursor-pointer rounded-sm px-2 py-1 text-sm sm:block"
			class:bg-accent={activeFormats.codeBlock}
		>
			<CodeXml size={18} />
		</button>

		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleBulletList().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm"
			class:bg-accent={activeFormats.bulletList}
		>
			<List strokeWidth={1.5} size={20} />
		</button>
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleOrderedList().run()}
			class="font-roboto hover:bg-accent cursor-pointer rounded-sm px-2 py-1 text-sm"
			class:bg-accent={activeFormats.orderedList}
		>
			<ListOrdered strokeWidth={1.5} size={20} />
		</button>
		<button
			type="button"
			onclick={() => editor?.chain().focus().toggleBlockquote().run()}
			class="font-roboto hover:bg-accent hidden cursor-pointer rounded-sm px-2 py-1 text-sm sm:block"
			class:bg-accent={activeFormats.blockquote}
		>
			<Quote strokeWidth={1.5} size={18} />
		</button>

		<div class="ml-auto flex items-center gap-1">
			{#if lastSaved}
				<span class="text-muted-foreground/60 flex items-center text-xs">Saved</span>
			{/if}
			<button
				type="button"
				onclick={saveDraft}
				disabled={disableSave}
				class="font-roboto not-disabled:hover:bg-accent disabled:text-muted-foreground cursor-pointer rounded-sm px-2 py-1 text-sm disabled:cursor-default"
			>
				<Save strokeWidth={1.5} size={20} />
			</button>
		</div>
	</div>
{/if}

<!-- Editor area -->
<div
	class="min-h-120 w-full cursor-text py-2"
	bind:this={element}
	role="textbox"
	tabindex="0"
	onclick={() => editor?.commands.focus()}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			editor?.commands.focus();
		}
	}}
></div>

<style>
	:global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		color: var(--muted-foreground);
		font-weight: 300;
		float: left;
		pointer-events: none;
		height: 0;
	}

	:global(.tiptap) {
		font-size: 16px;
		font-family: 'Roboto', sans-serif;
		line-height: 1.75;
	}
</style>

```

# src/lib/components/ui/button/button.svelte

```svelte
<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/80',
				outline:
					'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
				ghost:
					'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
				destructive:
					'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default:
					'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
				lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				icon: 'size-9',
				'icon-xs':
					"size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
				'icon-sm':
					'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

```

# src/lib/components/ui/button/index.ts

```ts
import Root, {
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
} from "./button.svelte";

export {
	Root,
	type ButtonProps as Props,
	//
	Root as Button,
	buttonVariants,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
};

```

# src/lib/components/ui/card/card-action.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-action"
	class={cn(
		"cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/card/card-content.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-content"
	class={cn("px-4 group-data-[size=sm]/card:px-3", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/card/card-description.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	data-slot="card-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</p>

```

# src/lib/components/ui/card/card-footer.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-footer"
	class={cn("bg-muted/50 rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex items-center", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/card/card-header.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-header"
	class={cn(
		"gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/card/card-title.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-title"
	class={cn("text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/card/card.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { size?: "default" | "sm" } = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn("ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/card/index.ts

```ts
import Root from "./card.svelte";
import Content from "./card-content.svelte";
import Description from "./card-description.svelte";
import Footer from "./card-footer.svelte";
import Header from "./card-header.svelte";
import Title from "./card-title.svelte";
import Action from "./card-action.svelte";

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	Action,
	//
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
	Action as CardAction,
};

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-checkbox-group.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		value = $bindable([]),
		...restProps
	}: DropdownMenuPrimitive.CheckboxGroupProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxGroup
	bind:ref
	bind:value
	data-slot="dropdown-menu-checkbox-group"
	{...restProps}
/>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-checkbox-item.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import MinusIcon from '@lucide/svelte/icons/minus';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils/shadcn.js';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		children: childrenProp,
		...restProps
	}: WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
		children?: Snippet;
	} = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:ref
	bind:checked
	bind:indeterminate
	data-slot="dropdown-menu-checkbox-item"
	class={cn(
		"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-inset:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<span
			class="pointer-events-none absolute right-2 flex items-center justify-center"
			data-slot="dropdown-menu-checkbox-item-indicator"
		>
			{#if indeterminate}
				<MinusIcon />
			{:else if checked}
				<CheckIcon />
			{/if}
		</span>
		{@render childrenProp?.()}
	{/snippet}
</DropdownMenuPrimitive.CheckboxItem>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-content.svelte

```svelte
<script lang="ts">
	import { cn, type WithoutChildrenOrChild } from '$lib/utils/shadcn.js';
	import DropdownMenuPortal from './dropdown-menu-portal.svelte';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		sideOffset = 4,
		align = 'start',
		portalProps,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DropdownMenuPortal>>;
	} = $props();
</script>

<DropdownMenuPortal {...portalProps}>
	<DropdownMenuPrimitive.Content
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		{align}
		class={cn(
			'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 w-(--bits-dropdown-menu-anchor-width) min-w-32 overflow-x-hidden overflow-y-auto rounded-md p-1 shadow-md ring-1 duration-100 outline-none data-closed:overflow-hidden',
			className
		)}
		{...restProps}
	/>
</DropdownMenuPortal>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-group-heading.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: ComponentProps<typeof DropdownMenuPrimitive.GroupHeading> & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
	bind:ref
	data-slot="dropdown-menu-group-heading"
	data-inset={inset}
	class={cn('px-2 py-1.5 text-sm font-semibold data-[inset]:ps-8', className)}
	{...restProps}
/>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-group.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: DropdownMenuPrimitive.GroupProps = $props();
</script>

<DropdownMenuPrimitive.Group bind:ref data-slot="dropdown-menu-group" {...restProps} />

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-item.svelte

```svelte
<script lang="ts">
	import { cn } from '$lib/utils/shadcn.js';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		variant = 'default',
		...restProps
	}: DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
		variant?: 'default' | 'destructive';
	} = $props();
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	data-slot="dropdown-menu-item"
	data-inset={inset}
	data-variant={variant}
	class={cn(
		"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
/>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-label.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		inset?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="dropdown-menu-label"
	data-inset={inset}
	class={cn(
		'text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:pl-8 data-[inset]:pl-8',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-portal.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { ...restProps }: DropdownMenuPrimitive.PortalProps = $props();
</script>

<DropdownMenuPrimitive.Portal {...restProps} />

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-radio-group.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		value = $bindable(),
		...restProps
	}: DropdownMenuPrimitive.RadioGroupProps = $props();
</script>

<DropdownMenuPrimitive.RadioGroup
	bind:ref
	bind:value
	data-slot="dropdown-menu-radio-group"
	{...restProps}
/>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-radio-item.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { cn, type WithoutChild } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		children: childrenProp,
		...restProps
	}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	data-slot="dropdown-menu-radio-item"
	class={cn(
		"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-inset:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<span
			class="pointer-events-none absolute right-2 flex items-center justify-center"
			data-slot="dropdown-menu-radio-item-indicator"
		>
			{#if checked}
				<CheckIcon />
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SeparatorProps = $props();
</script>

<DropdownMenuPrimitive.Separator
	bind:ref
	data-slot="dropdown-menu-separator"
	class={cn('bg-border -mx-1 my-1 h-px', className)}
	{...restProps}
/>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-shortcut.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="dropdown-menu-shortcut"
	class={cn(
		'text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-sub-content.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
	bind:ref
	data-slot="dropdown-menu-sub-content"
	class={cn(
		'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground w-auto min-w-[96px] rounded-md p-1 shadow-lg ring-1 duration-100',
		className
	)}
	{...restProps}
/>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-sub-trigger.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { cn } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
	bind:ref
	data-slot="dropdown-menu-sub-trigger"
	data-inset={inset}
	class={cn(
		"focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-inset:pl-8 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronRightIcon class="ml-auto" />
</DropdownMenuPrimitive.SubTrigger>

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-sub.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: DropdownMenuPrimitive.SubProps = $props();
</script>

<DropdownMenuPrimitive.Sub bind:open {...restProps} />

```

# src/lib/components/ui/dropdown-menu/dropdown-menu-trigger.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: DropdownMenuPrimitive.TriggerProps = $props();
</script>

<DropdownMenuPrimitive.Trigger bind:ref data-slot="dropdown-menu-trigger" {...restProps} />

```

# src/lib/components/ui/dropdown-menu/dropdown-menu.svelte

```svelte
<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: DropdownMenuPrimitive.RootProps = $props();
</script>

<DropdownMenuPrimitive.Root bind:open {...restProps} />

```

# src/lib/components/ui/dropdown-menu/index.ts

```ts
import Root from "./dropdown-menu.svelte";
import Sub from "./dropdown-menu-sub.svelte";
import CheckboxGroup from "./dropdown-menu-checkbox-group.svelte";
import CheckboxItem from "./dropdown-menu-checkbox-item.svelte";
import Content from "./dropdown-menu-content.svelte";
import Group from "./dropdown-menu-group.svelte";
import Item from "./dropdown-menu-item.svelte";
import Label from "./dropdown-menu-label.svelte";
import RadioGroup from "./dropdown-menu-radio-group.svelte";
import RadioItem from "./dropdown-menu-radio-item.svelte";
import Separator from "./dropdown-menu-separator.svelte";
import Shortcut from "./dropdown-menu-shortcut.svelte";
import Trigger from "./dropdown-menu-trigger.svelte";
import SubContent from "./dropdown-menu-sub-content.svelte";
import SubTrigger from "./dropdown-menu-sub-trigger.svelte";
import GroupHeading from "./dropdown-menu-group-heading.svelte";
import Portal from "./dropdown-menu-portal.svelte";

export {
	CheckboxGroup,
	CheckboxItem,
	Content,
	Portal,
	Root as DropdownMenu,
	CheckboxGroup as DropdownMenuCheckboxGroup,
	CheckboxItem as DropdownMenuCheckboxItem,
	Content as DropdownMenuContent,
	Portal as DropdownMenuPortal,
	Group as DropdownMenuGroup,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	RadioGroup as DropdownMenuRadioGroup,
	RadioItem as DropdownMenuRadioItem,
	Separator as DropdownMenuSeparator,
	Shortcut as DropdownMenuShortcut,
	Sub as DropdownMenuSub,
	SubContent as DropdownMenuSubContent,
	SubTrigger as DropdownMenuSubTrigger,
	Trigger as DropdownMenuTrigger,
	GroupHeading as DropdownMenuGroupHeading,
	Group,
	GroupHeading,
	Item,
	Label,
	RadioGroup,
	RadioItem,
	Root,
	Separator,
	Shortcut,
	Sub,
	SubContent,
	SubTrigger,
	Trigger,
};

```

# src/lib/components/ui/field/field-content.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="field-content"
	class={cn('group/field-content flex flex-1 flex-col gap-1 leading-snug', className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/field/field-description.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	data-slot="field-description"
	class={cn(
		'text-muted-foreground text-left text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
		'last:mt-0 nth-last-2:-mt-1',
		'[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</p>

```

# src/lib/components/ui/field/field-error.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		errors,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		children?: Snippet;
		errors?: { message?: string }[];
	} = $props();

	const hasContent = $derived.by(() => {
		// has slotted error
		if (children) return true;

		// no errors
		if (!errors || errors.length === 0) return false;

		// has an error but no message
		if (errors.length === 1 && !errors[0]?.message) {
			return false;
		}

		return true;
	});

	const isMultipleErrors = $derived(errors && errors.length > 1);
	const singleErrorMessage = $derived(errors && errors.length === 1 && errors[0]?.message);
</script>

{#if hasContent}
	<div
		bind:this={ref}
		role="alert"
		data-slot="field-error"
		class={cn('text-destructive text-sm font-normal', className)}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else if singleErrorMessage}
			{singleErrorMessage}
		{:else if isMultipleErrors}
			<ul class="ml-4 flex list-disc flex-col gap-1">
				{#each errors ?? [] as error, index (index)}
					{#if error?.message}
						<li>{error.message}</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
{/if}

```

# src/lib/components/ui/field/field-group.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="field-group"
	class={cn(
		'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/field/field-label.svelte

```svelte
<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '$lib/utils/shadcn.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Label> = $props();
</script>

<Label
	bind:ref
	data-slot="field-label"
	class={cn(
		'has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-3',
		'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Label>

```

# src/lib/components/ui/field/field-legend.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'legend',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLLegendElement>> & {
		variant?: 'legend' | 'label';
	} = $props();
</script>

<legend
	bind:this={ref}
	data-slot="field-legend"
	data-variant={variant}
	class={cn(
		'mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</legend>

```

# src/lib/components/ui/field/field-separator.svelte

```svelte
<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		children?: Snippet;
	} = $props();

	const hasContent = $derived(!!children);
</script>

<div
	bind:this={ref}
	data-slot="field-separator"
	data-content={hasContent}
	class={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)}
	{...restProps}
>
	<Separator class="absolute inset-0 top-1/2" />
	{#if children}
		<span
			class="text-muted-foreground bg-background relative mx-auto block w-fit px-2"
			data-slot="field-separator-content"
		>
			{@render children()}
		</span>
	{/if}
</div>

```

# src/lib/components/ui/field/field-set.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLFieldsetAttributes> = $props();
</script>

<fieldset
	bind:this={ref}
	data-slot="field-set"
	class={cn(
		'flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</fieldset>

```

# src/lib/components/ui/field/field-title.svelte

```svelte
<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="field-label"
	class={cn(
		'flex w-fit items-center gap-2 text-sm leading-snug leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/field/field.svelte

```svelte
<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const fieldVariants = tv({
		base: 'data-[invalid=true]:text-destructive gap-3 group/field flex w-full',
		variants: {
			orientation: {
				vertical: 'cn-field-orientation-vertical flex-col [&>*]:w-full [&>.sr-only]:w-auto',
				horizontal:
					'cn-field-orientation-horizontal flex-row items-center has-[>[data-slot=field-content]]:items-start [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
				responsive:
					'cn-field-orientation-responsive flex-col @md/field-group:flex-row @md/field-group:items-center @md/field-group:has-[>[data-slot=field-content]]:items-start [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
			}
		},
		defaultVariants: {
			orientation: 'vertical'
		}
	});

	export type FieldOrientation = VariantProps<typeof fieldVariants>['orientation'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'vertical',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: FieldOrientation;
	} = $props();
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="field"
	data-orientation={orientation}
	class={cn(fieldVariants({ orientation }), className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

# src/lib/components/ui/field/index.ts

```ts
import Field from "./field.svelte";
import Set from "./field-set.svelte";
import Legend from "./field-legend.svelte";
import Group from "./field-group.svelte";
import Content from "./field-content.svelte";
import Label from "./field-label.svelte";
import Title from "./field-title.svelte";
import Description from "./field-description.svelte";
import Separator from "./field-separator.svelte";
import Error from "./field-error.svelte";

export {
	Field,
	Set,
	Legend,
	Group,
	Content,
	Label,
	Title,
	Description,
	Separator,
	Error,
	//
	Set as FieldSet,
	Legend as FieldLegend,
	Group as FieldGroup,
	Content as FieldContent,
	Label as FieldLabel,
	Title as FieldTitle,
	Description as FieldDescription,
	Separator as FieldSeparator,
	Error as FieldError,
};

```

# src/lib/components/ui/input/index.ts

```ts
import Root from "./input.svelte";

export {
	Root,
	//
	Root as Input,
};

```

# src/lib/components/ui/input/input.svelte

```svelte
<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils/shadcn.js';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		'data-slot': dataSlot = 'input',
		...restProps
	}: Props = $props();
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 file:text-foreground placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 file:text-foreground placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}

```

# src/lib/components/ui/label/index.ts

```ts
import Root from "./label.svelte";

export {
	Root,
	//
	Root as Label,
};

```

# src/lib/components/ui/label/label.svelte

```svelte
<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
	bind:ref
	data-slot="label"
	class={cn(
		'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
		className
	)}
	{...restProps}
/>

```

# src/lib/components/ui/pagination/index.ts

```ts
import Root from "./pagination.svelte";
import Content from "./pagination-content.svelte";
import Item from "./pagination-item.svelte";
import Link from "./pagination-link.svelte";
import PrevButton from "./pagination-prev-button.svelte";
import NextButton from "./pagination-next-button.svelte";
import Ellipsis from "./pagination-ellipsis.svelte";
import Previous from "./pagination-previous.svelte";
import Next from "./pagination-next.svelte";

export {
	Root,
	Content,
	Item,
	Link,
	PrevButton, // old
	NextButton, // old
	Ellipsis,
	Previous,
	Next,
	//
	Root as Pagination,
	Content as PaginationContent,
	Item as PaginationItem,
	Link as PaginationLink,
	PrevButton as PaginationPrevButton, // old
	NextButton as PaginationNextButton, // old
	Ellipsis as PaginationEllipsis,
	Previous as PaginationPrevious,
	Next as PaginationNext,
};

```

# src/lib/components/ui/pagination/pagination-content.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLUListElement>> = $props();
</script>

<ul
	bind:this={ref}
	data-slot="pagination-content"
	class={cn("gap-0.5 flex items-center", className)}
	{...restProps}
>
	{@render children?.()}
</ul>

```

# src/lib/components/ui/pagination/pagination-ellipsis.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils/shadcn.js";
	import MoreHorizontalIcon from '@lucide/svelte/icons/more-horizontal';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	data-slot="pagination-ellipsis"
	class={cn("size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center", className)}
	{...restProps}
>
	<MoreHorizontalIcon  />
	<span class="sr-only">More pages</span>
</span>

```

# src/lib/components/ui/pagination/pagination-item.svelte

```svelte
<script lang="ts">
	import type { HTMLLiAttributes } from "svelte/elements";
	import type { WithElementRef } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<HTMLLiAttributes> = $props();
</script>

<li bind:this={ref} data-slot="pagination-item" {...restProps}>
	{@render children?.()}
</li>

```

# src/lib/components/ui/pagination/pagination-link.svelte

```svelte
<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { cn } from "$lib/utils/shadcn.js";
	import { buttonVariants, type ButtonSize } from "$lib/components/ui/button/index.js";
	let {
		ref = $bindable(null),
		class: className,
		size = "icon",
		isActive,
		page,
		children,
		...restProps
	}: PaginationPrimitive.PageProps & {
		size?: ButtonSize;
		isActive: boolean;
	} = $props();
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	bind:ref
	{page}
	aria-current={isActive ? "page" : undefined}
	data-slot="pagination-link"
	data-active={isActive}
	data-size={size}
	class={cn(
		buttonVariants({ size, variant: isActive ? "outline" : "ghost" }),
		"cn-pagination-link",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.Page>

```

# src/lib/components/ui/pagination/pagination-next-button.svelte

```svelte
<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { cn } from "$lib/utils/shadcn.js";
	import { buttonVariants } from "../button/index.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PaginationPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
	<span>Next</span>
	<ChevronRightIcon class={cn("size-4", className)} />
{/snippet}

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	class={cn(buttonVariants({ variant: "ghost" }), "pr-1.5!", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.NextButton>

```

# src/lib/components/ui/pagination/pagination-next.svelte

```svelte
<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils/shadcn.js";
	import { PaginationLink } from "./index.js";
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';

	type PaginationNextProps = ComponentProps<typeof PaginationLink>;

	let { class: className, ...restProps }: PaginationNextProps = $props();
</script>

<PaginationLink
	aria-label="Go to next page"
	size="default"
	class={cn("pr-1.5!", className)}
	{...restProps}
>
	<span class="cn-pagination-next-text hidden sm:block">Next</span>
	<ChevronRightIcon data-icon="inline-end" />
</PaginationLink>

```

# src/lib/components/ui/pagination/pagination-prev-button.svelte

```svelte
<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import { cn } from "$lib/utils/shadcn.js";
	import { buttonVariants } from "../button/index.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PaginationPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronLeftIcon class={cn("size-4", className)} />
	<span>Previous</span>
{/snippet}

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(buttonVariants({ variant: "ghost" }), "pl-1.5!", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.PrevButton>

```

# src/lib/components/ui/pagination/pagination-previous.svelte

```svelte
<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils/shadcn.js";
	import { PaginationLink } from "./index.js";
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';

	type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

	let { class: className, ...restProps }: PaginationPreviousProps = $props();
</script>

<PaginationLink
	aria-label="Go to previous page"
	size="default"
	class={cn("pl-1.5!", className)}
	{...restProps}
>
	<ChevronLeftIcon data-icon="inline-start" />
	<span class="cn-pagination-previous-text hidden sm:block">Previous</span>
</PaginationLink>

```

# src/lib/components/ui/pagination/pagination.svelte

```svelte
<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import { cn } from "$lib/utils/shadcn.js";

	let {
		ref = $bindable(null),
		class: className,
		count = 0,
		perPage = 10,
		page = $bindable(1),
		siblingCount = 1,
		...restProps
	}: PaginationPrimitive.RootProps = $props();
</script>

<PaginationPrimitive.Root
	bind:ref
	bind:page
	role="navigation"
	aria-label="pagination"
	data-slot="pagination"
	{count}
	{perPage}
	{siblingCount}
	class={cn("cn-pagination mx-auto flex w-full justify-center", className)}
	{...restProps}
/>

```

# src/lib/components/ui/separator/index.ts

```ts
import Root from "./separator.svelte";

export {
	Root,
	//
	Root as Separator,
};

```

# src/lib/components/ui/separator/separator.svelte

```svelte
<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn.js';

	let {
		ref = $bindable(null),
		class: className,
		'data-slot': dataSlot = 'separator',
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot={dataSlot}
	class={cn(
		'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
		// this is different in shadcn/ui but self-stretch breaks things for us
		'data-[orientation=vertical]:h-full',
		className
	)}
	{...restProps}
/>

```

# src/lib/components/ui/sonner/index.ts

```ts
export { default as Toaster } from "./sonner.svelte";

```

# src/lib/components/ui/sonner/sonner.svelte

```svelte
<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import OctagonXIcon from '@lucide/svelte/icons/octagon-x';
	import InfoIcon from '@lucide/svelte/icons/info';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	{...restProps}
>
	{#snippet loadingIcon()}
		<Loader2Icon class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<CircleCheckIcon class="size-4" />
	{/snippet}
	{#snippet errorIcon()}
		<OctagonXIcon class="size-4" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlertIcon class="size-4" />
	{/snippet}
</Sonner>

```

# src/lib/constants/index.ts

```ts
// $lib/constants/index.ts
import { dev } from '$app/environment';
import { PUBLIC_API_URL } from '$env/static/public';

export const CONSTANTS = {
	COMMENT: {
		MAX_LENGTH: 500,
		MIN_LENGTH: 1
	},
	API: {
		TIMEOUT: 10 * 1000,
		BASE_URL: dev ? '' : PUBLIC_API_URL
	},
	PAGINATION: {
		DEFAULT_PAGE: 1,
		DEFAULT_LIMIT: 10
	}
} as const;

```

# src/lib/schema/auth.ts

```ts
import * as z from 'zod';

export const loginSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters.')
			.max(20, 'Username must be at most 20 characters')
			.regex(
				/^[a-zA-Z0-9._-]+$/,
				'Username can only contain letters, numbers, dots, underscores, and hyphens'
			),
		email: z.email('Invalid email'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match'
	});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

```

# src/lib/schema/comment.ts

```ts
import * as z from 'zod';

export const commentSchema = z.object({
	content: z
		.string()
		.min(1, 'Comment cannot be empty')
		.max(500, 'Comment cannot exceed 500 characters')
});

export type CommentInput = z.infer<typeof commentSchema>;

```

# src/lib/schema/post.ts

```ts
import * as z from 'zod';

export const togglePublishSchema = z.object({
	id: z.coerce.number().int().positive()
});

export const deletePostSchema = z.object({
	id: z.coerce.number().int().positive()
});

export const createPostSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
	content: z.string().min(1, 'Content is required'),
	published: z.coerce.boolean().optional().default(false)
});

export const updatePostSchema = createPostSchema.partial();

export const deleteCommentOnPostSchema = z.object({
	postId: z.coerce.number().int().positive(),
	commentId: z.coerce.number().int().positive()
});

export type TogglePublishInput = z.infer<typeof togglePublishSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type DeleteCommentOnPostInput = z.infer<typeof deleteCommentOnPostSchema>;

```

# src/lib/types/data.ts

```ts
export type Role = 'USER' | 'ADMIN';

export interface User {
	id: number;
	username: string;
	email: string;
	role: Role;
	createdAt: string;
	updatedAt: string;
}

export interface Post {
	id: number;
	title: string;
	content: string;
	published: boolean;
	authorId: number;
	createdAt: string;
	updatedAt: string;
}

// Post for list endpoint - GET /posts
export interface PostWithAuthor extends Post {
	author: Pick<User, 'id' | 'username' | 'role'>;
	likesCount: number;
	commentsCount: number;
}

// Post for detail endpoint - GET /posts/:postId
export interface PostDetail extends PostWithAuthor {
	comments: CommentWithAuthor[];
	isLikedByCurrentUser: boolean;
}

export interface Comment {
	id: number;
	content: string;
	postId: number;
	authorId: number;
	createdAt: string;
	updatedAt: string;
}

export interface CommentWithAuthor extends Comment {
	author: Pick<User, 'id' | 'username' | 'role'>;
}

export interface PaginationMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export type PostsResult = {
	posts: PostWithAuthor[];
	pagination: PaginationMeta;
};

export type UserResult = {
	user: Pick<User, 'id' | 'username' | 'role'>;
	posts: PostWithAuthor[];
	pagination: PaginationMeta;
};

export type PostDetailResult = { post: PostDetail };

export interface CommentCreateInput {
	content: string;
}

export interface AuthResultUser {
	id: number;
	username: string;
	email: string;
	role: Role;
}

export interface AuthResult {
	user: AuthResultUser;
}

```

# src/lib/utils/error-handlers.ts

```ts
import { APIError } from '$lib/api/client';
import { error, fail } from '@sveltejs/kit';

/**
 * For load functions - throws error (shows error page)
 */
export function handleLoadError(err: unknown): never {
	if (err instanceof APIError) {
		error(err.status ?? 500, err.message);
	}

	throw err;
}

/**
 * For form actions - returns fail (stays on page)
 * Handles ALL API errors including rate limits, validation, etc.
 */
export function handleActionError(err: unknown) {
	if (err instanceof APIError) {
		return fail(err.status ?? 500, {
			message: err.message,
			errors: err.fieldErrors
		});
	}

	throw err;
}

```

# src/lib/utils/formatters.ts

```ts
/**
 * Format numbers in compact notation (1000 → 1K)
 */
export function formatCompactNum(num: number) {
	return new Intl.NumberFormat('en', {
		notation: 'compact',
		compactDisplay: 'short' // 'short' for 'K', 'long' for 'thousand'
	}).format(num);
}

export function getReadingTime(content: string): string {
	const words = content
		.replace(/<[^>]*>/g, '')
		.trim()
		.split(/\s+/).length;
	const minutes = Math.max(1, Math.round(words / 200));

	return `${minutes} min read`;
}

```

# src/lib/utils/sanitize.ts

```ts
// $lib/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
	// If content has no HTML tags, wrap paragraphs
	if (!/<[a-z][\s\S]*>/i.test(html)) {
		html = html
			.split(/\n/)
			.map((p) => `<p>${p}</p>`)
			.join('');
	}

	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			'p',
			'br',
			'strong',
			'em',
			'u',
			'a',
			'ul',
			'ol',
			'li',
			'h1',
			'h2',
			'h3',
			'blockquote',
			'pre',
			'code',
			'hr'
		],
		ALLOWED_ATTR: ['href', 'target', 'rel']
	});
}

```

# src/lib/utils/shadcn.ts

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

```

# src/routes/_components/ArticleCard.svelte

```svelte
<script lang="ts">
	import { format } from 'date-fns';
	import { Heart, MessageCircle } from '@lucide/svelte';

	import * as Card from '$lib/components/ui/card/index.js';
	import type { PostWithAuthor } from '$lib/types/data';

	import { goto } from '$app/navigation';
	import { formatCompactNum } from '$lib/utils/formatters';
	import { sanitizeHtml } from '$lib/utils/sanitize';

	let { post, isHome }: { post: PostWithAuthor; isHome: boolean } = $props();

	const handleCardClick = (ev: MouseEvent | KeyboardEvent) => {
		// Ignore if clicking on interactive elements
		const target = ev.target as HTMLElement;
		if (target.closest('[data-card-action]')) return;

		goto(`/posts/${post.id}`);
	};

	const handleCardKeyDown = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			ev.preventDefault();
			handleCardClick(ev);
		}
	};

	const handleCardActionClick = (ev: MouseEvent | KeyboardEvent) => {
		ev.stopPropagation();
		ev.preventDefault();

		goto(`/users/${post.author.id}`);
	};

	const handleCardActionKeyDown = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			handleCardActionClick(ev);
		}
	};
</script>

<Card.Root
	role="article"
	tabindex={0}
	class="my-5 flex cursor-pointer flex-col gap-3 rounded-sm border-none bg-transparent px-4 outline-none"
	onclick={handleCardClick}
	onkeydown={handleCardKeyDown}
>
	<Card.Header class="flex flex-col px-0">
		{#if isHome}
			<Card.Action
				tabindex={0}
				class="group"
				data-card-action
				onclick={handleCardActionClick}
				onkeydown={handleCardActionKeyDown}
			>
				<span class="text-foreground/70 italic underline-offset-2 group-hover:underline">
					{post.author.username}
				</span>
			</Card.Action>
		{/if}

		<Card.Title>
			{#if isHome}
				<h1 class="scroll-m-16 font-ibm text-2xl font-semibold tracking-tight sm:text-3xl">
					{post.title}
				</h1>
			{:else}
				<h2
					class="scroll-m-16 border-none font-ibm text-2xl font-semibold tracking-tight sm:text-3xl"
				>
					{post.title}
				</h2>
			{/if}
		</Card.Title>
	</Card.Header>

	<Card.Content class="px-0">
		<div class="prose max-w-none dark:prose-invert">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html sanitizeHtml(post.content.split(/\n/)[0])}
		</div>
	</Card.Content>

	<Card.Footer class="flex items-center justify-end gap-5 bg-transparent px-0 text-zinc-500">
		<div class="text-sm">{format(post.createdAt, 'LLL d')}</div>

		<div class="flex items-center gap-1">
			<Heart size={16} fill="currentColor" class="text-zinc-400 dark:text-zinc-600" />
			<span class="text-sm">
				{formatCompactNum(post.likesCount || 0)}
			</span>
		</div>

		<div class="flex items-center gap-1">
			<MessageCircle size={16} fill="currentColor" class="text-zinc-400 dark:text-zinc-600" />
			<span class="text-sm">
				{formatCompactNum(post.commentsCount || 0)}
			</span>
		</div>
	</Card.Footer>
</Card.Root>

```

# src/routes/(dashboard)/dashboard/+page.svelte

```svelte
<h1>Dashboard</h1>

```

# src/routes/(public)/+layout.svelte

```svelte
<script lang="ts">
	import Header from '../Header.svelte';

	let { children, data } = $props();
</script>

<div class="flex min-h-screen flex-col items-center">
	<Header user={data.user} />

	<main class="flex- mx-auto w-full max-w-2xl">
		{@render children()}
	</main>
</div>

```

# src/routes/(public)/+page.server.ts

```ts
import { getPosts } from '$lib/api/post';
import { handleLoadError } from '$lib/utils/error-handlers';

export async function load({ url, fetch }) {
	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : undefined;
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;
	const search = url.searchParams.get('search') ?? undefined;

	try {
		const result = await getPosts({ page, limit, search }, fetch);

		return {
			posts: result.posts,
			pagination: result.pagination
		};
	} catch (err) {
		return handleLoadError(err);
	}
}

```

# src/routes/(public)/+page.svelte

```svelte
<script lang="ts">
	import { format } from 'date-fns';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { Heart, Clock, ChevronLeft, ChevronRight, MessageSquare } from '@lucide/svelte';

	import Avatar from '$lib/components/Avatar.svelte';
	import { formatCompactNum, getReadingTime } from '$lib/utils/formatters';

	let { data }: PageProps = $props();

	let posts = $derived(data.posts ?? []);
	let pagination = $derived(data.pagination);

	type SortKey = 'latest' | 'likes' | 'comments';

	const filters: { label: string; value: SortKey }[] = [
		{ label: 'Latest', value: 'latest' },
		{ label: 'Most liked', value: 'likes' },
		{ label: 'Most discussed', value: 'comments' }
	];

	let sort = $derived((page.url.searchParams.get('sort') ?? 'latest') as SortKey);
	let search = $derived(page.url.searchParams.get('search')?.trim() ?? '');

	// Note: this sorts within the current page only.
	// For true global sorting, the server API would need a sort param.
	let sortedPosts = $derived.by(() => {
		let result = [...posts];

		if (sort === 'likes') return result.sort((a, b) => b.likesCount - a.likesCount);

		if (sort === 'comments') return result.sort((a, b) => b.commentsCount - a.commentsCount);

		return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	});

	function setSort(value: SortKey) {
		const url = new URL(page.url);
		url.searchParams.set('sort', value);
		url.searchParams.delete('page');
		goto(url.toString());
	}

	function setPage(nextPage: number) {
		const url = new URL(page.url);
		url.searchParams.set('page', String(nextPage));
		goto(url.toString());
	}

	function getExcerpt(content: string): string {
		return content.replace(/<[^>]*>/g, '').trim();
	}

	const THUMBNAIL_COLORS = [
		'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
		'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
		'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
		'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200',
		'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200'
	];

	function getThumbnailColor(title: string): string {
		return THUMBNAIL_COLORS[title.charCodeAt(0) % THUMBNAIL_COLORS.length];
	}
</script>

<svelte:head>
	<title>The Blog</title>
	<meta name="description" content="A collection of posts" />
</svelte:head>

<div class="w-full px-6 pb-16">
	<!-- Page Heading -->
	<div class="pt-10 pb-6">
		<p class="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">Latest</p>
		<h1 class="font-ibm text-3xl font-medium tracking-tight">All posts</h1>
	</div>

	<!-- Sort filters -->
	<div class="mb-6 flex flex-wrap gap-2">
		{#each filters as filter (filter.value)}
			<button
				onclick={() => setSort(filter.value)}
				class="rounded-full border px-3 py-1 text-xs transition-colors {sort === filter.value
					? 'border-foreground bg-foreground text-background'
					: 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'}"
			>
				{filter.label}
			</button>
		{/each}
	</div>

	<!-- Post list -->
	<div class="px-6">
		{#each sortedPosts as post (post.id)}
			<a
				href="/posts/{post.id}"
				class="-mx-6 grid grid-cols-1 items-start gap-4 border-t border-border py-5 transition-colors hover:bg-accent/30 sm:grid-cols-[1fr_auto] sm:px-3"
			>
				<!-- Left: text content -->
				<div class="min-w-0">
					<!-- Author + date -->
					<div class="mb-2.5 flex items-center gap-2">
						<Avatar username={post.author.username} className="size-6 text-[12px]" />
						<span class="text-sm text-muted-foreground">{post.author.username}</span>
						<span class="text-muted-foreground">·</span>
						<span class="text-sm text-muted-foreground">{format(post.createdAt, 'MMM d')}</span>
					</div>

					<!-- Title -->
					<h2
						class="mb-1.5 line-clamp-2 font-ibm text-[17px] leading-snug font-medium tracking-tight text-foreground"
					>
						{post.title}
					</h2>

					<!-- Excerpt -->
					<p class="mb-3.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
						{getExcerpt(post.content)}
					</p>

					<!-- Stats -->
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-xs text-muted-foreground">
							<Heart size={13} />
							{formatCompactNum(post.likesCount)}
						</span>
						<span class="flex items-center gap-1 text-xs text-muted-foreground">
							<MessageSquare size={13} />
							{formatCompactNum(post.commentsCount)}
						</span>
						<span class="flex items-center gap-1 text-xs text-muted-foreground">
							<Clock size={13} />
							{getReadingTime(post.content)}
						</span>
					</div>
				</div>

				<!-- Right: thumbnail placeholder -->
				<div
					class="hidden size-20 shrink-0 rounded-md border border-border bg-muted/50 font-ibm uppercase sm:flex {getThumbnailColor(
						post.title
					)} items-center justify-center text-2xl font-medium"
					aria-hidden="true"
				>
					{post.title[0]}
				</div>
			</a>
		{/each}

		<!-- Empty state -->
		{#if sortedPosts.length === 0}
			<div class="border-t border-border text-center">
				{#if search}
					<p class="text-sm text-muted-foreground">
						No posts matching <span class="text-foreground">{search}</span>
					</p>
				{:else}
					<p class="text-sm text-muted-foreground">No posts yet.</p>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Pagination - hidden during search since we filter client-side -->
	{#if pagination && pagination.totalPages > 1 && !search}
		<div class="grid grid-cols-3 items-center justify-items-center border-t border-border pt-5">
			<button
				disabled={!pagination.hasPrevPage}
				onclick={() => setPage(pagination.page - 1)}
				class="flex min-w-22 cursor-pointer items-center justify-center gap-1.5 justify-self-start rounded-md border border-border py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
			>
				<ChevronLeft size={13} />
				Previous
			</button>

			<span class="text-sm text-muted-foreground">
				Page {pagination.page} of {pagination.totalPages}
			</span>

			<button
				disabled={!pagination.hasNextPage}
				onclick={() => setPage(pagination.page + 1)}
				class="flex min-w-20 cursor-pointer items-center gap-1.5 justify-self-end rounded-md border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
			>
				Next
				<ChevronRight size={13} />
			</button>
		</div>
	{/if}
</div>

```

# src/routes/(public)/posts/[id]/+page.server.ts

```ts
import { flattenError } from 'zod';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { APIError } from '$lib/api/client';
import { getPost, likePost, createComment, updateComment } from '$lib/api/post';
import { handleLoadError, handleActionError } from '$lib/utils/error-handlers';
import { commentSchema } from '$lib/schema/comment';

export async function load({ params, fetch }) {
	const id = Number(params.id);

	if (!Number.isInteger(id) || id < 1) {
		error(400, 'Invalid post ID');
	}

	try {
		return await getPost(id, fetch);
	} catch (err) {
		return handleLoadError(err);
	}
}

export const actions = {
	like: async ({ params, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'You must be logged in to like a post.' });
		}

		const id = Number(params.id);

		if (!Number.isInteger(id) || id < 1) {
			error(400, 'Invalid post ID');
		}

		try {
			await likePost(id, fetch);
			return { success: true };
		} catch (err) {
			if (err instanceof APIError) {
				// Rate limit - return as fail so the client can show a toast
				if (err.status === 429) {
					return fail(429, { message: err.message });
				}

				error(err.status ?? 500, err.message);
			}

			throw err;
		}
	},
	comment: async ({ params, request, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'You must be logged in to comment.' });
		}

		const postId = Number(params.id);

		if (!Number.isInteger(postId) || postId < 1) {
			error(400, 'Invalid post ID');
		}

		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const validateResult = commentSchema.safeParse(data);

		if (!validateResult.success) {
			return fail(400, { errors: flattenError(validateResult.error).fieldErrors });
		}

		try {
			await createComment(postId, validateResult.data.content, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	},
	editComment: async ({ params, request, fetch, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'You must be logged in to edit a comment' });
		}

		const postId = Number(params.id);
		const formData = await request.formData();
		const commentId = Number(formData.get('commentId'));
		const content = formData.get('content') as string;

		if (!Number.isInteger(postId) || postId < 1) {
			error(400, 'Invalid post ID');
		}

		if (!Number.isInteger(commentId) || commentId < 1) {
			return fail(400, 'Invalid comment ID');
		}

		const result = commentSchema.safeParse({ content });

		if (!result.success) {
			return fail(400, { errors: flattenError(result.error).fieldErrors });
		}

		try {
			await updateComment(postId, commentId, content, fetch);
			return { success: true };
		} catch (err) {
			return handleActionError(err);
		}
	}
} satisfies Actions;

```

# src/routes/(public)/posts/[id]/+page.svelte

```svelte
<script lang="ts">
	import type { PageProps } from './$types';
	import Article from './Article.svelte';
	import ArticleControls from './ArticleControls.svelte';
	import CommentsSection from './CommentsSection.svelte';

	let { data, form }: PageProps = $props();

	let post = $derived(data.post);
	let user = $derived(data.user);

	let commentSection: CommentsSection;

	function handleCommentClick() {
		commentSection?.scrollIntoView();
		commentSection?.focus();
	}
</script>

<svelte:head>
	<title>{post.title} - The Blog</title>
	<meta name="description" content={post.content.replace(/<[^>]*>/g, '').slice(0, 160)} />
</svelte:head>

<div class="w-full px-6 pb-20">
	<Article {post} />
	<ArticleControls {post} {user} {handleCommentClick} />
	<CommentsSection {user} {post} {form} bind:this={commentSection} />
</div>

```

# src/routes/(public)/posts/[id]/Article.svelte

```svelte
<script lang="ts">
	import type { PostDetail } from '$lib/types/data';
	import { getReadingTime } from '$lib/utils/formatters';
	import { sanitizeHtml } from '$lib/utils/sanitize';
	import { ChevronLeft } from '@lucide/svelte';
	import { format } from 'date-fns';

	interface Props {
		post: PostDetail;
	}

	let { post }: Props = $props();
</script>

<section class="w-full">
	<!-- Back link -->
	<div class="border-b border-border py-3.5">
		<a
			href="/"
			class="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ChevronLeft size={13} />
			All posts
		</a>
	</div>

	<!-- Title -->
	<div class="pt-9 pb-6">
		<h1
			class="font-ibm text-3xl leading-snug font-medium tracking-tight text-foreground sm:text-4xl"
		>
			{post.title}
		</h1>
	</div>

	<!-- Author + meta -->
	<div class="mb-8 flex items-center gap-2.5">
		<a
			href="/users/{post.author.id}"
			class="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-[12px] font-medium text-foreground uppercase transition-colors hover:border-foreground/30"
		>
			{post.author.username[0]}
		</a>
		<a
			href="/users/{post.author.id}"
			class="text-sm font-medium text-foreground transition-colors hover:underline hover:underline-offset-2"
		>
			{post.author.username}
		</a>
		<span class="text-muted-foreground/40">·</span>
		<span class="text-sm text-muted-foreground">
			{format(post.createdAt, 'MMM d, yyyy')}
		</span>
		<span class="text-muted-foreground/40">·</span>
		<span class="text-sm text-muted-foreground">
			{getReadingTime(post.content)}
		</span>
	</div>

	<!-- Content -->
	<div class="prose max-w-none prose-zinc dark:prose-invert">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html sanitizeHtml(post.content)}
	</div>
</section>

```

# src/routes/(public)/posts/[id]/ArticleControls.svelte

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { AuthResultUser, PostDetail } from '$lib/types/data';
	import { formatCompactNum } from '$lib/utils/formatters';
	import { Heart, MessageSquare } from '@lucide/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	interface Props {
		user: AuthResultUser | null;
		post: PostDetail;
		handleCommentClick: () => void;
	}

	let { user, post, handleCommentClick }: Props = $props();

	let isAuthenticated = $derived(!!user);
	let optimisticLiked = $derived(post.isLikedByCurrentUser);
	let optimisticLikes = $derived(post.likesCount ?? 0);
	let pendingRequests = $state(0);

	const handleLikeSubmit: SubmitFunction = ({ cancel }) => {
		if (!isAuthenticated) {
			goto(`/auth/login?redirect=${encodeURIComponent(`/posts/${post.id}`)}`);
			cancel();
			return;
		}

		pendingRequests += 1;

		const originalLiked = optimisticLiked;
		const originalCount = optimisticLikes;

		optimisticLiked = !optimisticLiked;
		optimisticLikes = optimisticLiked ? originalCount + 1 : originalCount - 1;

		return async ({ result, update }) => {
			pendingRequests -= 1;

			if (result.type === 'failure') {
				optimisticLiked = originalLiked;
				optimisticLikes = originalCount;
				toast.error((result.data?.message as string) ?? 'Something went wrong');
				return;
			}

			if (result.type === 'success' && pendingRequests === 0) {
				await update();
			}
		};
	};
</script>

<div class="my-8 flex items-center gap-5 border-y border-border py-4 text-muted-foreground">
	<!-- Like -->
	<form action="?/like" method="post" use:enhance={handleLikeSubmit}>
		{#key optimisticLiked}
			<button
				type="submit"
				in:scale={{ start: 0.85, duration: 180, easing: cubicOut }}
				class="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
			>
				<Heart
					size={15}
					fill={optimisticLiked ? 'currentColor' : 'none'}
					class={optimisticLiked ? 'text-rose-500' : ''}
				/>
				<span class="text-sm">{formatCompactNum(optimisticLikes)}</span>
			</button>
		{/key}
	</form>

	<!-- Comments -->
	<button
		onclick={handleCommentClick}
		class="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
	>
		<MessageSquare size={15} />
		<span class="text-sm">
			{formatCompactNum(post.commentsCount)}
			{post.commentsCount === 1 ? 'comment' : 'comments'}
		</span>
	</button>
</div>

```

# src/routes/(public)/posts/[id]/CommentsSection.svelte

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/Avatar.svelte';
	import { CONSTANTS } from '$lib/constants';
	import type { AuthResultUser, PostDetail } from '$lib/types/data';
	import { formatCompactNum } from '$lib/utils/formatters';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { format } from 'date-fns';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	const MAX_LENGTH = CONSTANTS.COMMENT.MAX_LENGTH;

	interface FormResult {
		success?: boolean;
		message?: string;
		errors?: Record<string, string[]>;
		data?: { content: string };
	}

	interface Props {
		user: AuthResultUser | null;
		post: PostDetail;
		form: FormResult | null;
	}

	let { user, post, form }: Props = $props();

	let authenticated = $derived(!!user);
	let content = $state('');
	let submitting = $state(false);
	let remaining = $derived(Math.max(0, MAX_LENGTH - content.length));

	let textarea = $state<HTMLTextAreaElement | null>(null);

	// Edit state
	let editingCommentId = $state<number | null>(null);
	let editContent = $state('');
	let editSubmitting = $state(false);
	let editRemaining = $derived(Math.max(0, MAX_LENGTH - editContent.length));

	export function focus() {
		textarea?.focus();
	}

	export function scrollIntoView() {
		textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	async function startEditing(commentId: number, currentContent: string) {
		editingCommentId = commentId;
		editContent = currentContent;

		// Wait for DOM to update before focusing the edit textarea
		await tick();

		document.getElementById(`edit-textarea-${commentId}`)?.focus();
	}

	function cancelEditing() {
		editingCommentId = null;
		editContent = '';
	}

	function isEdited(createdAt: string, updatedAt: string): boolean {
		return new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 2000;
	}

	const handleCommentSubmit: SubmitFunction = () => {
		submitting = true;

		return async ({ result, update }) => {
			submitting = false;

			if (result.type === 'success') {
				content = '';
				toast.success('Comment posted!');
				await update();
			} else if (result.type === 'failure') {
				if (result.data?.message) {
					toast.error(result.data.message as string);
				}

				// If unauthenticated, redirect to login
				if (result.status === 401) {
					goto(`/auth/login?redirect=/posts/${post.id}`);
				}
			}
		};
	};

	const handleEditSubmit: SubmitFunction = () => {
		editSubmitting = true;

		return async ({ result, update }) => {
			editSubmitting = false;

			if (result.type === 'success') {
				cancelEditing();
				toast.success('Comment updated.');
				await update();
			} else if (result.type === 'failure') {
				toast.error((result.data?.message as string) ?? 'Failed to update comment.');
			}
		};
	};
</script>

<section>
	<h2 class="mb-6 font-ibm text-xl font-medium tracking-tight">
		Comments ({formatCompactNum(post.commentsCount)})
	</h2>

	<!-- Comment form -->
	<form action="?/comment" method="post" use:enhance={handleCommentSubmit} class="mb-10">
		{#if authenticated}
			<div class="mb-3 flex items-center gap-2">
				<Avatar username={user!.username} className="size-7 text-[12px]" />
				<span class="text-sm font-medium">{user!.username}</span>
			</div>
		{/if}

		<div
			class="overflow-hidden rounded-md border border-border transition-colors focus-within:border-foreground/30"
		>
			<textarea
				bind:this={textarea}
				bind:value={content}
				name="content"
				placeholder={authenticated ? 'What are your thoughts?' : 'Log in to leave a comment'}
				maxlength={MAX_LENGTH}
				disabled={!authenticated || submitting}
				class="w-full resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				rows={3}
			></textarea>

			<div class="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2">
				<span class="text-xs {remaining === 0 ? 'text-destructive' : 'text-muted-foreground'}">
					{remaining} left
				</span>

				{#if authenticated}
					<button
						type="submit"
						disabled={!content.trim() || submitting}
						class="rounded-md bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-opacity disabled:pointer-events-none disabled:opacity-40"
					>
						{submitting ? 'Posting...' : 'Submit'}
					</button>
				{:else}
					<a
						href="/auth/login?redirect=/posts/{post.id}"
						class="rounded-md border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
					>
						Login to comment
					</a>
				{/if}
			</div>
		</div>

		{#if form?.errors?.content}
			<p class="mt-1.5 text-xs text-destructive">{form.errors.content[0]}</p>
		{/if}
	</form>

	<!-- Comments list -->
	{#if post.commentsCount > 0}
		<ul class="space-y-0">
			{#each post.comments as comment (comment.id)}
				<li class="border-t border-border py-6">
					<!-- <div class="flex items-start gap-3"> -->
					<div class="min-w-0 flex-1">
						<!-- Head row -->
						<div class="mb-1.5 flex items-baseline justify-between gap-2">
							<div class="flex items-baseline gap-2">
								{#if comment.author}
									<Avatar
										username={comment.author.username}
										className="size-7 shrink-0 text-[11px]"
									/>
								{:else}
									<div
										class="justify-content flex size-7 shrink-0 items-center rounded-full border border-border bg-muted/50 text-[11px] font-medium text-muted-foreground"
									>
										?
									</div>
								{/if}

								<span class="text-sm font-medium text-foreground">
									{comment.author?.username ?? 'Deleted user'}
								</span>
								<span class="text-xs text-muted-foreground">
									{format(comment.createdAt, 'MMM d, yyyy')}
								</span>

								{#if isEdited(comment.createdAt, comment.updatedAt)}
									<span class="text-xs text-muted-foreground/50">edited</span>
								{/if}
							</div>

							<!-- Edit button - only for comment author -->
							{#if user?.id === comment.author?.id && editingCommentId !== comment.id}
								<button
									type="button"
									onclick={() => startEditing(comment.id, comment.content)}
									class="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
								>
									Edit
								</button>
							{/if}
						</div>

						<!-- View mode -->
						{#if editingCommentId !== comment.id}
							<p class="foreground ml-9 text-sm leading-relaxed text-muted-foreground">
								{comment.content}
							</p>
							<!-- Edit mode -->
						{:else}
							<form
								action="?/editComment"
								method="post"
								use:enhance={handleEditSubmit}
								class="mt-1"
							>
								<input type="hidden" name="commentId" value={comment.id} />

								<div
									class="overflow-hidden rounded-md border border-border transition-colors focus-within:border-foreground/30"
								>
									<textarea
										id="edit-textarea-{comment.id}"
										bind:value={editContent}
										name="content"
										maxlength={MAX_LENGTH}
										disabled={editSubmitting}
										rows={3}
										class="w-full resize-none bg-transparent px-3 py-2.5 text-sm leading-relaxed text-foreground focus:outline-none disabled:opacity-50"
									></textarea>

									<div
										class="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2"
									>
										<span
											class="text-xs {editRemaining === 0
												? 'text-destructive'
												: 'text-muted-foreground'}"
										>
											{editRemaining} left
										</span>
										<div class="flex items-center gap-2">
											<button
												type="button"
												onclick={cancelEditing}
												disabled={editSubmitting}
												class="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-40"
											>
												Cancel
											</button>
											<button
												type="submit"
												disabled={!editContent.trim() ||
													editSubmitting ||
													editContent === comment.content}
												class="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity disabled:pointer-events-none disabled:opacity-40"
											>
												{editSubmitting ? 'Saving...' : 'Save'}
											</button>
										</div>
									</div>
								</div>
							</form>
						{/if}
					</div>
					<!-- </div> -->
				</li>
			{/each}
		</ul>
	{:else}
		<p class="py-10 text-center text-sm text-muted-foreground">No comments yet. Be the first.</p>
	{/if}
</section>

```

# src/routes/+layout.server.ts

```ts
export async function load({ locals }) {
	return {
		user: locals.user
	};
}

```

# src/routes/+layout.svelte

```svelte
<script lang="ts">
	import './layout.css';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<LoadingSpinner />
<Toaster position="bottom-left" />

{@render children()}

```

# src/routes/auth/login/+page.server.ts

```ts
import { flattenError } from 'zod';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { login } from '$lib/api/auth.js';
import { APIError } from '$lib/api/client.js';
import { loginSchema } from '$lib/schema/auth.js';

export async function load({ locals }) {
	if (locals.user) redirect(307, '/');
}

export const actions = {
	default: async ({ request, fetch, url }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		// validate with zod
		const validateResult = loginSchema.safeParse(data);

		if (!validateResult.success) {
			return fail(400, {
				errors: flattenError(validateResult.error).fieldErrors,
				data
			});
		}

		try {
			await login(validateResult.data, fetch);

			const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

			redirect(307, to);
		} catch (error) {
			// expected, user-facing error
			if (error instanceof APIError) {
				return fail(error.status!, {
					message: error.message,
					errors: error.fieldErrors
				});
			}

			throw error;
		}
	}
} satisfies Actions;

```

# src/routes/auth/login/+page.svelte

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { enhance, applyAction } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils/shadcn.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import AuthFormField from '$lib/components/AuthFormField.svelte';

	let { form } = $props();
	let submitting = $state(false);

	let registerUrl = $derived.by(() => {
		const redirect = page.url.searchParams.get('redirect');
		return redirect ? `/auth/register?redirect=${encodeURIComponent(redirect)}` : '/auth/register';
	});

	// Local error state for real-time clearing
	let localErrors = $state<Record<string, string[] | undefined>>({});
	let localFormError = $state<string | undefined>();

	// Sync form errors with local errors
	$effect(() => {
		if (form?.errors) {
			localErrors = { ...form.errors };
		}

		if (form?.message) {
			localFormError = form.message;
		}
	});

	// Clear error for a specific field
	function clearError(fieldName: string) {
		if (localErrors[fieldName] || localFormError) {
			localErrors[fieldName] = undefined;
			localFormError = undefined;
		}
	}

	const handleSubmit: SubmitFunction = () => {
		submitting = true;

		return async ({ result }) => {
			submitting = false;

			if (result.type === 'redirect') {
				toast.message('You are logged in successfully!');
				goto(result.location, { invalidateAll: true });
			} else {
				await applyAction(result);

				// Focus first error field after submission
				if (result.type === 'failure' && result.data) {
					const data = result.data as {
						[k: string]: FormDataEntryValue;
					};

					if (data.errors && typeof data.errors === 'object') {
						setTimeout(() => {
							const firstErrorField = Object.keys(data.errors)[0];
							if (firstErrorField) {
								const input = document.getElementById(firstErrorField) as HTMLInputElement;
								input?.focus();
							}
						}, 0);
					}
				}
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
		<h1 class="font-ibm mb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
			Login
		</h1>

		<Field.Set>
			<Field.Group class="gap-5">
				<AuthFormField
					name="username"
					label="username"
					value={form?.data?.username ?? ''}
					errors={localErrors?.username}
					onClearError={() => clearError('username')}
					autofocus
				/>

				<AuthFormField
					name="password"
					label="password"
					type="password"
					value={form?.data?.password ?? ''}
					errors={localErrors?.password}
					onClearError={() => clearError('password')}
				/>

				<Field.Field class="gap-2">
					<Button type="submit" class="cursor-pointer" disabled={submitting}>
						{submitting ? 'Logging in...' : 'Login'}
					</Button>

					{#if localFormError}
						<Field.FieldError id="form-message">{localFormError}</Field.FieldError>
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
					submitting && 'pointer-events-none cursor-not-allowed opacity-50'
				)}
				aria-disabled={submitting}
			>
				Register
			</a>
			here.
		</p>
	</form>
</div>

```

# src/routes/auth/logout/+page.server.ts

```ts
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/api/auth';

export const actions = {
	default: async ({ url, fetch }) => {
		await logout(fetch);

		const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

		redirect(303, to);
	}
} satisfies Actions;

```

# src/routes/auth/register/+page.server.ts

```ts
import { flattenError } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { register } from '$lib/api/auth';
import { APIError } from '$lib/api/client';
import { registerSchema } from '$lib/schema/auth';

export const actions = {
	default: async ({ request, url, fetch }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const validateResult = registerSchema.safeParse(data);

		if (!validateResult.success) {
			return fail(400, {
				errors: flattenError(validateResult.error).fieldErrors,
				data
			});
		}

		try {
			await register(validateResult.data, fetch);

			const to = url.searchParams.has('redirect') ? `${url.searchParams.get('redirect')}` : '/';

			redirect(307, to);
		} catch (error) {
			if (error instanceof APIError) {
				return fail(error.status!, {
					message: error.message,
					errors: error.fieldErrors
				});
			}

			throw error;
		}
	}
} satisfies Actions;

```

# src/routes/auth/register/+page.svelte

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { cn } from '$lib/utils/shadcn';
	import * as Field from '$lib/components/ui/field/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import AuthFormField from '$lib/components/AuthFormField.svelte';

	let { form }: PageProps = $props();

	let submitting = $state(false);
	let localErrors = $state<Record<string, string[] | undefined>>({});
	let localFormError = $state<string | undefined>();
	let loginUrl = $derived.by(() => {
		const redirect = page.url.searchParams.get('redirect');
		return redirect ? `/auth/login?redirect=${encodeURIComponent(redirect)}` : '/auth/login';
	});

	$effect(() => {
		if (form?.errors) {
			localErrors = { ...form.errors };
		}

		if (form?.message) {
			localFormError = form.message;
		}
	});

	const clearError = (filedName: string) => {
		if (localErrors[filedName] || localFormError) {
			localErrors[filedName] = undefined;
			localFormError = undefined;
		}
	};

	const handleSubmit: SubmitFunction = () => {
		submitting = true;

		return async ({ result }) => {
			submitting = false;

			await applyAction(result);

			// focus on first error field after submission
			if (result.type === 'failure' && result.data) {
				const data = result.data as { [k: string]: FormDataEntryValue };

				if (data.errors && typeof data.errors === 'object') {
					setTimeout(() => {
						const firstErrorField = Object.keys(data.errors)[0];
						if (firstErrorField) {
							document.getElementById(firstErrorField)?.focus();
						}
					}, 0);
				}
			}
		};
	};
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register to the blog" />
</svelte:head>

<div class="mt-10 flex w-full max-w-md flex-1 sm:mt-20">
	<form class="w-full px-4 sm:px-8" method="post" novalidate use:enhance={handleSubmit}>
		<h1 class="font-ibm mb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
			Register
		</h1>

		<Field.Set>
			<Field.Group class="gap-5">
				<AuthFormField
					name="username"
					label="username"
					value={form?.data?.username ?? ''}
					errors={localErrors?.username}
					onClearError={() => clearError('username')}
					autofocus
				/>

				<AuthFormField
					name="email"
					label="email"
					type="email"
					value={form?.data?.email ?? ''}
					errors={localErrors?.email}
					onClearError={() => clearError('email')}
				/>

				<AuthFormField
					name="password"
					label="password"
					type="password"
					value={form?.data?.password ?? ''}
					errors={localErrors?.password}
					onClearError={() => clearError('password')}
				/>

				<AuthFormField
					name="confirmPassword"
					label="confirmPassword"
					type="password"
					value={form?.data?.confirmPassword ?? ''}
					errors={localErrors?.confirmPassword}
					onClearError={() => clearError('confirmPassword')}
				/>

				<Field.Field class="gap-2">
					<Button type="submit" class="cursor-pointer" disabled={submitting}>
						{submitting ? 'Registering...' : 'Register'}
					</Button>

					{#if localFormError}
						<Field.FieldError id="form-message">{localFormError}</Field.FieldError>
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
					submitting && 'pointer-events-none cursor-not-allowed opacity-50'
				)}
				aria-disabled={submitting}
			>
				Login
			</a>
			here.
		</p>
	</form>
</div>

```

# src/routes/Header.svelte

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Search, SquarePen, X, Menu, LogIn, LogOut, UserPlus } from '@lucide/svelte';

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
									<Avatar username={user!.username} className="group-hover:border-transparent" />
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

```

# src/routes/layout.css

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

@import 'tailwindcss';
@import 'tw-animate-css';

@plugin '@tailwindcss/typography';

@custom-variant dark (&:is(.dark *));

:root {
	--radius: 0.625rem;
	--background: oklch(1 0 0);
	--foreground: oklch(0.141 0.005 285.823);
	--card: oklch(1 0 0);
	--card-foreground: oklch(0.141 0.005 285.823);
	--popover: oklch(1 0 0);
	--popover-foreground: oklch(0.141 0.005 285.823);
	--primary: oklch(0.21 0.006 285.885);
	--primary-foreground: oklch(0.985 0 0);
	--secondary: oklch(0.967 0.001 286.375);
	--secondary-foreground: oklch(0.21 0.006 285.885);
	--muted: oklch(0.967 0.001 286.375);
	--muted-foreground: oklch(0.552 0.016 285.938);
	--accent: oklch(0.967 0.001 286.375);
	--accent-foreground: oklch(0.21 0.006 285.885);
	--destructive: oklch(0.577 0.245 27.325);
	--border: oklch(0.92 0.004 286.32);
	--input: oklch(0.92 0.004 286.32);
	--ring: oklch(0.705 0.015 286.067);
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.6 0.118 184.704);
	--chart-3: oklch(0.398 0.07 227.392);
	--chart-4: oklch(0.828 0.189 84.429);
	--chart-5: oklch(0.769 0.188 70.08);
	--sidebar: oklch(0.985 0 0);
	--sidebar-foreground: oklch(0.141 0.005 285.823);
	--sidebar-primary: oklch(0.21 0.006 285.885);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.967 0.001 286.375);
	--sidebar-accent-foreground: oklch(0.21 0.006 285.885);
	--sidebar-border: oklch(0.92 0.004 286.32);
	--sidebar-ring: oklch(0.705 0.015 286.067);
}

.dark {
	--background: oklch(0.141 0.005 285.823);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.21 0.006 285.885);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.21 0.006 285.885);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.92 0.004 286.32);
	--primary-foreground: oklch(0.21 0.006 285.885);
	--secondary: oklch(0.274 0.006 286.033);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.274 0.006 286.033);
	--muted-foreground: oklch(0.705 0.015 286.067);
	--accent: oklch(0.274 0.006 286.033);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.704 0.191 22.216);
	--border: oklch(1 0 0 / 10%);
	--input: oklch(1 0 0 / 15%);
	--ring: oklch(0.552 0.016 285.938);
	--chart-1: oklch(0.488 0.243 264.376);
	--chart-2: oklch(0.696 0.17 162.48);
	--chart-3: oklch(0.769 0.188 70.08);
	--chart-4: oklch(0.627 0.265 303.9);
	--chart-5: oklch(0.645 0.246 16.439);
	--sidebar: oklch(0.21 0.006 285.885);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.488 0.243 264.376);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.274 0.006 286.033);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(1 0 0 / 10%);
	--sidebar-ring: oklch(0.552 0.016 285.938);
}

@theme inline {
	--radius-sm: calc(var(--radius) - 4px);
	--radius-md: calc(var(--radius) - 2px);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) + 4px);
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-popover: var(--popover);
	--color-popover-foreground: var(--popover-foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-secondary: var(--secondary);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-accent: var(--accent);
	--color-accent-foreground: var(--accent-foreground);
	--color-destructive: var(--destructive);
	--color-border: var(--border);
	--color-input: var(--input);
	--color-ring: var(--ring);
	--color-chart-1: var(--chart-1);
	--color-chart-2: var(--chart-2);
	--color-chart-3: var(--chart-3);
	--color-chart-4: var(--chart-4);
	--color-chart-5: var(--chart-5);
	--color-sidebar: var(--sidebar);
	--color-sidebar-foreground: var(--sidebar-foreground);
	--color-sidebar-primary: var(--sidebar-primary);
	--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
	--color-sidebar-accent: var(--sidebar-accent);
	--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
	--color-sidebar-border: var(--sidebar-border);
	--color-sidebar-ring: var(--sidebar-ring);

	/* Custom font family */
	--font-anton: 'Anton', sans-serif;
	--font-ibm: 'IBM Plex Sans', sans-serif;
	--font-roboto: 'Roboto', sans-serif;
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply bg-background text-foreground;

		font-family:
			'Quicksand',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
}

```

# src/routes/users/[id]/+page.server.ts

```ts

```

# src/routes/users/[id]/+page.svelte

```svelte
<h1>User Page</h1>

```

# static/robots.txt

```txt
# allow crawling everything by default
User-agent: *
Disallow:

```

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

```

# tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"rewriteRelativeImportExtensions": true,
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// To make changes to top-level options such as include and exclude, we recommend extending
	// the generated config; see https://svelte.dev/docs/kit/configuration#typescript
}

```

# vite.config.ts

```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const apiTarget = env.API_PROXY_TARGET || env.PUBLIC_API_URL || 'http://192.168.0.114:8000';

	return {
		plugins: [tailwindcss(), sveltekit()],
		server: {
			proxy: {
				'/api': {
					target: apiTarget,
					changeOrigin: true,
					secure: false
				}
			}
		}
	};
});

```

