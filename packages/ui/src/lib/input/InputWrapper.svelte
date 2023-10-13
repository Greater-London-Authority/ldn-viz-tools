<script lang="ts">
	import { InformationCircleIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { classNames } from '../utils/classNames';
	export let label = '';
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';
	export let tooltip = '';

	export let hintText = '';
	export let hintLabel = 'what is this?';

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
		error ? 'text-core-red-500' : '',
		descriptionAlignment === 'left'
			? 'text-core-grey-500 dark:text-core-grey-200'
			: 'ml-auto text-core-grey-400 dark:text-core-grey-300',
		'text-sm'
	);

	$: labelClasses = classNames(
		error ? 'text-core-red-500' : '',
		disabled ? 'text-core-grey-300 dark:core-grey-400' : '',
		'form-label'
	);
</script>

<div class="flex flex-col space-y-2">
	<div class="flex">
		{#if label}
			<label for={id} class={labelClasses}>
				{label}{#if optional}&nbsp;(optional){/if}
			</label>
		{/if}

		{#if hintText}
			<span
				title={hintText}
				class="flex items-center text-core-grey-400 dark:text-core-grey-300 ml-auto"
			>
				{hintLabel}
				<InformationCircleIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
			</span>
		{/if}
	</div>

	<slot {id} />

	{#if description && !errorMessage}
		<span class={descriptionClass}>{description}</span>
	{:else if errorMessage}
		<span class={descriptionClass}>{errorMessage}</span>
	{/if}
</div>
