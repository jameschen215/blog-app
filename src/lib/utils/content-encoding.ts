export function encodeFormContent(value: string): string {
	const bytes = new TextEncoder().encode(value);
	let binary = '';

	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}

	return btoa(binary);
}

export function decodeFormContent(
	encodedValue: FormDataEntryValue | null,
	fallbackValue: FormDataEntryValue | null = ''
): string {
	const fallback = typeof fallbackValue === 'string' ? fallbackValue : '';

	if (typeof encodedValue !== 'string' || encodedValue.length === 0) {
		return fallback;
	}

	try {
		const binary = atob(encodedValue);
		const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

		return new TextDecoder().decode(bytes);
	} catch {
		return fallback;
	}
}
