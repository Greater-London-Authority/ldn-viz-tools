<script lang="ts" context="module">
	export type MapControlGroupPositionX = 'left' | 'center' | 'right';
	export type MapControlGroupPositionY = 'top' | 'center' | 'bottom';
	export type MapControlGroupOffset = 'md' | 'lg';

	const xPositions = {
		left: {
			md: 'left-6',
			lg: 'left-16'
		},
		center: {
			md: 'left-1/2',
			lg: 'left-1/2'
		},
		right: {
			md: 'right-6',
			lg: 'right-16'
		}
	};

	const xAlignments = {
		left: '',
		center: '-translate-x-1/2 transform items-center',
		right: 'items-end'
	};

	const yPositions = {
		top: {
			md: 'top-6',
			lg: 'top-16'
		},
		center: {
			md: 'top-1/2',
			lg: 'top-1/2'
		},
		bottom: {
			md: 'bottom-6',
			lg: 'bottom-16'
		}
	};

	const yAlignments = {
		top: '',
		center: '-translate-y-1/2 transform',
		bottom: ''
	};
</script>

<script lang="ts">
	/**
	 * The `<MapControlGroup>` component wraps map controls and other overlays
	 * to provide positioning relative to a parent `<Map>` component instance.
	 * @component
	 */

	/**
	 * Horizontal position.
	 */
	export let x: MapControlGroupPositionX = 'left';

	/**
	 * Horizontal offset from screen edge. Used to avoid overlap with overflow
	 * elements from `<AppShell>` and `<Sidebar>`.
	 */
	export let xOffset: MapControlGroupOffset = 'md';

	/**
	 * Vertical position.
	 */
	export let y: MapControlGroupPositionY = 'top';

	/**
	 * Vertical offset from screen edge. Used to avoid overlap with overflow
	 * elements from `<AppShell>` and `<Sidebar>`.
	 */
	export let yOffset: MapControlGroupOffset = 'md';

	$: classes = [
		'absolute',
		xPositions[x][xOffset],
		xAlignments[x],
		yPositions[y][yOffset],
		yAlignments[y],
		'z-10',
		'flex',
		'flex-col',
		'space-y-2',
		'pointer-events-none',
		$$restProps.class || ''
	]
		.join(' ')
		.trim();

	const removeClassRestProp = () => delete $$restProps.class;
	$: classes, removeClassRestProp();
</script>

<div class={classes} {...$$restProps}>
	<!-- Group content, usually map control buttons. -->
	<slot />
</div>
