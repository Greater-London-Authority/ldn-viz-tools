<script lang="ts" context="module">
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
		[key: string]: string;
	};

	const positionClasses: PositionClass = {
		TopLeft: 'top-6 left-6',
		TopCenter: 'top-6 left-1/2 -translate-x-1/2 transform',
		TopRight: 'top-6 right-6',
		TopRightOffset: 'top-16 right-6',
		CenterRight: 'top-1/2 -translate-y-1/2 right-6 transform',
		BottomRight: 'bottom-6 right-6',
		BottomCenter: 'bottom-6 left-1/2 -translate-x-1/2 transform',
		BottomLeft: 'bottom-6 left-6',
		CenterLeft: 'top-1/2 -translate-y-1/2 left-6 transform'
	};
</script>

<script lang="ts">
	export let position: string | MapControlGroupPositions = MapControlGroupPositions.TopLeft;
	export let classes = '';

	const positionClass = positionClasses[position];
</script>

<div class="absolute {positionClass} z-10 flex flex-col space-y-2 pointer-events-none {classes}">
	<slot />
</div>
