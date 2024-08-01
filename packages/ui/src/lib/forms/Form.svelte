<script lang="ts">
	/**
	 * The `<Form>` component wraps the `<form>` element to provide standard
	 * styling and an easy to use mechanism for accessing and setting
	 * values and errors on fields.
	 *
	 * The `<FormField>` component is designed to make adding fields easier by
	 * managing each field's value and error, and binding it to the `<Form>`'s
	 * `valueStore` and `errorStore` (which it receives as context).
	 * Users can slot in custom user input components or elements but they will
	 * need to manually bind the `value` and `error` properties to the form's
	 * `valueStore` and `errorStore`.
	 * @component
	 */

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type {
		FormValues,
		FormErrors,
		FormValueStore,
		FormErrorStore,
		FormActiveButtonStore
	} from './types';

	/**
	 * The `id` of the form: defaults to a randomly-generated value.
	 */
	export let id: string | undefined = undefined;

	/**
	 * Optional name of the form (must be unique in the document).
	 */
	export let name: string | undefined = undefined;

	/**
	 * Initial values to populate form fields with.
	 */
	export let initialValues: FormValues = {};

	/**
	 * Initial errors to populate form fields with.
	 */
	export let initialErrors: FormErrors = {};

	/**
	 * Svelte store holding the field values as an object. The key for each
	 * entry is a field name and its value is the field's value.
	 */
	export const valueStore: FormValueStore = writable(structuredClone(initialValues));

	/**
	 * Svelte store holding the field errors as an object. The key for each
	 * entry is a field name. Its value is `null`, `undefined`, or an empty
	 * string (`''`) if there is no error, and a non-empty string if there is.
	 */
	export const errorStore: FormErrorStore = writable(structuredClone(initialErrors));

	/**
	 * Svelte store holding the name of the currently active async button.
	 * With this the user dev can disable, hide, or show content while a
	 * long-running asynchronous activity is in progress (e.g. submission).
	 */
	export const activeButtonStore: FormActiveButtonStore = writable('');

	/**
	 * Function that when called returns `true` if there are any errors in
	 * the `errorStore`.
	 */
	export const hasErrors = () => {
		return !!Object.values($errorStore).find((err) => !!err);
	};

	setContext('formValueStore', valueStore);
	setContext('formErrorStore', errorStore);
	setContext('formHasErrors', hasErrors);
	setContext('formActiveButtonStore', activeButtonStore);
</script>

<form {id} {name} class="w-full space-y-8" {...$$restProps}>
	{#if $$slots.default}
		<div class="flex flex-col gap-4">
			<!-- Form fields and other main content elements. -->
			<slot />
		</div>
	{/if}

	{#if $$slots.leftButtons || $$slots.rightButtons}
		<div class="w-full flex justify-between">
			<!--
				Any buttons to be positioned on the bottom-left of the form
				(e.g. back button).
			-->
			<slot name="leftButtons" />
			<div class="ml-auto">
				<!--
					Any buttons to be positioned on the bottom-right of the form
					(e.g. submit button).
				-->
				<slot name="rightButtons" />
			</div>
		</div>
	{/if}
</form>
