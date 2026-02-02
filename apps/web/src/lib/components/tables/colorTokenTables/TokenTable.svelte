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

<div class="not-prose relative my-spacing-xl overflow-x-auto">
	<div class="absolute right-0 top-1 flex items-center">
		<span class="product label-xs responsive mr-2 text-color-label-muted">Mode</span><ThemeSwitcher
			size="xs"
		/>
	</div>
	<Table {title} data={tokenData} tableSpec={tokenTableSpec} imageDownloadButton={false} />
</div>
