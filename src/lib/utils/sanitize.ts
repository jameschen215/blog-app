// $lib/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
	// If content has no HTML tags, wrap paragraphs
	if (!/<[a-z][\s\S]*>/i.test(html)) {
		html = html
			.split(/\n/)
			.map((p) => `<p>${p}</p>`)
			.join('');
	}

	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			'p',
			'br',
			'strong',
			'em',
			'u',
			'a',
			'ul',
			'ol',
			'li',
			'h1',
			'h2',
			'h3',
			'blockquote',
			'pre',
			'code',
			'hr'
		],
		ALLOWED_ATTR: ['href', 'target', 'rel']
	});
}
