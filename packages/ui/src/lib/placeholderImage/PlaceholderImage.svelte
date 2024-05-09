<script lang="ts">
	/**
	 * The `<PlaceholderImage>` component shows a generic placeholder image as an
	 * `<svg>` element. This can be used in place of a real image or whilst one
	 * is loading. This avoids the layout of a page or widget changing suddenly
	 * due to a slow or user initiated image loads.
	 *
	 * @component
	 */

	/**
	 * Background classes to apply to the whole image.
	 */
	export let bgClass: string = `fill-white dark:fill-core-grey-800`;

	const baseClass = 'stroke-core-blue-600';
	const userClass = $$restProps.class ? $$restProps.class : '';
	$$restProps.class = baseClass + ' ' + userClass + ' ' + bgClass;
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
