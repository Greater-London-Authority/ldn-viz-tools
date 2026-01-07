<script lang="ts">
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { theme } from '@ldn-viz/ui';

	interface Props {
		/**
		 * The value to be encoded in the cell.
		 */
		value: string;
	}

	let { value = 'red' }: Props = $props();
	let label = $state('');

	let textColor = $derived(
		value ??
			colorWithBestContrast(
				value,
				theme.tokenNameToValue('text.primary'),
				theme.tokenNameToValue('text.inverse.primary')
			)
	);

	const copyValue = (value: string) => {
		label = 'Copied!';
		navigator.clipboard.writeText(JSON.stringify(value));
		setTimeout(() => (label = ''), 1000);
	};
</script>

<div class="flex h-full min-h-14 items-center py-0.5 pr-2">
	<button
		aria-label="Select color chip to copy color code"
		class="flex h-full w-full"
		style:background-color={value}
		style:color={textColor}
		onclick={() => copyValue(value)}
	>
		{label}
	</button>
</div>
