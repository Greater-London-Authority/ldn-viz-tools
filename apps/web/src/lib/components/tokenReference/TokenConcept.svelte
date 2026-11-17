<script lang="ts">
	/**
	 * The token concept diagram: the canvas, the surfaces at elevations 1 to 6, content and
	 * interactive elements drawn as a stack of layers. Drawn from the "Token concept" frame in
	 * the Figma v4 file, with each colour bound to the token the frame uses, so it follows the
	 * site's mode.
	 * @component
	 */

	// The top edge of each layer, from the canvas up to the content layer
	const layers = [234.515, 133.677, 126.677, 118.677, 110.677, 102.677, 94.677, 32.838];

	// Each layer is a diamond: top, right, bottom and left corners
	const diamond = (top: number) =>
		[
			[555.068, top],
			[967.279, top + 215.665],
			[555.068, top + 431.33],
			[142.857, top + 215.665]
		]
			.map((point) => point.join(','))
			.join(' ');

	// Labels for the layers, right of the stack
	const tokens = [
		{ lines: ['canvas'], y: 454.998 },
		{ lines: ['surface', 'surface-muted'], y: 344.159 },
		{ lines: ['text', 'label', 'border'], y: 251.321 },
		{ lines: ['interactive'], y: 221.983 }
	];

	// Labels for the elevation steps, left of the stack
	const elevations = [
		{ text: 'elevation-1 to 6', y: 344.159 },
		{ text: 'elevation-0', y: 454.998 }
	];

	const isometric = 'matrix(0.866025 0.5 -0.866025 0.5';
</script>

<svg
	viewBox="0 0 1159 666"
	role="img"
	aria-label="An interface drawn as layers: the canvas at elevation 0, surfaces at elevations 1 to 6, then text, labels and borders, with interactive elements at the top"
>
	{#each layers as top}
		<polygon class="layer" points={diamond(top)} />
	{/each}
	<text
		class="specimen"
		transform="matrix(0.882948 0.469472 -0.882948 0.469472 762.562 152)"
		y="82.9091">Text</text
	>
	<polygon class="interactive" points={diamond(0)} />

	<text class="heading" x="991.279" y="179.109">Token</text>
	{#each tokens as token}
		<text class="label">
			{#each token.lines as line, i}<tspan x="991.279" y={token.y + i * 24}>{line}</tspan>{/each}
		</text>
	{/each}

	<text class="heading" x="115.5" y="179.109" text-anchor="end">Elevation</text>
	{#each elevations as elevation}
		<text class="label" x="115.5" y={elevation.y} text-anchor="end">{elevation.text}</text>
	{/each}

	<rect class="button" width="77" height="40" transform="{isometric} 557.908 20.4221)" />
	<text class="button-label" transform="{isometric} 563.97 32.9221)" y="16.0909">Button</text>
</svg>

<style>
	svg {
		width: 100%;
		height: auto;
	}

	.layer {
		fill: var(--color-surface);
		stroke: var(--color-surface-accent);
	}

	.interactive {
		fill: none;
		stroke: var(--color-surface-accent);
		stroke-dasharray: 8 8;
	}

	.label,
	.heading {
		fill: var(--color-surface-accent);
		font-size: 16px;
	}

	.heading {
		font-size: 20px;
		font-weight: 500;
	}

	/* Inter's letters overlap their own contours, so a stroke on top draws lines inside the E
	   and X. Painting the stroke under the fill hides them; half the width shows, so it's doubled */
	.specimen {
		fill: var(--color-surface);
		stroke: var(--color-surface-accent);
		stroke-width: 3;
		paint-order: stroke;
		font-size: 96px;
		font-weight: 700;
	}

	.button {
		fill: var(--color-interactive-primary);
	}

	.button-label {
		fill: var(--color-static-white);
		font-size: 14px;
		font-weight: 500;
	}
</style>
