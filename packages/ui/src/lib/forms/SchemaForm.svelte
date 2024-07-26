<script lang="ts">
	/**
	 * The `<SchemaForm>` component generates a form from an object describing its fields (the *schema*).
	 * @component
	 */
	import Form from './Form.svelte';
	import SchemaFormField from './SchemaFormField.svelte';
	import type {
		FormValues,
		FormErrors,
		FormValueStore,
		FormErrorStore,
		FormHasErrors,
		FormActiveButtonStore,
		SchemaFormFieldProps,
		SchemaFormCustomTypes
	} from './types';

	/**
	 * The `id` of the form: defaults to a randomly-generated value.
	 */
	export let id: string | undefined = undefined;

	/**
	 * Name of the form (must be unique in the document).
	 */
	export let name: string | undefined = undefined;

	/**
	 * Title or heading displayed at the top of the form in large font. Ignored
	 * if the `title` slot is used.
	 */
	export let title: string | undefined = '';

	/**
	 * Description or instructions displayed underneath the title but before
	 * the fields. Ignored if the `description` slot is used.
	 */
	export let description: string | undefined = '';

	/**
	 * Array of objects each containing the properties for a single form field.
	 *
	 * In addition, two extra properties can be set:
	 * - `exclude` (boolean) If `true`, does not render the field.
	 * - `defaultValue` (any) The value to be used if no value is found within `initialValues`.
	 */
	export let fields: SchemaFormFieldProps[] = [];

	/**
	 * An object containing type-to-component mappings of custom inputs. An
	 * existing type may be specified to override what `<FormField>` would
	 * usually render.
	 */
	export let customTypes: SchemaFormCustomTypes = {};

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
	export let valueStore: FormValueStore | undefined;

	/**
	 * Svelte store holding the field errors as an object. The key for each
	 * entry is a field name. Its value is null, undefined, or an empty
	 * string if there is no error and a non-empty string if there is.
	 */
	export let errorStore: FormErrorStore | undefined;

	/**
	 * Svelte store holding the name of the currently active async button.
	 * With this the user dev can disable, hide, or show content while a
	 * long-running asynchronous activity is in progress (e.g. submission).
	 */
	export let activeButtonStore: FormActiveButtonStore | undefined = undefined;

	/**
	 * Function that when called returns `true` if there are any errors in
	 * the `errorStore`.
	 */
	export let hasErrors: FormHasErrors | undefined = undefined;
</script>

<Form
	{id}
	{name}
	{initialValues}
	{initialErrors}
	bind:valueStore
	bind:errorStore
	bind:hasErrors
	bind:activeButtonStore
	{...$$restProps}
>
	<!--
		Title or heading displayed at the top of the form.
		By default, uses `h1` element containing the `title` property.
	-->
	<slot name="title">
		{#if title}
			<h1 class="text-lg font-bold">
				{title}
			</h1>
		{/if}
	</slot>

	<!--
		Description or instructions displayed underneath the title but before
		the fields. By default, uses `p` element containing the `description`
		property.
	-->
	<slot name="description">
		{#if description}
			<p>{@html description}</p>
		{/if}
	</slot>

	{#each fields as field (field.name)}
		<SchemaFormField component={customTypes[field.type]} {field} />
	{/each}

	<!--
		Any buttons to be positioned on the bottom-left of the form
		(e.g. back button).
	-->
	<slot slot="leftButtons" name="leftButtons" />

	<!--
		Any buttons to be positioned on the bottom-right of the form
		(e.g. submit button).
	-->
	<slot slot="rightButtons" name="rightButtons" />
</Form>
