<script lang="ts">
	/**
	 * The `RadioButtonGroupSolid` component contains a set of `RadioButtonSolid` buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation).
	 * @component
	 */

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import RadioButtonSolid from './RadioButtonSolid.svelte';

	/**
	 * the `id` of the entry in the `options` array that is currently selected.
	 */
	export let selectedId = '';

	/**
	 * the `name` assiged to the group of radio buttons.
	 */
	export let name: string;

	/**
	 * Each element of this array defines a radio button, and is an object with the properties:
	 * * `id` (string)
	 * * `label` (string) - the text displayed within the button
	 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
	 */

	export let options: {
		id: string;
		label: string;
		disabled?: boolean;
	}[] = [];

	const val: Writable<string> = writable(selectedId);
	val.subscribe((newVal) => (selectedId = newVal));

	setContext('selectedId', {
		selectedId: val
	});

	$: {
		// update Id of store when Id of prop changes
		$val = selectedId;
	}
</script>

<div class="flex">
	{#if options.length}
		{#each options as option}
			<RadioButtonSolid id={option.id} label={option.label} disabled={option.disabled} {name} />
		{/each}
	{:else}
		<slot />
	{/if}
</div>
