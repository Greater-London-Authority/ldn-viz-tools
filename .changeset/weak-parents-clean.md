---
'@ldn-viz/ui': major
---

FIXED `Tabs` accessibility
FIXED `Sidebar Tabs` accessibility

This change was a response to the accessibility audit. The Tabs component has had a major refactor that improves a11y concerns by using button elements as triggers and properly defining aria attributes, and also changes its api. Now tabs should be created by passing an array of options to the Tabs component rather than the previous use of solts and the manual creation of tabslist and associated tab elements.
The 'Sidebar Tabs' element now inherits from the Tabs component elements and has similar improvements to a11y and also follows the same api. (See the stories on how to construct use these components)
Other changes in this pr are updates to affected stories and the inclusion of example dashboard stories for the fuller use of appshell/ sidebar/ layout combinations (these remain a wip. but the foundations are now in place)
