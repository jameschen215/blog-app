// svelte.config.js
import adapter from '@sveltejs/adapter-node';

function toOrigin(value) {
	if (!value) return null;

	try {
		return new URL(value).origin;
	} catch {
		return null;
	}
}

const trustedOrigins = [...new Set([
	toOrigin(process.env.ORIGIN),
	toOrigin(process.env.PUBLIC_APP_URL),
	toOrigin(process.env.RENDER_EXTERNAL_URL),
	'https://blog-app-g00p.onrender.com'
].filter(Boolean))];

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
		adapter: adapter(),
		csrf: {
			trustedOrigins
		}
	}
};

export default config;
