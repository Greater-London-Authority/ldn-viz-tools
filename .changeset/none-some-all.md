---
'@ldn-viz/ui': minor
---

ADDED - `Sidebar` component for providing a customisable sidebar component that is fixed to the viewport. This includes `$sidebarOpen` and `$sidebarLayout` Svelte stores.
ADDED - `SidebarToggle` component as the default hood for sidebars that enables the sidebar to be opened and closed.
ADDED - `SidebarContent` component for laying out sidebar content in the standard way.
ADDED - `NotSidebar` component for auto-relayout of non-sidebar content when `Sidebar` changes it's layout due to resize or toggling open-closed.
ADDED - `SidebarHeader` as an inner `SidebarContent` element for specifying an application's title, description, and more info using the standard styling.
ADDED - `SidebarSection` as an inner `SidebarContent` element for semantically organising the main sidebar content.
ADDED - Sidebar stories to document the component and various sub components.
