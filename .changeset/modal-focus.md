---
'@ldn-viz/ui': patch
---

FIXED: `Modal` moves focus from the trigger to the dialog when it opens, so a screen reader reads its title and description. The `title` snippet is now required, because it names the dialog. The description is only rendered when a `description` snippet is passed. The title is set in `.title-sm` to match Figma.
