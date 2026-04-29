import { describe, it, expect } from 'vitest';
import {
	formatCompactNum,
	getReadingTime,
	getExcerpt,
	getExcerptOfTheFirstPara,
	getThumbnailColor
} from '$lib/utils/formatters';

describe('formatCompactNum', () => {
	it('formats zero', () => expect(formatCompactNum(0)).toBe('0'));
	it('formats numbers below 1K as-is', () => expect(formatCompactNum(999)).toBe('999'));
	it('formats 1000 as 1K', () => expect(formatCompactNum(1000)).toBe('1K'));
	it('formats 1500 as 1.5K', () => expect(formatCompactNum(1500)).toBe('1.5K'));
	it('formats 1_000_000 as 1M', () => expect(formatCompactNum(1_000_000)).toBe('1M'));
});

describe('getReadingTime', () => {
	it('returns at least 1 min for very short content', () => {
		expect(getReadingTime('hello')).toBe('1 min read');
	});

	it('strips HTML tags before counting words', () => {
		const html = '<p>' + 'word '.repeat(200).trim() + '</p>';
		expect(getReadingTime(html)).toBe('1 min read');
	});

	it('calculates minutes at 200 wpm', () => {
		const fourHundredWords = 'word '.repeat(400).trim();
		expect(getReadingTime(fourHundredWords)).toBe('2 min read');
	});
});

describe('getExcerpt', () => {
	it('strips HTML tags and trims', () => {
		expect(getExcerpt('<p>Hello world</p>')).toBe('Hello world');
	});

	it('returns plain text unchanged', () => {
		expect(getExcerpt('no tags here')).toBe('no tags here');
	});
});

describe('getExcerptOfTheFirstPara', () => {
	it('extracts text from the first <p>', () => {
		expect(getExcerptOfTheFirstPara('<p>First</p><p>Second</p>')).toBe('First');
	});

	it('falls back to plain text when no <p> present', () => {
		expect(getExcerptOfTheFirstPara('<div>No paragraph</div>')).toBe('No paragraph');
	});
});

describe('getThumbnailColor', () => {
	it('returns a non-empty string', () => {
		expect(getThumbnailColor('My Post')).toBeTruthy();
	});

	it('is deterministic — same title always gives same color', () => {
		expect(getThumbnailColor('Hello')).toBe(getThumbnailColor('Hello'));
	});

	it('returns a valid Tailwind class', () => {
		const color = getThumbnailColor('Test');
		expect(color).toMatch(/^bg-\w+-100 dark:bg-\w+-700$/);
	});
});
