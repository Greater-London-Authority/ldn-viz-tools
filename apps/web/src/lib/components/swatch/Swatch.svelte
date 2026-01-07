<script lang="ts">
	import { classNames } from '@ldn-viz/ui';

	interface ColorChip {
		name: string;
		hex: string;
		value: string;
		type: string;
		description: string;
		size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}

	let { name, hex, value, type, description, size }: ColorChip = $props();

	const sizeClasses = {
		xs: 'p-0.5 space-y-1 w-[82px]',
		sm: 'p-1 space-y-1',
		md: 'p-2 space-y-2',
		lg: 'p-2 space-y-2',
		xl: 'p-2 space-y-2'
	};

	const swatchClass = classNames(
		'border-color-ui-border-secondary bg-color-container-level-0 flex-col justify-between border shadow-sm',
		sizeClasses[size]
	);

	const textSize = size === 'xs' ? 'text-xs' : 'text-sm';

	const copyHex = (e) => {
		console.log(e);
	};

	let text = $state('');

	function copySuccess() {
		text = 'Success!';
	}

	function copyError(event: { detail: any }) {
		text = `Error! ${event.detail}`;
	}
</script>

<div class={swatchClass} onclick={copyHex} oncopysuccess={copySuccess}>
	<div class="aspect-video" style:background-color={hex}></div>

	{#if size !== 'xs'}
		<div class={textSize}>
			<p class="text-color-text-secondary">{name}</p>
			<p>{value}</p>
			{#if description}
				<p>Description: {description}</p>
			{/if}
		</div>
	{/if}

	{#if size === 'xs'}
		{@const trimmedName = name.split('-').pop()}
		<div class={textSize}>
			<p class="text-color-text-secondary">{trimmedName}</p>
			<p>{value}</p>
		</div>
	{/if}
</div>
