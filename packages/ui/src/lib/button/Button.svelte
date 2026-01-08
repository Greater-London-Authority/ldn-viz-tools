<script lang="ts">
	import { classNames } from '../utils/classNames.js';
	import type { ButtonProps } from './types.js';

	let {
		/**
		 * Selects which family of styles should be applied to the button.
		 */
		variant = 'solid',

		/**
		 * Determines the visual emphasis is placed on the button.
		 */
		emphasis = 'primary',

		/**
		 * Sets the size of the button.
		 */
		size = 'md',

		/**
		 * When true removes vertical padding and sets line height to 0 - useful for aligning buttons with text.
		 */
		slim = false,

		/**
		 * If `true`, then the button cannot be interacted with (either by clicking, or by using the keyboard).
		 */
		disabled = false,

		/**
		 * If this is set, the button is a link with the specified target.
		 */
		href = '',

		/**
		 * If `submit`, then this is a submit button for use with a form.
		 */
		type = 'button',

		/** Text that appears in tooltip on hover, */
		title = '',

		/**
		 * If `true`, then button will fill full width of parent.
		 */
		fullWidth = false,

		/**
		 * Css classes passed to override defaults - may need !prefix.
		 */
		class: classes,

		/**
		 * *$bindable* The underlying DOM element being rendered. You can bind to this to get a reference to the element.
		 */
		ref = $bindable(null),
		children,
		...restProps
	}: ButtonProps = $props();

	const styleClasses = {
		solid: {
			primary:
				'bg-color-action-background-primary text-color-static-white hover:bg-color-action-background-primary-hover active:bg-color-action-background-primary-active dark:hover:text-color-text-inverse-primary',
			secondary:
				'bg-color-action-background-secondary text-color-static-white hover:bg-color-action-background-secondary-hover active:bg-color-action-background-secondary-active dark:hover:text-color-text-inverse-primary',
			positive:
				'bg-color-action-background-positive text-color-static-white hover:bg-color-action-background-positive-hover focus:ring-color-action-positive-focussed active:bg-color-action-background-positive-active dark:text-color-text-inverse-primary',
			negative:
				'bg-color-action-background-negative text-color-static-white hover:bg-color-action-background-negative-hover focus:ring-color-action-negative-focussed active:bg-color-action-background-negative-active dark:text-color-text-inverse-primary',
			caution:
				'bg-color-action-background-caution text-color-static-white hover:bg-color-action-background-caution-hover focus:ring-color-action-caution-focussed active:bg-color-action-background-caution-active dark:text-color-text-inverse-primary'
		},
		square: {
			primary:
				'bg-color-action-background-primary text-color-static-white hover:bg-color-action-background-primary-hover active:bg-color-action-background-primary-active dark:hover:text-color-text-inverse-primary',
			secondary:
				'bg-color-action-background-secondary text-color-static-white hover:bg-color-action-background-secondary-hover active:bg-color-action-background-secondary-active dark:hover:text-color-text-inverse-primary',
			positive:
				'bg-color-action-background-positive text-color-static-white hover:bg-color-action-background-positive-hover focus:ring-color-action-positive-focussed active:bg-color-action-background-positive-active dark:text-color-text-inverse-primary',
			negative:
				'bg-color-action-background-negative text-color-static-white hover:bg-color-action-background-negative-hover focus:ring-color-action-negative-focussed active:bg-color-action-background-negative-active dark:text-color-text-inverse-primary',
			caution:
				'bg-color-action-background-caution text-color-static-white hover:bg-color-action-background-caution-hover focus:ring-color-action-caution-focussed active:bg-color-action-background-caution-active dark:text-color-text-inverse-primary'
		},
		outline: {
			primary:
				'bg-transparent text-color-text-primary border px-2 pt-1 pb-1 border-color-action-border-primary hover:bg-color-action-background-primary-muted-hover hover:underline active:bg-color-action-background-primary-muted-active',
			secondary:
				'bg-transparent text-color-text-primary border px-2 pt-1 pb-1 border-color-action-border-secondary hover:bg-color-action-secondary-muted-hover hover:underline active:bg-color-action-secondary-muted-active',
			positive:
				'bg-transparent text-color-text-primary border px-2 pt-1 pb-1 border-color-action-border-positive hover:bg-color-action-background-positive-muted-hover hover:underline active:bg-color-action-background-positive-muted-active',
			negative:
				'bg-transparent text-color-text-primary border px-2 pt-1 pb-1 border-color-action-border-negative hover:bg-color-action-background-negative-muted-hover hover:underline active:bg-color-action-background-negative-muted-active',
			caution:
				'bg-transparent text-color-text-primary border px-2 pt-1 pb-1 border-color-action-border-caution hover:bg-color-action-background-caution-muted-hover hover:underline active:bg-color-action-background-caution-muted-active'
		},
		text: {
			primary:
				'bg-transparent text-color-action-text-primary underline hover:text-color-action-text-primary-hover hover:no-underline active:text-color-action-text-primary-active',
			secondary:
				'bg-transparent text-color-action-text-secondary underline hover:text-color-action-text-secondary-hover hover:no-underline active:text-color-action-text-secondary-active',
			positive:
				'bg-transparent text-color-action-positive underline hover:text-color-action-positive-hover hover:no-underline active:text-color-action-text-positive-active',
			negative:
				'bg-transparent text-color-action-negative underline hover:text-color-action-negative-hover hover:no-underline active:text-color-action-text-negative-active',
			caution:
				'bg-transparent text-color-action-caution underline hover:text-color-action-caution-hover hover:no-underline active:text-color-action-text-caution-active'
		},
		brand: {
			primary:
				'bg-color-ui-background-inverse-primary text-color-text-inverse-primary border-b-4 border-color-static-brand hover:bg-color-action-background-primary-hover active:bg-color-action-background-primary-active',
			secondary:
				'bg-color-ui-background-secondary text-color-text-primary border-b-4 border-color-static-brand hover:bg-color-action-background-secondary-hover active:bg-color-action-background-secondary-active hover:text-color-text-inverse-primary',
			positive:
				'bg-color-action-background-positive text-color-static-white border-b-4 border-color-static-brand hover:bg-color-action-background-positive-hover focus:ring-color-action-positive-focussed active:bg-color-action-background-positive-active dark:text-color-text-inverse-primary',
			negative:
				'bg-color-action-background-negative text-color-static-white  border-b-4 border-color-static-brand hover:bg-color-action-background-negative-hover focus:ring-color-action-negative-focussed active:bg-color-action-background-negative-active dark:text-color-text-inverse-primary',
			caution:
				'bg-color-action-background-caution text-color-static-white border-b-4 border-color-static-brand hover:bg-color-action-background-caution-hover focus:ring-color-action-caution-focussed active:bg-color-action-background-caution-active dark:text-color-text-inverse-primary'
		}
	};

	const disabledClasses = {
		brand:
			'!bg-color-action-background-disabled !border-color-action-border-disabled !text-color-action-disabled',
		square: '!bg-color-action-background-disabled !text-color-action-disabled',
		solid: '!bg-color-action-background-disabled !text-color-action-disabled',
		outline:
			'!bg-color-action-background-disabled !border-color-action-border-disabled !text-color-action-disabled',
		text: '!text-color-action-disabled hover:bg-transparent'
	};

	const sizeClasses = $derived({
		xs: variant === 'square' ? 'w-6 h-6 flex-col' : 'text-xs px-1 min-w-6 min-h-6',
		sm: variant === 'square' ? 'w-8 h-8 flex-col' : 'text-sm px-2 py-1.5 min-w-8 min-h-8',
		md: variant === 'square' ? 'w-10 h-10 flex-col' : 'text-base px-4 py-2 min-w-10 min-h-10',
		lg:
			variant === 'square'
				? 'w-16 h-16 text-xs flex-col space-y-4'
				: 'text-lg px-4 py-2 min-w-16 min-h-16'
	});

	const buttonClass = $derived(
		classNames(
			'inline-flex justify-center items-center disabled:cursor-not-allowed',
			'focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-offset-color-action-primary-focussed focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-color-ui-background-primary',
			styleClasses[variant][emphasis],
			sizeClasses[size],
			disabled === true ? disabledClasses[variant] : '',
			href && disabled === true ? 'pointer-events-none' : '',
			slim === true ? '!py-0 !px-0 !min-h-0 leading-none text-left text-nowrap' : '',
			classes ?? '',
			fullWidth ? 'w-full' : ''
		)
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={href ? undefined : disabled}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : 'button'}
	tabindex={href && disabled ? -1 : 0}
	{title}
	class={buttonClass}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
