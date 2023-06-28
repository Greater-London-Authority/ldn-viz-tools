<script lang="ts">
	export let color: string | undefined = undefined;
	export let selectedId = '';
	export let label: string;
	export let id: string;
	export let name: string | undefined;

	export let disabled = false;

	let inputID = `input-${id}`;
</script>

<label class="flex items-center">
	<input
		id={inputID}
		class="form-radio"
		type="radio"
		bind:group={selectedId}
		{name}
		value={id}
		{disabled}
		style={color
			? `--border-color: ${color}; --background-color: ${color}; --tw-ring-color: ${color}`
			: ''}
	/>
	<span class="form-label mx-2">{label}</span>
</label>

{#if color}
	<style>
		.form-radio,
		.dark .form-radio {
			color: var(--border-color);
			border-color: var(--border-color);
			border-width: 2px;
		}

		.dark .form-radio:checked {
			background-color: var(--background-color);
		}

		.form-radio:disabled {
			@apply border-core-grey-300 cursor-not-allowed;
		}
	</style>
{/if}
