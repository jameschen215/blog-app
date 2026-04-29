import { apiPost } from '$lib/api/client';
import type { LoginInput, RegisterInput } from '$lib/schema/auth';
import type { AuthResult } from '$lib/types/data';

export function login(credentials: LoginInput, customFetch = fetch): Promise<AuthResult> {
	return apiPost<AuthResult>('/api/auth/login', credentials, customFetch);
}

export function register(credentials: RegisterInput, customFetch = fetch): Promise<AuthResult> {
	return apiPost<AuthResult>('/api/auth/register', credentials, customFetch);
}
