import { flattenError } from 'zod';
import type { ZodType } from 'zod';

export function parseFormData<T>(schema: ZodType<T>, formData: FormData) {
	const raw = Object.fromEntries(formData);
	const result = schema.safeParse(raw);
	if (result.success) {
		return { data: result.data, errors: null as null, raw };
	}
	return { data: null as null, errors: flattenError(result.error).fieldErrors, raw };
}
