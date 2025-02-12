<script context="module" lang="ts">
	/**
	 * The `<Button>` component creates an HTML `<button>` (or, if the `href` prop is set, an `<a>`) element.
	 * Using it rather than the HTML element directly ensures that the button is styled consistently with our style-guide.
	 * 
	 * **Alternatives**: if clicking on the button should trigger the download of data or an image, consider using the [DataDownloadButton](./?path=/docs/ui-components-buttons-datadownloadbutton--documentation) or [ImageDownloadButton](./?path=/docs/ui-components-buttons-imagedownloadbutton--documentation) components.
	 * If the button is intended to copy text to the clipboard, consider using the [CopyButton](./?path=/docs/ui-components-buttons-copybutton--documentation).
	 * If the button is intended as a link for navigation, consider using the [PlacardButton](./?path=/docs/ui-components-buttons-placardbutton--documentation).

	 * @component
	 */

	export interface ButtonProps {
		variant: 'brand' | 'square' | 'solid' | 'outline' | 'text';
		emphasis: 'primary' | 'secondary' | 'caution' | 'positive' | 'negative';
		size: 'xs' | 'sm' | 'md' | 'lg';
		disabled: boolean;
		href: string;
		openInNewTab: boolean;
		type: 'button' | 'submit';
		title: string;
		slim: boolean;
		role: string;
		tabindex: number;
		ariaControls: string | undefined;
		ariaSelected: boolean | undefined;
		action: (node: HTMLElement) => void;
	}

	type ButtonStyle = Record<ButtonProps['variant'], Record<ButtonProps['emphasis'], string>>;

	type DisabledStyle = Record<ButtonProps['variant'], string>;
</script>

<script lang="ts">
	/**
	 * Selects which family of styles should be applied to the button.
	 */
	export let variant: ButtonProps['variant'] = 'solid';

	/**
	 * Determines the visual emphasis is placed on the button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'primary';

	/**
	 * Sets the size of the button.
	 */
	export let size: ButtonProps['size'] = 'md';

	/**
	 * When true removes vertical padding and sets line height to 0 - useful for aligning buttons with text.
	 */
	export let slim: ButtonProps['slim'] = false;

	/**
	 * If `true`, then the button cannot be interacted with (either by clicking, or by using the keyboard).
	 */
	export let disabled: ButtonProps['disabled'] = false;

	/**
	 * If this is set, the button is a link with the specified target.
	 */
	export let href: ButtonProps['href'] = '';

	/**
	 * Allows overriding default by `Tab` component
	 */
	export let role: ButtonProps['role'] = 'button';

	/**
	 * Allows overriding default by `Tab` component
	 */
	export let tabindex: ButtonProps['tabindex'] = 0;

	/**
	 * Allows connection between Tab and section it controls for screen reader
	 */
	export let ariaControls: ButtonProps['ariaControls'] = undefined;

	/**
	 * Used in `Tab` component to tell screen reader which tab is selected
	 */
	export let ariaSelected: ButtonProps['ariaSelected'] = undefined;

	/**
	 * If `true`, then clicking the button will open the link target in a new tab. Has no effect if `href` is not set.
	 */
	export let openInNewTab = false;

	/**
	 * If `submit`, then this is a submit button for use with a form.
	 */
	export let type: ButtonProps['type'] = 'button';

	/** Text that appears in tooltip on hover, */
	export let title: ButtonProps['title'] = '';

	/**
	 * Custom button action, e.g. mouse/key events.
	 * Primarily used by components using Melt UI triggers.
	 */
	export let action: ButtonProps['action'] = () => {};

	/**
	 * Custom action props such as ARIA attributes and tabindex.
	 * Primarily used by components using Melt UI
	 */
	export let actionProps = {};

	/**
	 * Enables screen reader to describe contents of button
	 */
	export let ariaLabel: string | null = null;

	/**
	 * Value set as the `id` attribute of the `<svelte:element>` element (defaults to randomly generated value).
	 */
	export let id = randomId();

	/**
	 * If `true`, then button will fill full width of parent.
	 */
	export let fullWidth = false;

	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	const styleClasses: ButtonStyle = {
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

	const disabledClasses: DisabledStyle = {
		brand:
			'!bg-color-action-background-disabled !border-color-action-border-disabled !text-color-action-disabled',
		square: '!bg-color-action-background-disabled !text-color-action-disabled',
		solid: '!bg-color-action-background-disabled !text-color-action-disabled',
		outline:
			'!bg-color-action-background-disabled !border-color-action-border-disabled !text-color-action-disabled',
		text: '!text-color-action-disabled hover:bg-transparent'
	};

	$: sizeClasses = {
		xs: variant === 'square' ? 'w-6 h-6 flex-col' : 'text-xs px-1 min-w-6 min-h-6',
		sm: variant === 'square' ? 'w-8 h-8 flex-col' : 'text-sm px-2 py-1.5 min-w-8 min-h-8',
		md: variant === 'square' ? 'w-11 h-11 flex-col' : 'text-base px-4 py-2 min-w-11 min-h-11',
		lg:
			variant === 'square'
				? 'w-16 h-16 text-xs flex-col space-y-4'
				: 'text-lg px-4 py-2 min-w-16 min-h-16'
	};

	let buttonClass: string;

	$: buttonClass = classNames(
		'inline-flex justify-center items-center disabled:cursor-not-allowed focus:ring-offset-2 focus:ring-offset-color-ui-background-primary focus:ring-2 focus:outline-none focus:ring-color-action-primary-focussed',
		styleClasses[variant][emphasis],
		sizeClasses[size],
		disabled === true ? disabledClasses[variant] : '',
		href && disabled === true ? 'pointer-events-none' : '',
		slim === true ? '!py-0 !px-0 !min-h-0 leading-none text-left text-nowrap' : '',
		$$props.class
	);
</script>

<div class={classNames('flex', fullWidth ? 'w-full' : '')}>
	<svelte:element
		this={href ? 'a' : 'button'}
		type={href ? undefined : type}
		target={href && openInNewTab ? '_blank' : undefined}
		rel={href && openInNewTab ? 'noopener noreferrer' : undefined}
		{href}
		{disabled}
		{title}
		class={classNames(buttonClass, fullWidth ? 'w-full' : '')}
		aria-label={ariaLabel}
		{id}
		on:click
		on:change
		on:keydown
		on:keyup
		on:touchstart
		on:touchend
		on:touchcancel
		on:mouseenter
		on:mouseleave
		{role}
		{tabindex}
		aria-selected={ariaSelected}
		aria-controls={ariaControls}
		use:action
		{...actionProps}
	>
		<!-- contents of the button -->
		<slot />
	</svelte:element>
</div>
