<script lang="ts">
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import { classNames } from '../utils/classNames';
	import type { InputProps } from './types';

	interface InputWrapperProps extends InputProps {
		errorId?: string;
		descriptionId?: string;
	}

	let {
		label = '',
		id = undefined,
		descriptionId = undefined,
		description = '',
		descriptionAlignment = 'left',
		hint = '',
		hintLabel = undefined,
		errorId = undefined,
		error = '',
		disabled = false,
		optional = false,
		customOverlay = undefined,
		children
	}: InputWrapperProps = $props();

	let descriptionClass = $derived(
		classNames(
			error ? '!text-color-interactive-error' : '',
			disabled ? 'text-color-interactive-disabled' : '',
			descriptionAlignment === 'left' ? 'text-color-label-muted' : 'ml-auto text-color-label-muted',
			'text-sm'
		)
	);

	let labelClasses = $derived(
		classNames(
			error ? 'text-color-interactive-error' : '',
			disabled ? 'text-color-interactive-disabled' : '',
			'form-label'
		)
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
			<Overlay>
				{#snippet trigger(props)}
					<Trigger {...props} size="xs" {hintLabel} />
				{/snippet}
				{hint}
			</Overlay>
		{/if}

		{#if customOverlay}
			{@render customOverlay()}
		{/if}
	</div>

	{@render children?.()}

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
