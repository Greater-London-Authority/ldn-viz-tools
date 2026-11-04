# @ldn-viz/maps

Svelte components for maps, built on [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) and styled with the London City Data Design System (LCD-DS). The package has:

- `Map`, which creates a MapLibre map and switches its basemap with light and dark mode
- map controls, such as zoom, fullscreen, geocoder and location search, positioned with `MapControlGroup`
- `MapDeckOverlay` and layers for [deck.gl](https://deck.gl/), and `MapLayerSource` and `MapLayerView` for MapLibre layers
- `MapDraw`, for drawing areas with [Terra Draw](https://terradraw.io/)
- Ordnance Survey basemap styles, and constants such as `GREATER_LONDON_BOUNDS`

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) documents each component.

## Install

```sh
npm i @ldn-viz/themes @ldn-viz/ui @ldn-viz/maps
```

The package needs `@ldn-viz/themes`, `@ldn-viz/ui` and Svelte 5.33 or later. Set up the theme CSS and the Tailwind preset as described in [`@ldn-viz/ui`](https://www.npmjs.com/package/@ldn-viz/ui).

## Use

The default basemaps come from the Ordnance Survey API, which needs a key from the [OS Data Hub](https://osdatahub.os.uk/). Pass it with `appendOSKeyToUrl`:

```svelte
<script>
	import { Map, MapControlGroup, MapControlZoom, appendOSKeyToUrl } from '@ldn-viz/maps';

	const OS_KEY = 'your-key';
</script>

<div class="h-[600px]">
	<Map options={{ transformRequest: appendOSKeyToUrl(OS_KEY) }}>
		<MapControlGroup position="TopLeft">
			<MapControlZoom />
		</MapControlGroup>
	</Map>
</div>
```

## Links

- [Storybook](https://greater-london-authority.github.io/ldn-viz-tools)
- [Changelog](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/maps/CHANGELOG.md)

## Licence

MIT
