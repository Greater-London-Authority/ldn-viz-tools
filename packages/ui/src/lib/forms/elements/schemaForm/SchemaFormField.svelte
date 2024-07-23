<script lang="ts">
	import { getContext } from 'svelte';
	import FormField from '../formField/FormField.svelte';

	const valueStore = getContext('formValueStore');
	const errorStore = getContext('formErrorStore');

	export let component = null;
	export let field;

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

	let inputProps;

	$: {
		inputProps = structuredClone(field);
		delete inputProps.exclude;
		delete inputProps.defaultValue;
	}
</script>

{#if field.exclude}
	<!-- Render nothing! -->
{:else if component}
	<svelte:component
		this={component}
		{...inputProps}
		bind:value={$valueStore[field.name]}
		bind:error={$errorStore[field.name]}
	/>
{:else}
	<FormField {...inputProps} />
{/if}
