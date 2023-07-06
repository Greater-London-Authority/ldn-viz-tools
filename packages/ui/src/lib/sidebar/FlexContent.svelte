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
			<p class="text-white mb-2">Hello there, it looks like you're building a new map.</p>
			<p class="text-white">You'll need to replace me using:</p>

			<!-- prettier-ignore -->
			<pre class="text-white">
				<code>
	&lt;Sidebar&gt;
		&lt;... slot="content" /&gt;
	&lt;/Sidebar&gt;
				</code>
			</pre>

			<p class="text-white">Optionally replace the hood containing the open/close toggle using:</p>

			<!-- prettier-ignore -->
			<pre class="text-white">
				<code>
	&lt;Sidebar&gt;
		&lt;... slot="hood" /&gt;
	&lt;/Sidebar&gt;
				</code>
			</pre>
		</div>
	</slot>
</div>

<style>
	.narrow-view {
		@apply w-full h-96;
	}

	.wide-view {
		@apply h-full w-96;
	}
</style>
