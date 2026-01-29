<script lang="ts">
	import { Table } from '@ldn-viz/tables';
	import { tokenTableSpec } from './spec';

	interface TokenTableProps {
		tokenData: { [key: string]: any }[];
		title: string;
	}

	let { tokenData, title }: TokenTableProps = $props();
</script>

<div class="not-prose overflow-x-scroll">
	<Table
		{title}
		data={Object.values(tokenData)}
		tableSpec={tokenTableSpec}
		imageDownloadButton={false}
	/>
</div>
