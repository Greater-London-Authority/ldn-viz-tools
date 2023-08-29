<script lang="ts">
	export let size = 'base';
	export let classes = '';

	type Sizes = {
		[key: string]: string;
	};

	const sizes: Sizes = {
		base: 'clamp(40px, 2.5rem, 80px)',
		lg: `calc(2 * clamp(40px, 2.5rem, 80px))`
	};
</script>

<button
	class="bg-core-grey-800 text-white hover:bg-core-blue-600 disabled:bg-core-grey-400 {classes}"
	style:width={sizes[size]}
	style:height={sizes[size]}
	on:click
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
	<slot />
</button>
