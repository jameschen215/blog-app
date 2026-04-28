type FormResult = {
	errors?: Record<string, string[] | undefined>;
	message?: string;
} | null | undefined;

export function createAuthForm(getForm: () => FormResult) {
	let submitting = $state(false);
	let localErrors = $state<Record<string, string[] | undefined>>({});
	let localFormError = $state<string | undefined>();

	$effect(() => {
		const form = getForm();
		if (form?.errors) localErrors = { ...form.errors };
		if (form?.message) localFormError = form.message;
	});

	function clearError(fieldName: string) {
		if (localErrors[fieldName] || localFormError) {
			localErrors[fieldName] = undefined;
			localFormError = undefined;
		}
	}

	function focusFirstError(data: unknown) {
		if (data && typeof data === 'object' && 'errors' in data && data.errors && typeof data.errors === 'object') {
			setTimeout(() => {
				const firstField = Object.keys(data.errors as object)[0];
				if (firstField) document.getElementById(firstField)?.focus();
			}, 0);
		}
	}

	return {
		get submitting() { return submitting; },
		set submitting(v: boolean) { submitting = v; },
		get localErrors() { return localErrors; },
		get localFormError() { return localFormError; },
		clearError,
		focusFirstError
	};
}
