import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	resolve: {
		alias: {
			$lib: resolve('./src/lib'),
			'$app/environment': resolve('./tests/mocks/app-environment.ts'),
			'$env/dynamic/public': resolve('./tests/mocks/env-dynamic-public.ts')
		}
	},
	test: {
		include: ['tests/unit/**/*.test.ts']
	}
});
