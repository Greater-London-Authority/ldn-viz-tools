<script lang="ts">
	export let style: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base';
	export let disabled: boolean = false;
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' = 'button';

	const styleClasses = {
		primary: 'bg-core-grey-500 border-b-4 border-core-blue-600 text-white hover:bg-core-grey-400',
		secondary: 'bg-white border-b-4 border-core-blue-600 hover:bg-core-grey-100',
		ghost: 'bg-transparent hover:bg-core-grey-100 dark:text-white dark:hover:bg-core-grey-400'
	};

	const sizeClasses = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl'
	};

	let buttonClass: string;

	const classNames = (...classes: string[]) => {
		return classes.filter(Boolean).join(' ');
	};

	$: buttonClass = classNames(
		'px-4 py-2 inline-flex justify-center',
		sizeClasses[size],
		styleClasses[style],
		disabled === true
			? 'cursor-not-allowed text-core-grey-300 border-core-grey-200 opacity-50'
			: '',
		$$props.class
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
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
>
	<slot />
</svelte:element>
