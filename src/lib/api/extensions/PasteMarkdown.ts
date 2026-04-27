import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';

import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
	html: false,
	linkify: true,
	breaks: true,
});

export const PasteMarkdown = Extension.create({
	name: 'pasteMarkdown',

	addProseMirrorPlugins() {
		const editor = this.editor;

		return [
			new Plugin({
				props: {
					handlePaste(_view, event) {
						const text = event.clipboardData?.getData('text/plain');
						const html = event.clipboardData?.getData('text/html');

						if (!text) return false;

						// If real HTML exists, let Tiptap handle it
						if (html && html !== text) return false;

						// Avoid freezing on huge pastes
						if (text.length > 20000) return false;

						if (!looksLikeMarkdown(text)) return false;

						try {
							const renderedHTML = md.render(text);

							editor.commands.insertContent(renderedHTML, {
								parseOptions: {
									preserveWhitespace: true
								}
							});

							return true;
						} catch (err) {
							console.warn('[PasteMarkdown] markdown-it failed:', err);
							return false;
						}
					}
				}
			})
		];
	}
});

function looksLikeMarkdown(text: string): boolean {
	const sample = text.split('\n').slice(0, 5).join('\n');

	return /(^#{1,6}\s)|(\*\*.*\*\*)|(```)|(`[^`]+`)|(^>\s)|(^\d+\.\s)|(^[-*+]\s)/m.test(sample);
}
