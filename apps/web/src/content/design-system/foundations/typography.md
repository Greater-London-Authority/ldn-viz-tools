---
title: Typography
description: Coherent and consistent use of type
section: Foundations
navLabel: Typography
---

Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. We have developed a typographic system to unify our apps, charts and graphical output. Combined with our spacing rules our designs and interfaces should achieve balance and harmony.

### Font

We use the sans serif font Inter. Inter is a variable font family carefully crafted & designed for computer screens. Inter is available via Google Fonts under the Open Font License. By using webfonts in our applications we can be relatively certain that they will used under normal circumstances. A fallback stack should be provided for online applications

<code>ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"</code>

### Responsive font sizes

Because screen size and resolutions vary it is not enough to define a single font size. Our system defines breakpoints at different screen widths, giving us flexibility to size type appropriately.

The breakpoints are:

<table>
<thead>
<tr>
<th>Breakpoint prefix</th>
<th>Minimum width</th>
<th>CSS</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sm</code></td>
<td>640px</td>
<td><code>@media (min-width: 640px)</code></td>
</tr>
<tr>
<td><code>md</code></td>
<td>768px</td>
<td><code>@media (min-width: 768px)</code></td>
</tr>
<tr>
<td><code>lg</code></td>
<td>1024px</td>
<td><code>@media (min-width: 1024px) </code></td>
</tr>
<tr>
<td><code>xl</code></td>
<td>1280px</td>
<td><code>@media (min-width: 1280px) </code></td>
</tr>
<tr>
<td><code>2xl</code></td>
<td>1536px</td>
<td><code>@media (min-width: 1536px) </code></td>
</tr>
</tbody>
</table>

### Semantic Type Roles

Our system uses tokens to define type style based on role. These definitions are responsive to screen size allowing use of semantic, descriptive names. The definitions encompass font-fmaily, font-size, font-weight, line-height and letter-spacing.

The different role groupings are:

<table>
<thead>
<tr>
<th>Role</th>
<th>Use Case</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Display</b></td>
<td>Large, impactful text for grabbing attention.</td>
</tr>
<tr>
<td><b>Headline</b></td>
<td>To create immediate impact and guide the reader's eye.</td>
</tr>
<tr>
<td><b>Subhead</b></td>
<td>To immediately follow a headline and provide further clarification</td>
</tr>
<tr>
<td><b>Title</b></td>
<td>To provide waymarkers, define hierachy and impart information thoughout an application</td>
</tr>
<tr>
<td><b>Subtitle</b></td>
<td>To immediately follow a title element and provide further clarification</td>
</tr>
<tr>
<td><b>Body</b></td>
<td>Passages of copy and bodies of text.</td>
</tr>
<tr>
<td><b>Label</b></td>
<td>Used for single-line scenarios, and labelling discrete elements of the ui.</td>
</tr>
</tbody>
</table>

Within the **Body**, **Title**, and **Label** type roles there are further size qualifiers to allow greater flexibility
