<script>
	import { isWideView } from './sidebarState';
</script>

<div
	class="bg-core-grey-800 p-6 text-white flex wide:flex-col overflow-y-auto"
	class:narrow-view={!$isWideView}
	class:wide-view={$isWideView}
>
	<slot>
		<div>
			<p>Hello there, it looks like you're building a new map.</p>

			<p>
				You'll need to replace me using:<br />
			</p>

			<p>
				<code>&lt;... slot="content" /&gt;</code>
			</p>

			<p>
				Optionally replace the hood containing the open/close toggle using:<br />
			</p>

			<p>
				<code>&lt;... slot="hood" /&gt;</code>
			</p>
		</div>
	</slot>
</div>

<style>
	p {
		@apply text-white mb-8;
	}

	code {
		@apply italic pl-8;
	}

	.narrow-view {
		@apply w-full h-[400px];
	}

	.wide-view {
		@apply h-full w-[400px];
	}
</style>
