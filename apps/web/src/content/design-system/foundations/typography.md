---
title: Typography
description: Coherent and consistent use of type
section: Foundations
navLabel: Typography
---

<script>
    import TypographyTable from '$lib/components/typography/TypographyTable.svelte'

    const typeScaleExamples = [
        {text: 'text-7xl', usage: '', class: 'text-7xl'},
        {text: 'text-6xl', usage: '', class: 'text-6xl'},
        {text: 'text-5xl', usage: '', class: 'text-5xl'},
        {text: 'text-4xl', usage: '', class: 'text-4xl'},
        {text: 'text-3xl', usage: '', class: 'text-3xl'},
        {text: 'text-2xl', usage: '', class: 'text-2xl'},
        {text: 'text-xl', usage: '', class: 'text-xl'},
        {text: 'text-lg', usage: '', class: 'text-lg'},
        {text: 'text-md', usage: '', class: 'text-md'},
        {text: 'text-sm', usage: '', class: 'text-sm'},
        {text: 'text-xs', usage: '', class: 'text-xs'},
        ]

    const typographyExamplesProduct = [
        {text: 'Headline', usage: '', class: 'headline'},
        {text: 'Subhead', usage: 'Text under headline', class: 'subhead'},
        {text: 'Title large', usage: '', class: 'title-lg'},
        {text: 'Title medium', usage: '', class: 'title-md'},
        {text: 'Title small', usage: '', class: 'title-sm'},
        {text: 'Title extra small', usage: '', class: 'title-xs'},
        {text: 'Subtitle', usage: 'Text under a title (medium or large only)', class: 'subtitle'},
        {text: 'Body large', usage: '', class: 'body-lg'},
        {text: 'Body medium', usage: '', class: 'body-md'},
        {text: 'Body small', usage: '', class: 'body-sm'},
        {text: 'Body extra small', usage: '', class: 'body-xs'},
        {text: 'Label large', usage: '', class: 'label-lg'},
        {text: 'Label medium', usage: '', class: 'label-md'},
        {text: 'Label small', usage: '', class: 'label-sm'},
        {text: 'Label extra small', usage: '', class: 'label-xs'},
        ]

    const typographyExamplesProse = [
        {text: 'Display', usage: 'Large, impactful text for grabbing attention.', class: 'display'},
        {text: 'Headline', usage: "To create immediate impact and guide the reader's eye.", class: 'headline'},
        {text: 'Subhead', usage: 'To immediately follow a headline and provide further clarification', class: 'subhead'},
        {text: 'Title large', usage: '', class: 'title-lg'},
        {text: 'Title medium', usage: '', class: 'title-md'},
        {text: 'Title small', usage: '', class: 'title-sm'},
        {text: 'Title extra small', usage: '', class: 'title-xs'},
        {text: 'Subtitle', usage: 'Text under a title (medium or large only)', class: 'subtitle'},
        {text: 'Body large', usage: '', class: 'body-lg'},
        {text: 'Body medium', usage: '', class: 'body-md'},
        {text: 'Body small', usage: '', class: 'body-sm'},
        {text: 'Body extra small', usage: '', class: 'body-xs'},
        {text: 'Caption', usage: '', class: 'caption'}
        ]
</script>

Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. We have developed a typographic system to unify our apps, charts and graphical output. When combined with our spacing rules our designs and interfaces should achieve balance and harmony.

### Font

We use the sans serif font Inter. Inter is a variable font family carefully crafted & designed for computer screens. Inter is available via Google Fonts under the Open Font License. By using webfonts in our applications we can be relatively certain that they will used under normal circumstances. A fallback stack should be provided for online applications

<code>ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"</code>

### Type Scale

Our typescale runs from **xs** to **7xl**

<div class="not-prose my-8">
    <TypographyTable items={typeScaleExamples} />
</div>

### Type Sets

Unlike a type scale a type set includes font weights, line-heights and letterspacing, which have all been carefully selected.

LDNviz has two type sets. **Product** is used within products that are task focussed and information is more condensed. **Prose** is intended for long passages of text where space is less of a premium.

