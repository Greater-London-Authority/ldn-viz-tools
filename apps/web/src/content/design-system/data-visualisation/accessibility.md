---
title: Accessibility
description: Making data insights available to all
section: Data visualisation
navLabel: Accessibility
---

## Principles

As an inherently visual medium, it can be challenging to make data visualisation accessible. Guidance within the field is constantly evolving and best practices are still being refined.

However, we believe:

- **Accessible design is good design** - Making your work clear, concise and uncluttered are good general design principles, as well good for accessibility.

- **Provide equity of insight** - A well designed chart should provide an insight into a dataset. Make the chart as visually accessible as possible, but communicate the insight with well written text.

## Practice

### Colour choices

Your goal is to make your colours as accessible as possible, to as many people as possible, while still maintaining clarity and elegance, so try to use as few colours as possible.

This requires balancing brand, meaning, context, differentiation and contrast. It’s not an easy task!

If your visualisation uses more than two or three colours, you’ll want to keep a closer eye on accessibility and differentiation. 

Our categorical colour palettes and chart themes are well tested and should be your default choice. [See more on data visualisation colour](/design-system/data-visualisation/colour)

### Differentiation

When choosing colours from our palettes, you may still want to check some combinations can be easily differentiated by people with different colour vision. [This is a good tool for checking differentiation](https://projects.susielu.com/viz-palette)

### Contrast

This is one of many good tools for checking colour contrast between foreground and background colours. - [https://colourcontrast.cc/](https://colourcontrast.cc/)

Remember, disability may not be a permanent physical condition. It will be something that we all suffer either temporarily or situationally. For example, good colour contrast is important not just for people with impaired vision, but for users of small devices, or in bright sunshine etc.

[See more on data visualisation colour](/design-system/data-visualisation/colour)

### Use descriptive headlines

_“Say what you see”_ - Writing opinionated and descriptive headlines for your charts is helpful to all readers. Tell people what you want them to see in the chart. What insight is it revealing?

### Alt Text

When writing the descriptive text for your charts, think about the insights the data the visualisation is providing into the data. Provide that insight to the user, not just a description of the chart type.

This will help everyone understand your chart better.

For example:

- **Don’t say:** _“A line chart showing the number of bus journeys in London per month.”_

- **Do say:** _“A line chart showing the number of bus journeys in London per month from 2020 to 2024. Bus journeys fell during the pandemic from 1,000 per month in January 2020, to 200 per month in March 2020. They have since recovered to a higher level of 1,200 per month in April 2023”_.

### Summary statistics

In a dashboard context (where data can change based on a user’s selections), providing “human insight” may not be possible. In this case, at least provide summary statistics, like number of data points, date range, highest value, lowest value, mean, median, and trend.

### Keyboard navigation

If appropriate, provide a keyboard accessible way of navigating the data points of the chart. However, this could lead to users being trapped tabbing through endless data points. 

### Image format

SVG (scalable vector graphics) based graphics are a good choice, as they will stay sharp and readable however much a user zooms in. Bitmap graphics (PNG / JPG) will become blurry and pixelated. 

### Provide the data

Where possible also link to the underlying data for the chart, allowing users to perform their own analysis, or produce their own visualisation.

---

## Further reading

- [https://www.w3.org/WAI/tutorials/images/complex/](https://www.w3.org/WAI/tutorials/images/complex/)
- [https://nightingaledvs.com/visual-accessibility-barriers-change/](https://nightingaledvs.com/visual-accessibility-barriers-change/)
- [https://nightingaledvs.com/visual-accessibility-resources/](https://nightingaledvs.com/visual-accessibility-resources/)
- [https://chartability.fizz.studio/](https://chartability.fizz.studio/)
- [https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [https://accessibility.blog.gov.uk/2023/04/13/text-descriptions-for-data-visualisations/](https://accessibility.blog.gov.uk/2023/04/13/text-descriptions-for-data-visualisations/)
- [https://vis.mit.edu/pubs/vis-text-model.pdf](https://vis.mit.edu/pubs/vis-text-model.pdf)
- [https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/](https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/)
- [https://intranet.london.gov.uk/resources-business-improvement/digital-experience-unit/digital-team/introduction-digital-accessibility](https://intranet.london.gov.uk/resources-business-improvement/digital-experience-unit/digital-team/introduction-digital-accessibility)
- [https://neurodiversity.design/](https://neurodiversity.design/)
- [https://fossheim.io/writing/posts/accessible-dataviz-design/](https://fossheim.io/writing/posts/accessible-dataviz-design/)
- [https://github.com/UKHomeOffice/posters/blob/master/accessibility/dos-donts/posters_en-UK/accessibility-posters-set.pdf](https://github.com/UKHomeOffice/posters/blob/master/accessibility/dos-donts/posters_en-UK/accessibility-posters-set.pdf)
