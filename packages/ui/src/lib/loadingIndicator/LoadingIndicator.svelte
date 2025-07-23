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

	import { Clock } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Spinner from '../spinners/Spinner.svelte';
	import { prefersReducedMotion } from '../userPreference/userPreference';

	interface Props {
		/**
		 * Describes the state change (i.e. appearance of Spinner or icon while loading) for screen reader users.
		 */
		title?: string;

		/**
		 * Customise the styling of the `<Spinner>` arc.
		 */
		arcColorClass?: string;

		/**
		 * Customise the styling by passing tailwind classes.
		 */
		class: string;
	}

	let { title = 'Loading', arcColorClass = '', class: classes = '' }: Props = $props();
</script>

{#if prefersReducedMotion.current}
	<Icon src={Clock} theme="solid" class={classes} {title} aria-hidden="false" />
{:else}
	<Spinner {arcColorClass} class={classes} {title} />
{/if}
