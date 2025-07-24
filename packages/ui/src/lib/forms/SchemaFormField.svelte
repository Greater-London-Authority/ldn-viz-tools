<script lang="ts">
	import type { Component } from 'svelte';
	import { getContext } from 'svelte';
	import FormField from './elements/formField/FormField.svelte';
	import type {
		FormErrorStore,
		FormFieldProps,
		FormValueStore,
		SchemaFormFieldProps
	} from './types';

	const valueStore: FormValueStore = getContext('formValueStore');
	const errorStore: FormErrorStore = getContext('formErrorStore');

	interface Props {
		component?: Component | null | undefined;
		field: SchemaFormFieldProps;
	}

	let { component = null, field }: Props = $props();

	const setDefault = () => {
		if ($valueStore[field.name] !== undefined) {
			return;
		}

		if (field.defaultValue !== undefined) {
			$valueStore[field.name] = field.defaultValue;
			return;
		}

		if (field.type === 'checkbox') {
			$valueStore[field.name] = false;
			return;
		}

		$valueStore[field.name] = '';
	};

	setDefault();

	let fieldProps: FormFieldProps = $derived.by(() => {
		const props = structuredClone(field);
		delete props.exclude;
		delete props.defaultValue;
		return props as FormFieldProps;
	});
</script>

{#if field.exclude}
	<!-- Render nothing! -->
{:else if component}
	{@const SvelteComponent = component}
	<SvelteComponent
		{...fieldProps}
		bind:value={$valueStore[field.name]}
		bind:error={$errorStore[field.name]}
	/>
{:else}
	<FormField {...fieldProps} />
{/if}
