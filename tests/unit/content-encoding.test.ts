import { describe, it, expect } from 'vitest';
import { encodeFormContent, decodeFormContent } from '$lib/utils/content-encoding';

describe('encodeFormContent / decodeFormContent', () => {
	it('round-trips an ASCII string', () => {
		const original = 'Hello, world!';
		expect(decodeFormContent(encodeFormContent(original))).toBe(original);
	});

	it('round-trips a Unicode string with emojis', () => {
		const original = '안녕하세요 🎉';
		expect(decodeFormContent(encodeFormContent(original))).toBe(original);
	});

	it('round-trips a multi-line string', () => {
		const original = 'line one\nline two\n\tindented';
		expect(decodeFormContent(encodeFormContent(original))).toBe(original);
	});
});

describe('decodeFormContent', () => {
	it('returns empty string for null input', () => {
		expect(decodeFormContent(null)).toBe('');
	});

	it('returns empty string for an empty string input', () => {
		expect(decodeFormContent('')).toBe('');
	});

	it('returns fallback for invalid base64', () => {
		expect(decodeFormContent('!!!not-base64!!!', 'fallback')).toBe('fallback');
	});

	it('returns empty string fallback by default for invalid input', () => {
		expect(decodeFormContent('!!!not-base64!!!')).toBe('');
	});
});
