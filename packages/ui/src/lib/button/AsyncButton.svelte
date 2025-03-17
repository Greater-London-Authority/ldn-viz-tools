<script lang="ts" context="module">
	/**
	 * The `<AsyncButton>` component wraps the `<button>` component for slow
	 * asynchronous operations such as _HTTP_ requests. A `<LoadingIndicator>` is shown
	 * as the button label while the `onClick` function is executing. The button
	 * is also disabled during this period.
	 *
	 * @component
	 */

	export type FormButtonhandler = (event: MouseEvent | TouchEvent) => void | Promise<unknown>;

	const getSpinnerColorClasses = (emphasis: string): string => {
		const colorClasses = {
			primary: 'stroke-color-ui-primary',
			secondary: 'stroke-color-ui-primary',
			positive: 'stroke-color-ui-positive',
			negative: 'stroke-color-ui-negative',
			caution: 'stroke-color-ui-caution'
		};

		return colorClasses[emphasis as keyof typeof colorClasses];
	};

	const getDynamicSpinnerClasses = (size: string, variant: string): string => {
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
</script>

<script lang="ts">
	import Button from '../button/Button.svelte';
	import LoadingIndicator from '../loadingIndicator/LoadingIndicator.svelte';
	import type { ButtonProps } from './Button.svelte';

	export let onClick: FormButtonhandler;

	/**
	 * Is set to `true` when the `onClick` function is being executed.
	 *
	 * Bind to this property for reactive updates to button click state.
	 */
	export let working = false;

	/**
	 * If `submit`, then this is a submit button for use with a form.
	 */
	export let type: ButtonProps['type'] = 'button';

	/**
	 * Determines the visual emphasis is placed on the button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'primary';

	/**
	 * Selects which family of styles should be applied to the button.
	 */
	export let variant: ButtonProps['variant'] = 'solid';

	/**
	 * Sets the size of the button.
	 */
	export let size: ButtonProps['size'] = 'md';

	/**
	 * If `true`, then the button cannot be interacted with (either by clicking,
	 * or by using the keyboard).
	 */
	export let disabled: ButtonProps['disabled'] = false;

	/**
	 * Describes the state change (i.e. appearance of Spinner or icon while loading) for screen reader users.
	 */
	export let title = 'Loading';

	$: spinnerColorClasses = getSpinnerColorClasses(emphasis);
	$: dynamicSpinnerClasses = getDynamicSpinnerClasses(size, variant);

	const doClick: FormButtonhandler = async (event) => {
		if (working) {
			return;
		}

		working = true;

		try {
			await onClick(event);
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
		on:click={doClick}
		on:change
		on:keydown
		on:keyup
		on:touchstart
		on:touchend
		on:touchcancel
		on:mouseenter
		on:mouseleave
		{...$$restProps}
	>
		{#if working}
			<div class="relative">
				<LoadingIndicator
					{title}
					arcColorClass={spinnerColorClasses}
					class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-50 left-50 {dynamicSpinnerClasses}"
				/>
				<!-- This gives the outer div the correct size so the spinner is centered -->
				<span class="invisible">
					<!-- Button label and/or icon. -->
					<slot />
				</span>
			</div>
		{:else}
			<slot />
		{/if}
	</Button>
</div>
