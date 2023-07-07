<script>
	import { isWideView } from './sidebarState';
</script>

<div
	class="dark bg-core-grey-800 flex flex-col overflow-y-auto p-6 gap-4 text-white text-sm"
	class:narrow-view={!$isWideView}
	class:wide-view={$isWideView}
>
	<slot>
		<p>Hello there, it looks like you're building a new map.</p>

		<p>
			You'll need to replace this content by slotting in <code class="italic"
				>&lt;SidebarContainer slot="content"&gt;</code
			> containing your application's content.
		</p>

		<p>Optionally replace the hood containing the open/close toggle using:</p>

		<code class="italic pl-8">&lt;... slot="hood" /&gt;</code>
	</slot>
</div>

<style>
	.narrow-view {
		@apply w-full h-[400px];
	}

	.wide-view {
		@apply h-full w-[400px];
	}
</style>
