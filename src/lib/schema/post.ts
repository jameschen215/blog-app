import * as z from 'zod';

export const togglePublishSchema = z.object({
	id: z.coerce.number().int().positive()
});

export const deletePostSchema = z.object({
	id: z.coerce.number().int().positive()
});

export const createPostSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
	content: z.string().min(1, 'Content is required').max(500_000, 'Content must be under 500KB'),
	published: z.coerce.boolean().optional().default(false)
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
