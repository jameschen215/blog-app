function isSafeRedirect(path: string): boolean {
	return path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\');
}

export function getSafeRedirect(url: URL, defaultTo = '/'): string {
	const to = url.searchParams.get('redirect');
	return to && isSafeRedirect(to) ? to : defaultTo;
}
