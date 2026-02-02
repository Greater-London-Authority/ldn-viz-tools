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
				'bg-color-interactive-primary text-color-static-white hover:bg-color-interactive-primary-hover active:bg-color-interactive-primary-active dark:hover:text-color-inverse-text',
			secondary:
				'bg-color-interactive-secondary text-color-static-white hover:bg-color-interactive-secondary-hover active:bg-color-interactive-secondary-active dark:hover:text-color-inverse-text',
			positive:
				'bg-color-interactive-positive text-color-static-white hover:bg-color-interactive-positive-hover focus:ring-color-interactive-positive-focussed active:bg-color-interactive-positive-active dark:text-color-inverse-text',
			negative:
				'bg-color-interactive-negative text-color-static-white hover:bg-color-interactive-negative-hover focus:ring-color-interactive-negative-focussed active:bg-color-interactive-negative-active dark:text-color-inverse-text',
			caution:
				'bg-color-interactive-caution text-color-static-white hover:bg-color-interactive-caution-hover focus:ring-color-interactive-caution-focussed active:bg-color-interactive-caution-active dark:text-color-inverse-text'
		},
		square: {
			primary:
				'bg-color-interactive-primary text-color-static-white hover:bg-color-interactive-primary-hover active:bg-color-interactive-primary-active dark:hover:text-color-inverse-text',
			secondary:
				'bg-color-interactive-secondary text-color-static-white hover:bg-color-interactive-secondary-hover active:bg-color-interactive-secondary-active dark:hover:text-color-inverse-text',
			positive:
				'bg-color-interactive-positive text-color-static-white hover:bg-color-interactive-positive-hover focus:ring-color-interactive-positive-focussed active:bg-color-interactive-positive-active dark:text-color-inverse-text',
			negative:
				'bg-color-interactive-negative text-color-static-white hover:bg-color-interactive-negative-hover focus:ring-color-interactive-negative-focussed active:bg-color-interactive-negative-active dark:text-color-inverse-text',
			caution:
				'bg-color-interactive-caution text-color-static-white hover:bg-color-interactive-caution-hover focus:ring-color-interactive-caution-focussed active:bg-color-interactive-caution-active dark:text-color-inverse-text'
		},
		outline: {
			primary:
				'bg-transparent text-color-text border px-2 pt-1 pb-1 border-color-interactive-primary hover:bg-color-interactive-primary-muted-hover hover:underline active:bg-color-interactive-primary-muted-active',
			secondary:
				'bg-transparent text-color-text border px-2 pt-1 pb-1 border-color-interactive-secondary hover:bg-color-interactive-secondary-muted-hover hover:underline active:bg-color-interactive-secondary-muted-active',
			positive:
				'bg-transparent text-color-text border px-2 pt-1 pb-1 border-color-interactive-positive hover:bg-color-interactive-positive-muted-hover hover:underline active:bg-color-interactive-positive-muted-active',
			negative:
				'bg-transparent text-color-text border px-2 pt-1 pb-1 border-color-interactive-negative hover:bg-color-interactive-negative-muted-hover hover:underline active:bg-color-interactive-negative-muted-active',
			caution:
				'bg-transparent text-color-text border px-2 pt-1 pb-1 border-color-interactive-caution hover:bg-color-interactive-caution-muted-hover hover:underline active:bg-color-interactive-caution-muted-active'
		},
		text: {
			primary:
				'bg-transparent text-color-interactive-primary underline hover:text-color-interactive-primary-hover hover:no-underline active:text-color-interactive-primary-active',
			secondary:
				'bg-transparent text-color-text-muted underline hover:text-color-interactive-secondary-hover hover:no-underline active:text-color-interactive-secondary-active',
			positive:
				'bg-transparent text-color-interactive-positive underline hover:text-color-interactive-positive-hover hover:no-underline active:text-color-interactive-positive-active',
			negative:
				'bg-transparent text-color-interactive-negative underline hover:text-color-interactive-negative-hover hover:no-underline active:text-color-interactive-negative-active',
			caution:
				'bg-transparent text-color-interactive-caution underline hover:text-color-interactive-caution-hover hover:no-underline active:text-color-interactive-caution-active'
		},
		brand: {
			primary:
				'bg-color-inverse-surface text-color-inverse-text border-b-4 border-color-static-brand hover:bg-color-interactive-primary-hover active:bg-color-interactive-primary-active',
			secondary:
				'bg-color-surface-muted text-color-text border-b-4 border-color-static-brand hover:bg-color-interactive-secondary-hover active:bg-color-interactive-secondary-active hover:text-color-inverse-text',
			positive:
				'bg-color-interactive-positive text-color-static-white border-b-4 border-color-static-brand hover:bg-color-interactive-positive-hover focus:ring-color-interactive-positive-focussed active:bg-color-interactive-positive-active dark:text-color-inverse-text',
			negative:
				'bg-color-interactive-negative text-color-static-white  border-b-4 border-color-static-brand hover:bg-color-interactive-negative-hover focus:ring-color-interactive-negative-focussed active:bg-color-interactive-negative-active dark:text-color-inverse-text',
			caution:
				'bg-color-interactive-caution text-color-static-white border-b-4 border-color-static-brand hover:bg-color-interactive-caution-hover focus:ring-color-interactive-caution-focussed active:bg-color-interactive-caution-active dark:text-color-inverse-text'
		}
	};

	const disabledClasses = {
		brand:
			'!bg-color-interactive-disabled-muted !border-color-interactive-disabled-muted !text-color-interactive-disabled',
		square: '!bg-color-interactive-disabled-muted !text-color-interactive-disabled',
		solid: '!bg-color-interactive-disabled-muted !text-color-interactive-disabled',
		outline:
			'!bg-color-interactive-disabled-muted !border-color-interactive-disabled-muted !text-color-interactive-disabled',
		text: '!text-color-interactive-disabled hover:bg-transparent'
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
			'focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-offset-color-interactive-primary-focussed focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-color-surface',
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
