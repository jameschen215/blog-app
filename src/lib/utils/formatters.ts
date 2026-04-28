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
	'bg-red-100 dark:bg-red-700',
	'bg-orange-100 dark:bg-orange-700',
	'bg-amber-100 dark:bg-amber-700',
	'bg-yellow-100 dark:bg-yellow-700',
	'bg-lime-100 dark:bg-lime-700',
	'bg-green-100 dark:bg-green-700',
	'bg-emerald-100 dark:bg-emerald-700',
	'bg-teal-100 dark:bg-teal-700',
	'bg-cyan-100 dark:bg-cyan-700',
	'bg-sky-100 dark:bg-sky-700',
	'bg-blue-100 dark:bg-blue-700',
	'bg-indigo-100 dark:bg-indigo-700',
	'bg-violet-100 dark:bg-violet-700',
	'bg-purple-100 dark:bg-purple-700',
	'bg-fuchsia-100 dark:bg-fuchsia-700',
	'bg-pink-100 dark:bg-pink-700',
	'bg-rose-100 dark:bg-rose-700'
];

export function getThumbnailColor(title: string): string {
	return THUMBNAIL_COLORS[title.charCodeAt(0) % THUMBNAIL_COLORS.length];
}
