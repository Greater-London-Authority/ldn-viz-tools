<script lang="ts">
	import { Table } from '@ldn-viz/tables';
	import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
	import { theme } from '@ldn-viz/ui';
	import { tokenTableSpec } from './spec';

	interface Props {
		title: string;
	}

	let { title }: Props = $props();

	let tokenTableData = $derived(
		Object.values(tokens.mode[theme.currentMode ? theme.currentMode : 'light'].color.chart)
	);
</script>

<div class="not-prose">
	<Table {title} data={tokenTableData} tableSpec={tokenTableSpec} imageDownloadButton={false} />
</div>
