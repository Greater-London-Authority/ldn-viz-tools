<script lang="ts">
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { classNames } from '../utils/classNames';

	export let label = '';
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';

	export let hint = false;
	export let hintLabel = 'what is this?';
	export let hintTooltipContent = 'A brief contextual help text';

	export let error = false;
	export let errorMessage = '';
	export let disabled = false;
	export let optional = false;

	// TODO: hint below?
	// prefix and suffix slots

	export let id: string;

	//const id = crypto.randomUUID() ;

	let descriptionClass: string;

	$: descriptionClass = classNames(
		error ? 'text-core-red-400 dark:text-core-red-400' : '',
		descriptionAlignment === 'left'
			? 'text-core-grey-500 dark:text-core-grey-200'
			: 'ml-auto text-core-grey-400 dark:text-core-grey-300',
		'text-sm'
	);

	$: labelClasses = classNames(
		error ? 'text-core-red-400 dark:text-core-red-400' : '',
		disabled ? 'text-core-grey-300 dark:text-core-grey-400' : '',
		'form-label'
	);
</script>

<div class="flex flex-col space-y-2">
	<div class="flex justify-between">
		{#if label}
			<label for={id} class={labelClasses}>
				{label}{#if optional}&nbsp;(optional){/if}
			</label>
		{/if}

		{#if hint}
			<Tooltip {hintLabel}>
				{hintTooltipContent}
			</Tooltip>
		{/if}
	</div>

	<slot {id} />

	{#if description && !errorMessage}
		<span class={descriptionClass}>{description}</span>
	{:else if errorMessage}
		<span class={descriptionClass}>{errorMessage}</span>
	{/if}
</div>

