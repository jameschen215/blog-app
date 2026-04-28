import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
	// Only wrap in paragraphs if content has no HTML tags at all
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
			's',
			'a',
			'ul',
			'ol',
			'li',
			'h1',
			'h2',
			'h3',
			'h4',
			'blockquote',
			'pre',
			'code',
			'hr',
			'img'
		],
		ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt'],
		ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]*(?:[^a-z+.\-:]|$))/i
	});
}
