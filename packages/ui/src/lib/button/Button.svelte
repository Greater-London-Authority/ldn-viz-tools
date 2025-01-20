<script context="module" lang="ts">
	/**
	 * The `<Button>` component creates an HTML `<button>` (or, if the `href` prop is set, an `<a>`) element.
	 * Using it rather than the HTML element directly ensures that the button is styled consistently with our style-guide.
	 * 
	 * **Alternatives**: if clicking on the button should trigger the download of data or an image, consider using the [DataDownloadButton](./?path=/docs/ui-datadownloadbutton--documentation) or [ImageDownloadButton](./?path=/docs/ui-imagedownloadbutton--documentation) components.
	 * If the button is intended to copy text to the clipboard, consider using the [CopyButton](./?path=/docs/ui-copybutton--documentation).
	 * If the button is intended as a link for navigation, consider using the [PlacardButton](./?path=/docs/ui-placardbutton--documentation).

	 * @component
	 */

	export interface ButtonProps {
		variant: 'brand' | 'square' | 'solid' | 'outline' | 'text';
		emphasis: 'primary' | 'secondary';
		condition: 'default' | 'success' | 'error' | 'warning';
		size: 'sm' | 'md' | 'lg';
		disabled: boolean;
		href: string;
		openInNewTab: boolean;
		type: 'button' | 'submit';
		title: string;
		customAction: ((node: HTMLElement) => MeltActionReturn<'keydown' | 'pointerdown'>) | undefined;
	}

	type ButtonStyle = Record<
		ButtonProps['variant'],
		Record<ButtonProps['emphasis'], Record<ButtonProps['condition'], string>>
	>;

	type DisabledStyle = Record<ButtonProps['variant'], string>;
</script>

