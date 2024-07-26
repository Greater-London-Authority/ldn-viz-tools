<script lang="ts">
	import { getContext } from 'svelte';
	import FormField from './elements/formField/FormField.svelte';
	import type { ComponentType } from 'svelte';
	import type {
		SchemaFormFieldProps,
		FormFieldProps,
		FormValueStore,
		FormErrorStore
	} from './types';

	const valueStore: FormValueStore = getContext('formValueStore');
	const errorStore: FormErrorStore = getContext('formErrorStore');

	export let component: ComponentType | null | undefined = null;
	export let field: SchemaFormFieldProps;

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

	let fieldProps: FormFieldProps;

	$: {
		const props = structuredClone(field);
		delete props.exclude;
		delete props.defaultValue;
		fieldProps = props as FormFieldProps;
	}
</script>

{#if field.exclude}
	<!-- Render nothing! -->
{:else if component}
	<svelte:component
		this={component}
		{...fieldProps}
		bind:value={$valueStore[field.name]}
		bind:error={$errorStore[field.name]}
	/>
{:else}
	<FormField {...fieldProps} />
{/if}
