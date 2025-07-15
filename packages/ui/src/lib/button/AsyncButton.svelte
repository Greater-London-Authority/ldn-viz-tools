<script lang="ts">
	import LoadingIndicator from '../loadingIndicator/LoadingIndicator.svelte';
	import Button from '../button/Button.svelte';
	import type { AsyncButtonProps } from './types.ts';

	let {
		children,
		onclick,
		working = $bindable(),
		emphasis,
		size,
		variant,
		disabled,
		type,
		...restProps
	}: AsyncButtonProps = $props();

	const getSpinnerColorClasses = (emphasis: AsyncButtonProps['emphasis']): string => {
		const colorClasses = {
			primary: 'stroke-color-ui-primary',
			secondary: 'stroke-color-ui-primary',
			positive: 'stroke-color-ui-positive',
			negative: 'stroke-color-ui-negative',
			caution: 'stroke-color-ui-caution'
		};

		return colorClasses[emphasis as keyof typeof colorClasses];
	};

	const getDynamicSpinnerClasses = (
		size: AsyncButtonProps['size'],
		variant: AsyncButtonProps['variant']
	): string => {
		switch (size) {
			case 'sm':
				return 'w-6 h-6 stroke-[10]';
			case 'md':
				return 'w-6 h-6 stroke-[10]';
			case 'lg':
				return variant === 'square' ? 'w-10 h-10 stroke-[10]' : 'w-8 h-8 stroke-[10]';
			default:
				return '';
		}
	};

	// /**
	//  * Is set to `true` when the `onClick` function is being executed.
	//  *
	//  * Bind to this property for reactive updates to button click state.
	//  */
	// export let working = false;

	// /**
	//  * If `submit`, then this is a submit button for use with a form.
	//  */
	// export let type: ButtonProps['type'] = 'button';

	// /**
	//  * Determines the visual emphasis is placed on the button.
	//  */
	// export let emphasis: ButtonProps['emphasis'] = 'primary';

	// /**
	//  * Selects which family of styles should be applied to the button.
	//  */
	// export let variant: ButtonProps['variant'] = 'solid';

	// /**
	//  * Sets the size of the button.
	//  */
	// export let size: ButtonProps['size'] = 'md';

	// /**
	//  * If `true`, then the button cannot be interacted with (either by clicking,
	//  * or by using the keyboard).
	//  */
	// export let disabled: ButtonProps['disabled'] = false;

	/**
	 * Describes the state change (i.e. appearance of Spinner or icon while loading) for screen reader users.
	 */
	let loadingTitle = 'Loading';

	let spinnerColorClasses = $derived(getSpinnerColorClasses(emphasis));
	let dynamicSpinnerClasses = $derived(getDynamicSpinnerClasses(size, variant));

	const doClick = async (
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
	) => {
		if (working) {
			return;
		}

		working = true;

		try {
			await onclick!(event);
		} catch (err) {
			console.error(err);
		} finally {
			working = false;
		}
	};
</script>

<div aria-live="polite" role="status" aria-busy={working}>
	<Button
		{type}
		{emphasis}
		{variant}
		{size}
		disabled={disabled || working}
		onclick={doClick}
		{...restProps}
	>
		{#if working}
			<div class="relative">
				<LoadingIndicator
					title={loadingTitle}
					arcColorClass={spinnerColorClasses}
					class="top-50 left-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform {dynamicSpinnerClasses}"
				/>
				<!-- This gives the outer div the correct size so the spinner is centered -->
				<span class="invisible">
					<!-- Button label and/or icon. -->
					{@render children?.()}
				</span>
			</div>
		{:else}
			{@render children?.()}
		{/if}
	</Button>
</div>
