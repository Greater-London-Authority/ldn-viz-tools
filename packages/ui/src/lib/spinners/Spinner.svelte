<script>
	/**
	 * The `<Spinner>` component displays an animation to show that an operation (such as data loading) is currently in progress.
	 *
	 * **Alternatives**: if it is necessary to display an explanation of what is happening, or to provide a placeholder to occupy space that will be occupied once an operation has completed, then consider using the [Non-Ideal State](./?path=/docs/ui-nonidealstate--documentation) component.
	 * @component
	 */

	import { classNames } from '../utils/classNames';

	/**
	 * A TailwindCSS class (e.g., `stroke-core-blue-200`) to set the color of the background circle.
	 */
	export let circleColorClass = '';

	/**
	 * A TailwindCSS class (e.g., `stroke-core-glaPink-600`) to set the color of the arc whose movement is animated.
	 */
	export let arcColorClass = '';

	$: circleClasses = classNames(
		circleColorClass || 'stroke-core-grey-200 dark:stroke-core-grey-500'
	);
	$: pathClasses = classNames(arcColorClass || 'stroke-core-blue-600');
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 100 100"
	fill="none"
	stroke-width="8"
	{...$$restProps}
>
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
