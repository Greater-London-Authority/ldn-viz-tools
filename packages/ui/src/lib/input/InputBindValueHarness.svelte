<script lang="ts">
	// Test-only harness: exercises `bind:value` the same way the "Binding on value"
	// story does, so the resulting bound value can be asserted on via the DOM.
	import Input from './Input.svelte';

	let { label = 'Label', value = $bindable('') }: { label?: string; value?: string } = $props();
</script>

<Input {label} name="bind-value-input" bind:value />
<div data-testid="bound-value">{value}</div>
