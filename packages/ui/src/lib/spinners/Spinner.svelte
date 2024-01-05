<script>
	import { classNames } from '../utils/classNames';

	export let circleColorClass = '';
	export let arcColorClass = '';

	$: circleClasses = classNames(circleColorClass || 'stroke-core-grey-200 dark:stroke-core-grey-500');
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
