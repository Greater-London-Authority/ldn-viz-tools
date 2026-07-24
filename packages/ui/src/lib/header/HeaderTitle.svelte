<script lang="ts">
	/**
	 * Typically imported from `$app/paths` then passed as prop.
	 * Used to construct link to homepage.
	 */

	interface Props {
		base?: string;
		children?: import('svelte').Snippet;
	}

	let { base = '', children }: Props = $props();
</script>

<a href={base || '/'}>
	<span class="product card-panel-title mr-4">
		<!-- The app title, possibly including an icon. -->
		{@render children?.()}
	</span>
</a>
