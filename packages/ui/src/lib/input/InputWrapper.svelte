<script lang="ts">
	import Overlay from '../overlay/Overlay.svelte';
	import { classNames } from '../utils/classNames';

	export let label = '';
	export let id: undefined | string = undefined;

	export let descriptionId: undefined | string = undefined;
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';

	export let hint = '';
	export let hintLabel: undefined | string = undefined;

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

		{#if $$slots.hint}
			<!-- An optional `<Overlay>` component to provide additional explanation. -->
			<slot name="hint" />
		{/if}
		{#if hint}
			<Overlay {hintLabel}>
				{hint}
			</Overlay>
		{/if}
	</div>

	<slot />

	{#if error}
		<p class={descriptionClass} id={errorId} role="alert">
			<span class="sr-only">Error: </span>
			{@html error}
		</p>
	{:else if description}
		<p class={descriptionClass} id={descriptionId}>
			{@html description}
		</p>
	{/if}
</div>
