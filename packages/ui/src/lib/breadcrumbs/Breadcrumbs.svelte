<script lang="ts">
	/**
	 * The `Breadcrumbs` componenent renders a series of links.
	 * It usually corresponds to the levels in a hierachy that has (or could have been) been traversed to reach the current page,
	 * providing a way to access ancestor pages.
	 *
	 * @component
	 */

	interface Props {
		/**
		 * An array of objects, each with a label and href attribute.
		 * The `href` attribute should generally be resolved by using the [resolve()](https://svelte.dev/docs/kit/$app-paths#resolve)
		 * function that can be imported from `'$app/paths'` in a SvelteKit app.
		 */
		breadcrumbs: { label: string; href: string }[];
	}

	let { breadcrumbs }: Props = $props();
</script>

{#if breadcrumbs && breadcrumbs.length > 0}
	<div class="text-color-text-secondary py-2 text-sm">
		{#each breadcrumbs as c, i}
			{#if i == breadcrumbs.length - 1}
				<span class="text-color-ui-primary">
					{c.label}
				</span>
			{:else}
				<a href={c.href} class="underline hover:no-underline">{c.label}</a> &sol;&nbsp;
			{/if}
		{/each}
	</div>
{/if}
