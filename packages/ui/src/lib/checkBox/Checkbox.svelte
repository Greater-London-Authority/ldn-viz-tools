<script lang="ts">
	export let color: string | undefined = undefined;
	export let checked = false;
	export let label: string;
	export let id: string;

	export let disabled = false;

	let inputID = `input-${id}`;
</script>

<label class="flex items-center">
	<input
		id={inputID}
		class="form-checkbox"
		type="checkbox"
		bind:checked
		{disabled}
		style={color
			? `--border-color: ${color}; --background-color: ${color}; --tw-ring-color: ${color}`
			: ''}
	/>
	<span class="mx-2 form-label">{label}</span>
</label>

{#if color}
	<style>
		.form-checkbox,
		.dark .form-checkbox {
			color: var(--border-color);
			border-color: var(--border-color);
			border-width: 2px;
		}

		.dark .form-checkbox:checked {
			background-color: var(--background-color);
		}

		.form-checkbox:disabled {
			@apply border-core-grey-300 cursor-not-allowed;
		}
	</style>
{/if}
