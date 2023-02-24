<script lang="ts">
	type ButtonType = import('../index').ButtonType;

	export let type: ButtonType = 'button';
	export let disabled = false;
	export let primary = false;
	export let value = false;

	$: mode = primary
		? 'bg-core-blue-500 text-white border-b-core-grey-500'
		: 'bg-white text-core-grey-700 border-b-core-blue-500';
	export let classes = `inline-flex text-sm px-2.5 py-1.5 border border-b-4  border-core-grey-200 hover:bg-core-grey-200 hover:border-b-core-blue-800 duration-300 ease-in-out transition-colors`;
</script>

<button
	class={[classes, mode].join(' ')}
	{type}
	{disabled}
	on:click={() => (value = !value)}
	on:click
	on:mouseover
	on:focus
>
	<slot />
</button>
