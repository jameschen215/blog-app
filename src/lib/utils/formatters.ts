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

export function getExcerpt(content: string): string {
	return content.replace(/<[^>]*>/g, '\n').trim();
}

export function getExcerptOfTheFirstPara(content: string): string {
	const match = content.match(/<p>(.*?)<\/p>/s);

	if (!match) return getExcerpt(content).split('\n')[0].trim();

	return getExcerpt(match[1]).trim();
}

const THUMBNAIL_COLORS = [
	'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
	'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
	'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
	'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200',
	'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200'
];

export function getThumbnailColor(title: string): string {
	return THUMBNAIL_COLORS[title.charCodeAt(0) % THUMBNAIL_COLORS.length];
}
