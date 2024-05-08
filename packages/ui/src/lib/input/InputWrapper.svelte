<script lang="ts">
	import { Tooltip } from '@ldn-viz/ui';
	import { classNames } from '../utils/classNames';

	export let label = '';
	export let id: string;

	export let discriptionId: string;
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';

	export let hintLabel = '';
	export let hint = '';

	export let errorId: string;
	export let error = '';

	export let disabled = false;
	export let optional = false;

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
		'form-label',
		'font-medium'
	);
</script>

<div class="flex flex-col space-y-2">
	<div class="flex justify-between [&>div]:text-sm">
		{#if label}
			<label for={id} class={labelClasses}>
				{@html label}{#if optional}&nbsp;(optional){/if}
			</label>
		{/if}

		{#if hint}
			<Tooltip {hintLabel}>
				{hint}
			</Tooltip>
		{/if}
	</div>

	<slot />

	{#if error}
		<span class={descriptionClass} id={errorId}>
			{@html error}
		</span>
	{:else if description}
		<span class={descriptionClass} id={discriptionId}>
			{@html description}
		</span>
	{/if}
</div>
