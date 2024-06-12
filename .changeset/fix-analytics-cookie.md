---
'@ldn-viz/charts': patch
---

CHANGED: Fix an issue in `<AnalyticsAndCookieConsent>` where an application embedded in a non-london.gov.uk website wouldn't load cookie consent properly.
CHANGED: Move general comments in `<AnalyticsAndCookieConsent>` to Svelte module script as comments in head tag scripts are not stripped by the Svelte compiler.
CHANGED: Optimised code in `<AnalyticsAndCookieConsent>` to be more concise and readable.
