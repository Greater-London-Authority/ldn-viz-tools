<script context="module" lang="ts">
	export interface ButtonProps {
		variant: 'brand' | 'square' | 'solid' | 'outline' | 'text';
		emphasis: 'primary' | 'secondary';
		condition: 'default' | 'success' | 'error' | 'warning';
		size: 'sm' | 'md' | 'lg';
		disabled: boolean;
		href: string;
		type: 'button' | 'submit';
		title: string;
	}

	type ButtonStyle = Record<
		ButtonProps['variant'],
		Record<ButtonProps['emphasis'], Record<ButtonProps['condition'], string>>
	>;

	type DisabledStyle = Record<ButtonProps['variant'], string>;
</script>

<script lang="ts">
	export let variant: ButtonProps['variant'] = 'solid';
	export let emphasis: ButtonProps['emphasis'] = 'primary';
	export let condition: ButtonProps['condition'] = 'default';
	export let size: ButtonProps['size'] = 'md';
	export let disabled: ButtonProps['disabled'] = false;
	export let href: ButtonProps['href'] = '';
	export let type: ButtonProps['type'] = 'button';
	/** Title that appears in hint on hover */
	export let title: ButtonProps['title'] = '';
	import { classNames } from '../utils/classNames';

	const styleClasses: ButtonStyle = {
		brand: {
			primary: {
				default:
					'bg-core-grey-600 text-white pb-1 border-b-4 border-core-blue-500 hover:bg-core-grey-500 dark:bg-core-grey-50 dark:text-core-grey-800 dark:hover:bg-core-grey-200',
				success:
					'bg-core-green-500 text-white pb-1 border-b-4 border-core-green-800 hover:bg-core-green-700',
				error:
					'bg-core-red-500 text-white pb-1 border-b-4 border-core-red-800 hover:bg-core-red-700',
				warning:
					'bg-core-orange-500 text-white pb-1 border-b-4 border-core-orange-800 hover:bg-core-orange-700'
			},
			secondary: {
				default:
					'bg-core-grey-50 core-text-grey-800 pb-1 border-b-4 border-core-blue-500 hover:bg-core-grey-100 dark:bg-core-grey-800 dark:text-white dark:hover:bg-core-grey-500',
				success:
					'bg-core-green-50 core-text-grey-800 pb-1 border-b-4 border-core-green-500 hover:bg-core-green-100 dark:bg-core-green-800 dark:text-white dark:hover:bg-core-green-700',
				error:
					'bg-core-red-50 core-text-grey-800 pb-1 border-b-4 border-core-red-500 hover:bg-core-red-100 dark:bg-core-red-800 dark:text-white dark:hover:bg-core-red-700',
				warning:
					'bg-core-orange-50 core-text-grey-800 pb-1 border-b-4 border-core-orange-500 hover:bg-core-orange-100 dark:bg-core-orange-800 dark:text-white dark:hover:bg-core-orange-700'
			}
		},
		square: {
			primary: {
				default:
					'bg-core-blue-600 text-white hover:bg-core-blue-700 dark:bg-core-grey-50 dark:text-core-grey-800 dark:hover:bg-core-grey-200',
				success: 'bg-core-green-500 text-white hover:bg-core-green-700',
				error: 'bg-core-red-500 text-white hover:bg-core-red-700',
				warning: 'bg-core-orange-500 text-white hover:bg-core-orange-700'
			},
			secondary: {
				default:
					'bg-core-grey-800 text-white hover:bg-core-grey-500 dark:bg-core-grey-50 dark:text-core-grey-800 dark:hover:bg-core-grey-200',
				success: 'bg-core-green-500 text-white hover:bg-core-green-700',
				error: 'bg-core-red-500 text-white hover:bg-core-red-700',
				warning: 'bg-core-orange-500 text-white hover:bg-core-orange-700'
			}
		},
		solid: {
			primary: {
				default: ' bg-core-blue-600 text-white hover:bg-core-blue-700 ',
				success: 'bg-core-green-500 text-white hover:bg-core-green-600',
				error: 'bg-core-red-500 text-white hover:bg-core-red-600',
				warning: 'bg-core-orange-500 text-white hover:bg-core-orange-600'
			},
			secondary: {
				default:
					'bg-core-grey-100 text-core-grey-700 hover:bg-core-grey-200 dark:bg-core-grey-600 dark:text-white dark:hover:bg-core-grey-500',
				success: 'bg-core-green-300 text-core-grey-700 hover:bg-core-green-400',
				error: 'bg-core-red-300 text-core-grey-700 hover:bg-core-red-400',
				warning: 'bg-core-orange-300 text-core-grey-700 hover:bg-core-orange-400'
			}
		},
		outline: {
			primary: {
				default:
					'bg-transparent text-core-grey-700 border-2 px-2 pt-1.5 pb-1.5 border-core-blue-600 hover:bg-core-blue-600 hover:text-white dark:text-white',
				success:
					'bg-core-green-50 text-core-green-800 border-2 px-2 pt-1.5 pb-1.5 border-core-green-500 hover:bg-core-green-600 hover:text-white dark:text-white dark:bg-core-green-700 dark:hover:bg-core-green-600',
				error:
					'bg-core-red-50 text-core-red-800 border-2 px-2 pt-1.5 pb-1.5 border-core-red-500 hover:bg-core-red-600 hover:text-white dark:text-white dark:bg-core-red-700 dark:hover:bg-core-red-600',
				warning:
					'bg-core-orange-50 text-core-orange-800 border-2 px-2 pt-1.5 pb-1.5 border-core-orange-500 hover:bg-core-orange-600 hover:text-white dark:text-white dark:bg-core-orange-700 dark:hover:bg-core-orange-600'
			},
			secondary: {
				default:
					'bg-transparent text-core-grey-700 border-2 px-2 pt-1.5 pb-1.5 border-core-grey-400 hover:bg-core-grey-400 hover:text-white dark:text-white',
				success:
					'bg-core-green-50 text-core-green-800 border-2 px-2 pt-1.5 pb-1.5 border-core-green-500 hover:bg-core-green-600 hover:text-white dark:text-white dark:bg-core-green-700 dark:hover:bg-core-green-600',
				error:
					'bg-core-red-50 text-core-red-800 border-2 px-2 pt-1.5 pb-1.5 border-core-red-500 hover:bg-core-red-600 hover:text-white dark:text-white dark:bg-core-red-700 dark:hover:bg-core-red-600',
				warning:
					'bg-core-orange-50 text-core-orange-800 border-2 px-2 pt-1.5 pb-1.5 border-core-orange-500 hover:bg-core-orange-600 hover:text-white dark:text-white dark:bg-core-orange-700 dark:hover:bg-core-orange-600'
			}
		},
		text: {
			primary: {
				default: 'bg-transparent text-core-grey-700 hover:text-core-blue-600 dark:text-white',
				success: 'bg-transparent text-core-green-500 hover:text-core-green-600',
				error: 'bg-transparent text-core-red-500 hover:text-core-red-600',
				warning: 'bg-transparent text-core-orange-500 hover:text-core-orange-600'
			},
			secondary: {
				default: 'bg-transparent text-core-grey-500 hover:text-core-grey-300 dark:text-white',
				success: 'bg-transparent text-core-green-500 hover:text-core-green-600',
				error: 'bg-transparent text-core-red-500 hover:text-core-red-600',
				warning: 'bg-transparent text-core-orange-500 hover:text-core-orange-600'
			}
		}
	};

	const disabledClasses: DisabledStyle = {
		brand: '!bg-core-grey-100 !border-core-grey-300 !text-core-grey-300',
		square: '!bg-core-grey-100 !text-core-grey-300',
		solid: '!bg-core-grey-100 !text-core-grey-300',
		outline: '!bg-core-grey-100 !border-core-grey-300 !text-core-grey-300',
		text: '!text-core-grey-300 hover:bg-transparent'
	};

	const sizeClasses = {
		sm: variant === 'square' ? 'w-8 h-8 flex-col' : 'text-sm px-2 py-2',
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
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	{href}
	{disabled}
	{title}
	class={buttonClass}
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
>
	<slot />
</svelte:element>
