<script lang="ts">
	import { Table } from '@ldn-viz/tables';
	import { ThemeSwitcher } from '@ldn-viz/ui';
	import { tokenTableSpec } from './spec';

	interface TokenTableProps {
		tokenData: { [key: string]: any }[];
		title: string;
	}

	let { tokenData, title }: TokenTableProps = $props();
</script>

<div class="my-spacing-xl not-prose relative overflow-x-auto">
	<div class="absolute right-0 top-1 flex items-center">
		<span class="product label-sm mr-2 text-color-label-muted">Mode</span><ThemeSwitcher
			size="xs"
		/>
	</div>
	<Table
		{title}
		data={tokenData}
		tableSpec={tokenTableSpec}
		imageDownloadButton={false}
		dataDownloadButton={false}
		zebraStripe
	/>
</div>
