---
'@ldn-viz/maps': patch
---

CHANGED: be more more permissive in loading GeoJSON that wasn't created with TerraDRaw or the MapDrawing component, by defaulting tool to be polygon and replacing feature ids with a UUID4 (if they aren't already)

