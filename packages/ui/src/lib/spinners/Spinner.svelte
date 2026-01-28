<script lang="ts">
	/**
	 * The `<Spinner>` component displays an animation to show that an operation (such as data loading) is currently in progress.
	 *
	 * Consider using the [LoadingIndicator](./?path=/docs/ui-components-loadingindicator--documentation) component, which wraps around this Spinner and handles user prefersReducedMotion.
	 *
	 * **Alternatives**: if it is necessary to display an explanation of what is happening, or to provide a placeholder to occupy space that will be occupied once an operation has completed, then consider using the [Non-Ideal State](./?path=/docs/ui-components-nonidealstate--documentation) component.
	 * @component
	 */

	import { classNames } from '../utils/classNames';

	interface Props {
		/**
		 * A Stroke color token (e.g., `stroke-color-palette-blue-200`) to set the color of the background circle.
		 */
		circleColorClass?: string;
		/**
		 * A Stroke color token (e.g., `stroke-color-palette-pink-500`) to set the color of the arc whose movement is animated.
		 */
		arcColorClass?: string;
		/**
		 * Describes purpose of `Spinner` for use cases where
		 * there's no accompanying text to describe the state
		 * change (e.g. AsyncButton). Required in this case but
		 * otherwise undefined.
		 */
		title?: string | undefined;
		[key: string]: any;
	}

	let { circleColorClass = '', arcColorClass = '', title = undefined, ...rest }: Props = $props();

	let circleClasses = $derived(classNames(circleColorClass || 'stroke-color-surface-empty'));
	let pathClasses = $derived(
		classNames(arcColorClass || 'stroke-color-interactive-primary-active')
	);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 100 100"
	fill="none"
	stroke-width="8"
	{...rest}
>
	{#if title}
		<title>{title}</title>
	{/if}
	<circle cx="50" cy="50" r="38" class={circleClasses} />
	<path d="M 50,12 a 38,38 0 0,1 38,38" class={pathClasses}>
		<animateTransform
			attributeName="transform"
			type="rotate"
			from="0 50 50"
			to="360 50 50"
			dur="1s"
			repeatCount="indefinite"
		/>
	</path>
</svg>
