---
'@ldn-viz/ui': minor
---

- CHANGED: toaster now interprets a `timeToLive` of `0` as infinity (as it does for negative values), rather than DEFAULT_TIME_TO_LIVE

- CHANGED: `classNames` now trims whitespace within a single argument

- FIXED: `NavigationMenu` can now return matches for a item with no href (if there is no more specific match)