The two sets can be combined and will work together, but this should only be done occasionaly and with consideration.

#### Semantic Type Roles

Our system uses tokens to define type style based on role. These definitions are responsive to screen size allowing use of semantic, descriptive names. The definitions encompass font-family, font-size, font-weight, line-height and letter-spacing.

The different role groupings are:

<table>
<thead>
<tr class="text-left">
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

#### Product type set:

<div class="not-prose my-8 product responsive">
    <TypographyTable items={typographyExamplesProduct} />
</div>

#### Prose type set:

<div class="not-prose my-8">
    <TypographyTable items={typographyExamplesProse} />
</div>

### Responsive font sizes

Because screen size and resolutions vary it is not enough to define a single font size. Our system defines breakpoints at different screen widths, giving us flexibility to size type appropriately.

The breakpoints are:

<table>
<thead>
<tr class="text-left">
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

You can test the elements on this page by resizing your browser or emulating a device in your browsers dev tools.

## Usage

Type sets are defined with the corresponding class on a parent element:

<div class="not-prose">

```html
<div class="prose">...</div>
```

</div>

A <code>responsive</code> class can be added to the type-set defining class in order to achieve font resizing across screen widths

<div class="not-prose">

```html
<div class="prose responsive">...</div>
```

</div>

The <code>prose</code> class provides a semantic typographic context. Elements inside a <code>.prose</code> typographic context inherit semantic typography rules unless explicitly excluded via <code>.not-prose</code>.

<div class="not-prose">

```html
<div class="prose responsive">
	<h2>Title Large</h2>
	<p>Body copy</p>
	<h2 class="not-prose">context escaped</h2>
</div>
```

</div>

<div class="prose responsive border border-secondary p-4 my-4">
	<h2>Title Large</h2>
	<p>Body copy</p>
	<h2 class="not-prose">context escaped</h2>
</div>

The <code>product</code> class does not apply semantic styles. Elements inside a <code>.product</code> typographic context require explicit token classes to be applied. This is by design to allow greater flexibility.

<div class="not-prose">

```html
<div class="product responsive">
	<h2>Title Large?</h2>
	<p class="body-md">Body copy</p>
	<h2 class="title-lg">Title Large</h2>
</div>
```

</div>

<div class="not-prose product responsive border border-secondary p-4 my-4">
	<h2>Title Large?</h2>
	<p class="body-md">Body copy</p>
	<h2 class="title-lg">Title Large</h2>
</div>

In either context utility classes still work:

<div class="not-prose">

```html
<div class="product responsive">
	<p class="body-md font-bold">Body copy</p>
	<h2 class="title-lg text-color-ui-negative">Title Large</h2>
</div>
```

</div>

<div class="not-prose product responsive border border-secondary p-4 my-4">
	<p class="body-md font-bold">Body copy</p>
	<h2 class="title-lg text-color-ui-negative">Title Large</h2>
</div>

### Titling pairs

The type sets contain elements designed to work together such as <code>.headline</code> and <code>.subhead</code> (and the equivelent for titles). In order to keep spacing correct the elements should have explicit classes applied and the <code>.format</code> modifier class.

<div class="not-prose">

```html
<div class="prose responsive">
	<h2 class="title-lg format">Title</h2>
	<p class="subtitle">Title Large</p>
</div>
```

</div>

<div class="border border-secondary p-4 my-4">
    <h2 class="title-lg format">Title</h2>
    <p class="subtitle">Title Large</p>
</div>

### Escaping the prose context

Because of the semantic context it creates you may wish to escape the <code>.prose</code> class. you can do this on block or individual level with the <code>.not-prose</code> class. This acts as an escape hatch from prose styling:

<div class="not-prose">

```html
<div class="prose responsive">
	<h3>Title</h3>
	<div class="not-prose">
		<h3>I have escaped</h3>
	</div>
	<h3 class="not-prose">So have I!</h3>
</div>
```

</div>

<div class="border border-secondary p-4 my-4">
	<h3>Title</h3>
	<div class="not-prose">
		<h3>I have escaped</h3>
	</div>
    <h3 class="not-prose">So have I!</h3>
</div>
