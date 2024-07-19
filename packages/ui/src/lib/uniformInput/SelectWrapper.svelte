<script lang="ts">
	import { onMount } from 'svelte';
	import Select from '../select/Select.svelte';
	import type { UniformInputProps } from './types';

	export let value: UniformInputProps['value'] = '';
	export let error: UniformInputProps['error'] = '';
	export let options: UniformInputProps['options'] = [];

	let selectedValue: UniformInputProps['value'];
	let init = false;

	const updateValue = () => {
		if (init && value !== selectedValue) {
			value = selectedValue || '';
		}
	};

	const updateSelectedValue = () => {
		if (value !== selectedValue) {
			selectedValue = value || '';
		}
	};

	onMount(() => (init = true));

	$: updateSelectedValue(value);
	$: updateValue(selectedValue);
</script>

{#if init}
	<Select bind:justValue={selectedValue} bind:error items={options} {...$$restProps} />
{/if}
