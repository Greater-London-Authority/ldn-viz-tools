<script lang="ts">
	/**
	 * Typically imported from `$app/paths` then passed as prop.
	 * Used to construct link to homepage.
	 */
	export let base = '';
</script>

<a href={base || '/'}
	><span class="mr-4 text-lg">
		<!-- The app title, possibly including an icon. -->
		<slot />
	</span></a
>
