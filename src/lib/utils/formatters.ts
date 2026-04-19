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