<script lang="ts">
	import type { MeltActionReturn } from '@melt-ui/svelte/internal/types';

	/**
	 * Selects which family of styles should be applied to the button.
	 */
	export let variant: ButtonProps['variant'] = 'solid';

	/**
	 * Determines how much visual emphasis is placed on the button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'primary';

	/**
	 * Provides ability to modify appearance to represent success/error/warning conditions.
	 */
	export let condition: ButtonProps['condition'] = 'default';

	/**
	 * Sets the size of the button.
	 */
	export let size: ButtonProps['size'] = 'md';

	/**
	 * If `true`, then the button cannot be interacted with (either by clicking, or by using the keyboard).
	 */
	export let disabled: ButtonProps['disabled'] = false;

	/**
	 * If this is set, the button is a link with the specified target.
	 */
	export let href: ButtonProps['href'] = '';

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
	 * MeltUI Action passed down from MultipleActionButton
	 */
	export let customAction: ButtonProps['customAction'] = undefined;

	/**
	 * MeltUI action props passed down from MultipleActionButton, which include ARIA attributes and tabindex.
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

	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	const styleClasses: ButtonStyle = {
		brand: {
			primary: {
				default:
					'bg-color-ui-background-inverse-primary text-color-text-inverse-primary pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-primary-hover',
				success:
					'bg-color-action-background-positive text-color-static-white pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-positive-hover',
				error:
					'bg-color-action-background-negative text-color-static-white pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-negative-hover',
				warning:
					'bg-color-action-background-warning text-color-static-white pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-warning-hover'
			},
			secondary: {
				default:
					'bg-color-ui-background-secondary text-color-text-primary pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-secondary-hover',
				success:
					'bg-color-action-background-positive-secondary text-color-text-primary pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-positive-secondary-hover',
				error:
					'bg-color-action-background-negative-secondary text-color-text-primary pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-negative-secondary-hover',
				warning:
					'bg-color-action-background-warning-secondary text-color-text-primary pb-1 border-b-4 border-color-static-brand hover:bg-color-action-background-warning-secondary-hover'
			}
		},
		square: {
			primary: {
				default:
					'bg-color-action-background-primary text-color-static-white hover:bg-color-action-background-primary-hover',
				success:
					'bg-color-action-background-positive text-color-static-white hover:bg-color-action-background-positive-hover',
				error:
					'bg-color-action-background-negative text-color-static-white hover:bg-color-action-background-negative-hover',
				warning:
					'bg-color-action-background-warning text-color-static-white hover:bg-color-action-background-warning-hover'
			},
			secondary: {
				default:
					'bg-color-action-background-secondary text-color-text-primary hover:bg-color-action-background-secondary-hover',
				success:
					'bg-color-action-background-positive-secondary text-color-text-primary hover:bg-color-action-background-positive-secondary-hover',
				error:
					'bg-color-action-background-negative-secondary text-color-text-primary hover:bg-color-action-background-negative-secondary-hover',
				warning:
					'bg-color-action-background-warning-secondary text-color-text-primary hover:bg-color-action-background-warning-secondary-hover'
			}
		},
		solid: {
			primary: {
				default:
					'bg-color-action-background-primary text-color-static-white hover:bg-color-action-background-primary-hover',
				success:
					'bg-color-action-background-positive text-color-static-white hover:bg-color-action-background-positive-hover',
				error:
					'bg-color-action-background-negative text-color-static-white hover:bg-color-action-background-negative-hover',
				warning:
					'bg-color-action-background-warning text-color-static-white hover:bg-color-action-background-warning-hover'
			},
			secondary: {
				default:
					'bg-color-action-background-secondary text-color-text-primary hover:bg-color-action-background-secondary-hover',
				success:
					'bg-color-action-background-positive-secondary text-color-text-primary hover:bg-color-action-background-positive-secondary-hover',
				error:
					'bg-color-action-background-negative-secondary text-color-text-primary hover:bg-color-action-background-negative-secondary-hover',
				warning:
					'bg-color-action-background-warning-secondary text-color-text-primary hover:bg-color-action-background-warning-secondary-hover'
			}
		},
		outline: {
			primary: {
				default:
					'bg-transparent text-color-text-primary border-2 px-2 pt-1 pb-1 border-color-action-border-primary hover:bg-color-action-background-primary-100-hover',
				success:
					'bg-transparent text-color-text-primary border-2 px-2 pt-1 pb-1 border-color-action-border-positive hover:bg-color-action-background-positive-secondary-hover',
				error:
					'bg-transparent text-color-text-primary border-2 px-2 pt-1 pb-1 border-color-action-border-negative hover:bg-color-action-background-negative-secondary-hover',
				warning:
					'bg-transparent text-color-text-primary border-2 px-2 pt-1 pb-1 border-color-action-border-warning hover:bg-color-action-background-warning-secondary-hover'
			},
			secondary: {
				default:
					'bg-transparent text-color-text-secondary border-2 px-2 pt-1 pb-1 border-color-action-border-secondary hover:bg-color-action-secondary-100-hover',
				success:
					'bg-transparent text-color-text-secondary border-2 px-2 pt-1 pb-1 border-color-action-border-positive hover:bg-color-action-background-positive-secondary-hover',
				error:
					'bg-transparent text-color-text-secondary border-2 px-2 pt-1 pb-1 border-color-action-border-negative hover:bg-color-action-background-negative-secondary-hover',
				warning:
					'bg-transparent text-color-text-secondary border-2 px-2 pt-1 pb-1 border-color-action-border-warning hover:bg-color-action-background-warning-secondary-hover'
			}
		},
		text: {
			primary: {
				default:
					'bg-transparent text-color-action-text-primary hover:text-color-action-text-primary-hover',
				success: 'bg-transparent text-color-action-positive hover:text-color-action-positive-hover',
				error: 'bg-transparent text-color-action-negative hover:text-color-action-negative-hover',
				warning: 'bg-transparent text-color-action-warning hover:text-color-action-warning-hover'
			},
			secondary: {
				default:
					'bg-transparent text-color-action-text-secondary hover:text-color-action-text-secondary-hover',
				success: 'bg-transparent text-color-action-positive hover:text-color-action-positive-hover',
				error: 'bg-transparent text-color-action-negative hover:text-color-action-negative-hover',
				warning: 'bg-transparent text-color-action-warning hover:text-color-action-warning-hover'
			}
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
		sm: variant === 'square' ? 'w-8 h-8 flex-col' : 'text-sm px-2 py-1.5',
		md: variant === 'square' ? 'w-10 h-10 flex-col' : 'text-base px-4 py-2',
		lg: variant === 'square' ? 'w-16 h-16 text-xs flex-col space-y-4' : 'text-lg px-4 py-2'
	};

	let buttonClass: string;

	$: buttonClass = classNames(
		'inline-flex justify-center items-center disabled:cursor-not-allowed',
		styleClasses[variant][emphasis][condition],
		sizeClasses[size],
		disabled === true ? disabledClasses[variant] : '',
		href && disabled === true ? 'pointer-events-none' : '',
		$$props.class
	);

	const action = customAction ? customAction : () => {};
</script>

<div class="flex">
	<svelte:element
		this={href ? 'a' : 'button'}
		type={href ? undefined : type}
		target={href && openInNewTab ? '_blank' : undefined}
		rel={href && openInNewTab ? 'noopener noreferrer' : undefined}
		{href}
		{disabled}
		{title}
		class={buttonClass}
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
		role="button"
		tabindex="0"
		use:action
		{...actionProps}
	>
		<!-- contents of the button -->
		<slot />
	</svelte:element>
</div>
