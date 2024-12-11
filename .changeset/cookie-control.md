---
'@ldn-viz/ui': patch
---

FIXED: updated `AnalyticsAndCookieConsent` and `CookieControlSettings` components to avoid errors if they are rendered
before `window.CookieControl` is initialized
