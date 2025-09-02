<script module lang="ts">
	export enum MapControlGroupPositions {
		TopLeft = 'TopLeft',
		TopCenter = 'TopCenter',
		TopRight = 'TopRight',
		TopRightOffset = 'TopRightOffset',
		CenterRight = 'CenterRight',
		BottomRight = 'BottomRight',
		BottomCenter = 'BottomCenter',
		BottomLeft = 'BottomLeft',
		CenterLeft = 'CenterLeft'
	}

	type PositionClass = {
		[key in keyof typeof MapControlGroupPositions]: string;
	};

	const positionClasses: PositionClass = {
		TopLeft: 'top-6 left-6',
		TopCenter: 'top-6 left-1/2 -translate-x-1/2 transform items-center',
		TopRight: 'top-6 right-6 items-end',
		TopRightOffset: 'top-16 right-6 items-end',
		CenterRight: 'top-1/2 -translate-y-1/2 right-6 transform items-end',
		BottomRight: 'bottom-11 right-6 items-end',
		BottomCenter: 'bottom-11 left-1/2 -translate-x-1/2 transform items-center',
		BottomLeft: 'bottom-11 left-6',
		CenterLeft: 'top-1/2 -translate-y-1/2 left-6 transform'
	};
</script>

<script lang="ts">
	/**
	 * The `<MapControlGroup>` component wraps map controls and other overlays
	 * to provide positioning relative to a parent `<Map>` component instance.
	 * @component
	 */

	interface Props {
		/**
		 * Position of the group over the map. Available positions defined by
		 * `MapControlGroupPositions` enum type.
		 */
		position?: keyof typeof MapControlGroupPositions;
		/**
		 * Additional classes applied to the group's container element.
		 */
		classes?: string;
		children?: import('svelte').Snippet;
	}

	let { position = MapControlGroupPositions.TopLeft, classes = '', children }: Props = $props();

	const positionClass = positionClasses[position];
</script>

<div class="absolute {positionClass} pointer-events-none z-10 flex flex-col space-y-2 {classes} ">
	<!-- Group content, usually map control buttons. -->
	{@render children?.()}
</div>
