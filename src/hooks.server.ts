import jwt from 'jsonwebtoken';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import type { AuthResultUser, Role } from '$lib/types/data';
import { SECRET_KEY } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('jwt');

	if (token) {
		try {
			const payload = jwt.verify(token, SECRET_KEY) as AuthResultUser & { role: Role };

			event.locals.user = {
				id: payload.id,
				username: payload.username,
				email: payload.email,
				role: payload.role
			};
		} catch {
			event.locals.user = null;
		}
	}

	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.includes('/api/')) {
		request.headers.set('cookie', event.request.headers.get('cookie') ?? '');
	}
	return fetch(request);
};
