---
'@ldn-viz/ui': patch
---

Fix `AppShell` sidebar placement being lost during HMR and client-side navigation

`<Sidebar>` wrote its own `placement` prop into the shared sidebar state when it
initialised, overwriting the value `<AppShell>` had resolved from its
`sidebarPlacement` breakpoints. Which write landed last depended on
initialisation order, which differs between a cold page load and a re-mount, so
a sidebar configured as `{ initial: 'left' }` could appear on the right after an
HMR update or a SvelteKit navigation, and one configured as `{ initial: 'bottom' }`
could slide in from the side instead of rising from the bottom.

Placement is now pulled from a single source rather than written by two
components, so it cannot go stale or depend on mount order. `<AppShell>` supplies
the breakpoint-resolved value; an explicit `placement` prop on `<Sidebar>` still
overrides it, and now tracks changes to that prop instead of freezing at its
first value.
