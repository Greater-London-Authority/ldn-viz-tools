<script lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { ClipboardDocumentCheck } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Props {
		/**
		 * The value to be encoded in the cell.
		 */
		value: string;
	}

	let { value = 'red' }: Props = $props();
	let label = $state('');

	let textColor = $derived.by(() =>
		colorWithBestContrast(
			value,
			theme.tokenNameToValue('text'),
			theme.tokenNameToValue('inverse.text')
		)
	);

	let borderClass = $derived.by(() =>
		value === theme.tokenNameToValue('surface') ? 'border border-color-border-muted' : ''
	);

	const copyValue = (value: string) => {
		label = 'Copied';
		navigator.clipboard.writeText(JSON.stringify(value));
		setTimeout(() => (label = ''), 1000);
	};
</script>

<div class="flex h-full w-full items-center">
	<div class="flex h-10 w-10 items-center p-2">
		<button
			aria-label="Select color chip to copy color code"
			class="full flex h-full w-full items-center justify-center rounded-full {borderClass}"
			style:background-color={value}
			style:color={textColor}
			onclick={() => copyValue(value)}
		>
			{#if label}
				<Icon src={ClipboardDocumentCheck} theme="mini" class="h-4 w-4" />
			{/if}
		</button>
	</div>
</div>
