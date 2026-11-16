---
'@ldn-viz/ui': patch
---

FIXED: `AnalyticsAndCookieConsent` applies its cookie banner style overrides. The compiler had removed them because `<style global>` isn't supported.
