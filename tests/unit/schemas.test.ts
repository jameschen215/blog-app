import { describe, it, expect } from 'vitest';
import { registerSchema } from '$lib/schema/auth';
import { createPostSchema, updatePostSchema, togglePublishSchema, deletePostSchema } from '$lib/schema/post';
import { commentSchema } from '$lib/schema/comment';

// ─── registerSchema ───────────────────────────────────────────────────────────

describe('registerSchema', () => {
	const valid = {
		username: 'alice',
		email: 'alice@example.com',
		password: 'secret123',
		confirmPassword: 'secret123'
	};

	it('accepts valid registration data', () => {
		expect(registerSchema.safeParse(valid).success).toBe(true);
	});

	it('rejects username shorter than 3 characters', () => {
		expect(registerSchema.safeParse({ ...valid, username: 'ab' }).success).toBe(false);
	});

	it('rejects username longer than 20 characters', () => {
		expect(registerSchema.safeParse({ ...valid, username: 'a'.repeat(21) }).success).toBe(false);
	});

	it('rejects username with special characters', () => {
		expect(registerSchema.safeParse({ ...valid, username: 'alice!' }).success).toBe(false);
	});

	it('accepts username with dots, underscores, and hyphens', () => {
		expect(registerSchema.safeParse({ ...valid, username: 'alice.bob_1-x' }).success).toBe(true);
	});

	it('rejects an invalid email', () => {
		expect(registerSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
	});

	it('rejects password shorter than 6 characters', () => {
		const data = { ...valid, password: '123', confirmPassword: '123' };
		expect(registerSchema.safeParse(data).success).toBe(false);
	});

	it('rejects mismatched passwords', () => {
		expect(registerSchema.safeParse({ ...valid, confirmPassword: 'different' }).success).toBe(false);
	});

	it('puts the password mismatch error on confirmPassword', () => {
		const result = registerSchema.safeParse({ ...valid, confirmPassword: 'different' });
		expect(result.success).toBe(false);
		if (!result.success) {
			const paths = result.error.issues.map((i) => i.path).flat();
			expect(paths).toContain('confirmPassword');
		}
	});
});

// ─── createPostSchema ─────────────────────────────────────────────────────────

describe('createPostSchema', () => {
	const valid = { title: 'My Post', content: '<p>Hello</p>' };

	it('accepts valid post data', () => {
		expect(createPostSchema.safeParse(valid).success).toBe(true);
	});

	it('rejects an empty title', () => {
		expect(createPostSchema.safeParse({ ...valid, title: '' }).success).toBe(false);
	});

	it('rejects a title over 200 characters', () => {
		expect(createPostSchema.safeParse({ ...valid, title: 'a'.repeat(201) }).success).toBe(false);
	});

	it('rejects empty content', () => {
		expect(createPostSchema.safeParse({ ...valid, content: '' }).success).toBe(false);
	});

	it('rejects content over 500 000 characters', () => {
		expect(createPostSchema.safeParse({ ...valid, content: 'a'.repeat(500_001) }).success).toBe(false);
	});

	it('defaults published to false when omitted', () => {
		const result = createPostSchema.safeParse(valid);
		expect(result.success && result.data.published).toBe(false);
	});

	it('coerces the string "true" to boolean true for published', () => {
		const result = createPostSchema.safeParse({ ...valid, published: 'true' });
		expect(result.success && result.data.published).toBe(true);
	});
});

// ─── updatePostSchema ─────────────────────────────────────────────────────────

describe('updatePostSchema', () => {
	it('accepts an object with only a title', () => {
		expect(updatePostSchema.safeParse({ title: 'Updated' }).success).toBe(true);
	});

	it('accepts an empty object — all fields are optional', () => {
		expect(updatePostSchema.safeParse({}).success).toBe(true);
	});
});

// ─── togglePublishSchema / deletePostSchema ───────────────────────────────────

describe('togglePublishSchema', () => {
	it('accepts a positive integer id', () => {
		expect(togglePublishSchema.safeParse({ id: '1' }).success).toBe(true);
	});

	it('rejects a non-positive id', () => {
		expect(togglePublishSchema.safeParse({ id: '-1' }).success).toBe(false);
	});
});

describe('deletePostSchema', () => {
	it('accepts a positive integer id', () => {
		expect(deletePostSchema.safeParse({ id: '5' }).success).toBe(true);
	});

	it('rejects zero', () => {
		expect(deletePostSchema.safeParse({ id: '0' }).success).toBe(false);
	});
});

// ─── commentSchema ────────────────────────────────────────────────────────────

describe('commentSchema', () => {
	it('accepts a valid comment', () => {
		expect(commentSchema.safeParse({ content: 'Great post!' }).success).toBe(true);
	});

	it('rejects an empty comment', () => {
		expect(commentSchema.safeParse({ content: '' }).success).toBe(false);
	});

	it('rejects a comment over 500 characters', () => {
		expect(commentSchema.safeParse({ content: 'a'.repeat(501) }).success).toBe(false);
	});

	it('accepts a comment of exactly 500 characters', () => {
		expect(commentSchema.safeParse({ content: 'a'.repeat(500) }).success).toBe(true);
	});
});
