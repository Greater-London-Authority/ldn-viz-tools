# Review: `mapDeckLayers`

Reviewed on 2026-09-24, on branch `deckgl-layers`, against deck.gl 9.3.1.

Scope: the source files in `src/lib/mapDeckLayers` (about 1,700 lines, not counting stories). The 33 tests in `movePoints.test.ts` pass, and they are the only tests.

The design holds up: the renderer-factory pattern, `makeRow` for picking, and the neighbour pruning in `movePoints` all look correct. I traced the bucket/`shift()` indexing in `movePoints`; it stays in bounds and has the right meaning.

Findings are ranked by severity. Issues 1 and 2 are worth fixing before merge.

## Bugs

### 3. The non-overlapping layout goes wrong on a pitched map

Where: [nonOverlappingGlyphLayer.ts:160](src/lib/mapDeckLayers/nonOverlappingLayer/nonOverlappingGlyphLayer.ts#L160), [nonOverlappingGlyphLayer.ts:266](src/lib/mapDeckLayers/nonOverlappingLayer/nonOverlappingGlyphLayer.ts#L266)

- `viewport.project` returns screen pixels. Without pitch, screen pixels are an affine transform of world space (scale, rotation and translation), so a layout computed once stays valid while panning.
- MapLibre allows pitch by default, via right-drag. With pitch, the layout is distorted by perspective.
- The layout is also never recomputed on pan or pitch, because `shouldUpdateState` ignores those changes.

Suggested fix: use `viewport.projectFlat` and `viewport.unprojectFlat`, and scale radii by `2^-layoutZoom`. This works regardless of pan, bearing and pitch, and it also simplifies the `pixelsPerUnit` calculation.

## Performance

### 4. Every hover walks the whole cluster

Where: [clusterLayer.ts:152-157](src/lib/mapDeckLayers/clusterLayer/clusterLayer.ts#L152-L157)

- `getPickingInfo` runs on every pointer move over a pickable layer. Each time, it calls `getLeaves(id, Infinity)` and `getClusterExpansionZoom`.
- At low zoom with a large dataset, that allocates an array of up to N points on every mouse move.

Suggested fix: make `points` a lazy getter, or only fill it when `params.mode === 'query'`.

## Lower severity

### 5. `NonOverlappingGlyphLayer` defaults are pixel-sized values in meter units

Where: [nonOverlappingGlyphLayer.ts:135-143](src/lib/mapDeckLayers/nonOverlappingLayer/nonOverlappingGlyphLayer.ts#L135-L143)

- The defaults are `radiusUnits: 'meters'`, `leaderLineEndRadius: 1.5` and `getGlyphRadius: 10`.
- At city zoom levels, a 1.5 m end marker is well under a pixel wide, so it is invisible.
- `MultiClusterLayer` avoids the problem only because it sets `radiusUnits: 'pixels'`.

### 6. Defining `data` as `type: 'array'` removes deck's async loading

Where: [clusterLayer.ts:33](src/lib/mapDeckLayers/clusterLayer/clusterLayer.ts#L33), and the same definition in the other layers.

- deck defines `data` as `{ type: 'data', async: true }`. Overriding it as `type: 'array'` removes `async: true`, so passing a URL string no longer loads data. It crashes on `.map` instead.
- The `compare: 1` in that definition has no effect, because deck compares `data` by reference, separately from other props.

### 8. `donutClusters` reads `point_count_abbreviated` directly

Where: [donutClusters.ts:148](src/lib/mapDeckLayers/clusterLayer/renderers/donutClusters.ts#L148)

- It should use `abbreviateCount(props.getPointCount(f))` instead of `f.properties.point_count_abbreviated`.
- As written, it breaks with any caller that supplies its own `getPointCount`. That is how `MultiClusterLayer` reuses `circleClusters`.

## Cleanups

- `getSize: [props.zoom]` in `circleClusters` and `donutClusters` has no effect, because the data array already changes whenever the zoom does. Commit 563db7b2 looks like it missed these two.

- `WORLD_BOUNDS` is defined in both `clusterLayer.ts` and `multiClusterLayer.ts`. It could be exported once from `clusterLayer.ts`, next to `isCluster`.
- `clusterRows.ts` only contains `tallyBy`, so the file name is misleading.
