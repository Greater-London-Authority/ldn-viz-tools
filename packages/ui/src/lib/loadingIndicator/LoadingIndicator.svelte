<script lang="ts">
	/**
	 * The `<LoadingIndicator>` component wraps around the `<Spinner>` component
	 * to indicate when the user should wait for an operation to complete
	 * (e.g. in `<AsyncButton>`, `<NonIdealState>` and `<Geolocator>` components).
	 *
	 * In cases where the user prefers reduced motion, the `<Spinner>` is replaced with
	 * a clock icon.
	 *
	 * @component
	 */

	import { prefersReducedMotion, Spinner } from '@ldn-viz/ui';
	import { Clock } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	/**
	 * Describes the state change (i.e. appearance of Spinner or icon while loading) for screen reader users.
	 */
	export let title = 'Loading';

	/**
	 * Customise the styling of the `<Spinner>` arc.
	 */
	export let arcColorClass = '';
</script>

{#if $prefersReducedMotion}
	<Icon src={Clock} theme="solid" class={$$props.class} {title} aria-hidden="false" />
{:else}
	<Spinner {arcColorClass} class={$$props.class} {title} />
{/if}
