<script lang="ts">
	import Overlay from '../overlay/Overlay.svelte';
	import { classNames } from '../utils/classNames';

	export let label = '';
	export let id: undefined | string = undefined;

	export let descriptionId: undefined | string = undefined;
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';

	/**
	 * Props pased to overlay/ hint
	 */
	export let hint = '';
	export let hintLabel = '';
	export let overlayType: 'tooltip' | 'popover' | 'modal' = 'tooltip';
	export let modalTitle: string | undefined = undefined;
	export let modalDescription: string | undefined = undefined;
	export let modalWidth:
		| 'sm'
		| 'md'
		| 'lg'
		| 'xs'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| 'full'
		| undefined = undefined;

	export let errorId: undefined | string = undefined;
	export let error = '';

	export let disabled = false;
	export let optional = false;

	$: descriptionClass = classNames(
		error ? '!text-color-input-label-error' : '',
		disabled ? 'text-color-input-label-disabled' : '',
		descriptionAlignment === 'left'
			? 'text-color-input-label-secondary'
			: 'ml-auto text-color-input-label-secondary',
		'text-sm'
	);

	$: labelClasses = classNames(
		error ? 'text-color-input-label-error' : '',
		disabled ? 'text-color-input-label-disabled' : '',
		'form-label'
	);
</script>

<div class="flex flex-col space-y-1">
	<div class="flex justify-between [&>div]:text-sm">
		{#if label}
			<label for={id} class={labelClasses}>
				{@html label}{#if optional}&nbsp;(optional){/if}
			</label>
		{/if}

		{#if hint}
			<Overlay {hintLabel} {overlayType} {modalTitle} {modalDescription} {modalWidth}>
				{hint}
			</Overlay>
		{/if}
	</div>

	<slot />

	{#if error}
		<span class={descriptionClass} id={errorId}>
			{@html error}
		</span>
	{:else if description}
		<span class={descriptionClass} id={descriptionId}>
			{@html description}
		</span>
	{/if}
</div>
