<script lang="ts">
	/**
	 * The `<PlaceholderImage>` component shows a generic placeholder image as an
	 * `<svg>` element. This can be used in place of a real image or whilst one
	 * is loading. This avoids the layout of a page or widget changing suddenly
	 * due to a slow or user initiated image loads.
	 *
	 * **Alternatives**: if you need a placeholder that can display a message, consider using the [NonIdealState](./?path=/docs/ui-nonidealstate--documentation) component.
	 *
	 * @component
	 */

	import { classNames } from '../utils/classNames';

	/**
	 * Background classes to apply to the whole image.
	 */
	export let bgClass = `fill-white dark:fill-core-grey-800`;

	/**
	 * Classes to apply to the stroke.
	 */
	export let strokeClass = 'stroke-core-blue-600';

	/**
	 * Other classes to apply to the SVG.
	 */
	export let otherClasses = '';

	$$restProps.class = classNames(strokeClass, bgClass, otherClasses);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 20"
	preserveAspectRatio="none"
	vector-effect="non-scaling-stroke"
	fill="none"
	stroke-width="0.5"
	{...$$restProps}
>
	<g transform="translate(0 -2)">
		<path
			class={bgClass}
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
		/>
	</g>
</svg>
