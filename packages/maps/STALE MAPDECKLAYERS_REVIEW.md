# Review: `src/lib/mapDeckLayers/`

Scope: `canvasIconLayer/`, `clusterLayer/` (layer + renderers), `multiClusterLayer/`, `nonOverlappingLayer/` (layer + `movePoints`), their stories, and the uncommitted working-tree changes on `deckgl-layers`.

Checks run:

- `vitest run src/lib/mapDeckLayers`: 29/29 pass (`movePoints.test.ts` only).
- `svelte-check`: the only errors in this directory are the two introduced by the uncommitted story change (see #1).
- deck.gl behaviour was checked against the installed `@deck.gl/core` 9.3.1 source.

Overall the code is in good shape. The layering is clean: supercluster handles clustering, `NonOverlappingGlyphLayer` handles layout, and renderers are plain functions. Comments explain _why_, `movePoints` is well tested, and the neighbour-pruning in `reposition` is correct (the bucket indexing and iteration cut-off check out). The main problems are one broken story change, a per-frame re-render cost that affects every layer here, and a handful of edge cases.

---

## Medium

### 7. Picking a cluster calls `getLeaves(…, Infinity)` on every hover event

`ClusterLayer.getPickingInfo` (`clusterLayer.ts:150`) walks the whole cluster on every pointer move when `pickable` + `onHover` are used. The existing TODO ("prop to specify limit?") is worth doing, or return a lazy `getPoints()` instead of an eager array.

`MultiClusterLayer` avoids this by precomputing `points` for every glyph at each integer zoom (`multiClusterLayer.ts:248`). That is O(N) memory and time per zoom change. Acceptable, but it's the same trade-off in the other direction.

---

## Low

### Behaviour and correctness

- **`WORLD_BOUNDS` query returns every cluster globally.** This is deliberate (no recompute on pan), but at high zoom with large datasets every point is passed to the renderers.

### Consistency across renderers

- **Count text differs between renderers:** `circleClusters` uses `abbreviateCount(props.getPointCount(f))`. `donutClusters` reads `f.properties.point_count_abbreviated` directly (`donutClusters.ts:148`), which bypasses the `getPointCount` abstraction and would break for non-supercluster rows (as `MultiClusterLayer` supplies). `splitClusters` uses `String(p.count)` with no abbreviation (`splitClusters.ts:225`), so a category with ≥1000 points shows `1234` in a circle sized for 3 characters. Use `abbreviateCount` everywhere and add `k` and `.` to the split `characterSet`.
- **Three different "grey" fallbacks:** `FALLBACK = [180,180,180]` in donut/split, and `DEFAULT_COLOR = [128,128,128]` in multi. All three docs just say "drawn in grey". Share one constant.
- **Donut outline is only drawn with more than one slice.** The `strokeColor` doc says it is "the outline of the ring", but single-category donuts get no outline (`donutClusters.ts:101`).
- **Unnecessary `zoom` triggers:** `circlePoints` puts `props.zoom` in the `getFillColor` trigger (colour doesn't depend on zoom), and `circleClusters` puts it in `getRadius`/`getSize` (radius depends only on count). This is harmless today because data changes with zoom anyway, but misleading.
- **`getPosition` differs between layers:** `NonOverlappingGlyphLayer` uses `type: 'accessor'` (constants allowed), while `ClusterLayer` and `MultiClusterLayer` use `type: 'function'`.
- **Split-cluster picking loses the category.** Picking a split circle resolves to the whole cluster, so consumers can't tell which category was clicked. Consider adding the row's `key` to `ClusterPickingObject`.
- **`MultiClusterLayer` doesn't expose `expansionZoom`/`clusterId`,** so "click to zoom into cluster" (easy with `ClusterLayer`) isn't possible. It also hard-codes the leader-line options (`leaderLineEndRadius: 2`, no `showLeaderLines`/`leaderLineColor` passthrough).

### Duplication

- `WORLD_BOUNDS` is defined in both `clusterLayer.ts:23` and `multiClusterLayer.ts:79`.
- `NonOverlappingGlyphLayer`'s `positionOf` and `radiusOf` accessor resolvers have the same shape, and could share a helper.
- The supercluster load (wrapping each datum as a Point feature with the datum as `properties`) appears in both cluster layers, which could share a small helper.

---

## Test coverage gaps

Only `movePoints` has tests. Cheap, high-value additions (none need WebGL):

- `tallyBy`: order handling, omission of zero-count keys, keys not in `order`.
- `abbreviateCount`, `clusterRadiusRamp`, `pointRadiusRamp`: boundary values (999/1000/9999/10000, clamping).
- `computeLayout` in `nonOverlappingGlyphLayer.ts`: export it and test with identity `project`/`unproject` and `pixelsPerUnit`.
- `splitClusters` row geometry: call the renderer with a fake `props` and assert offsets and spread (e.g. 2 parts sit side by side, and 3+ parts are placed at `R = r / sin(π/n)`).
- A regression test for `zoomStep: 0` (now clamped to `MIN_ZOOM_STEP`).
