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
