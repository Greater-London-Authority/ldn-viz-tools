<script lang="ts">
	// Test-only harness: exercises `bind:value` the same way the "Binding to value"
	// story does, so the resulting bound value can be asserted on via the DOM.
	import Select from './Select.svelte';

	type Option = { label: string; value: number };

	let {
		label = 'Label',
		options,
		value = $bindable<number | undefined>(undefined)
	}: { label?: string; options: Option[]; value?: number } = $props();
</script>

<Select {label} {options} bind:value />
<div data-testid="bound-value">{value}</div>
