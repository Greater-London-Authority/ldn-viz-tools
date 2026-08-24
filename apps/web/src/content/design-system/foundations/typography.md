---
title: Typography
description: Coherent and consistent use of type
section: Foundations
navLabel: Typography
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-4.svg
---

<script>
    import TypographyTable from '$lib/components/typography/TypographyTable.svelte'

    const proseRoles = [
        {text: 'Display', usage: 'Large, impactful text for a homepage hero. Sits above the content as page chrome.', class: 'display'},
        {text: 'Headline', usage: 'The hero heading for a subpage — the alternative to Display in the same slot.', class: 'headline'},
        {text: 'Subhead', usage: 'A supporting line immediately beneath a Headline.', class: 'subhead'},
        {text: 'Title 1', usage: 'The top heading within the content itself.', class: 'title-1'},
        {text: 'Title 2', usage: 'The second level of heading.', class: 'title-2'},
        {text: 'Title 3', usage: 'The third level of heading.', class: 'title-3'},
        {text: 'Title 4', usage: 'The fourth and final level of heading.', class: 'title-4'},
        {text: 'Subtitle', usage: 'A supporting line immediately beneath a Title.', class: 'subtitle'},
        {text: 'Lead', usage: 'An introductory or standfirst paragraph, set slightly larger than body text.', class: 'lead'},
        {text: 'Body', usage: 'Default reading text — the paragraphs that make up the content.', class: 'body'},
        {text: 'Body small', usage: 'Secondary or denser reading text.', class: 'body-sm'},
        {text: 'Caption', usage: 'Metadata and the smallest text on the page.', class: 'caption'},
        {text: 'Eyebrow', usage: 'A short overline introducing the heading below it.', class: 'eyebrow'}
        ]

    const productRoles = [
        {text: 'Page head', usage: 'The title of the page. One per page.', class: 'page-head'},
        {text: 'Section head', usage: 'Groups related content within a page. May appear several times.', class: 'section-head'},
        {text: 'Title', usage: 'The title of an object — a card, panel, modal, callout or drawer.', class: 'title'},
        {text: 'Subtitle', usage: 'A supporting line beneath any heading or title.', class: 'subtitle'},
        {text: 'Eyebrow', usage: 'A short overline above a title, and the treatment a Title takes when it steps aside.', class: 'eyebrow'},
        {text: '1,284', usage: 'Metric — a headline figure or hero statistic.', class: 'metric'},
        {text: '87.4%', usage: 'Metric small — a secondary figure, or a KPI within a card.', class: 'metric-sm'},
        {text: 'Body', usage: 'Default interface text — field values, menu items, descriptions.', class: 'body'},
        {text: 'Body small', usage: 'Secondary and denser text — hints, helper text, table cells.', class: 'body-sm'},
        {text: 'Label', usage: 'Identifies a control — buttons, inputs, tabs, navigation items.', class: 'label'},
        {text: 'Label small', usage: 'The same job in dense contexts, and for table column headers.', class: 'label-sm'},
        {text: 'Caption', usage: 'Metadata, badges and the smallest functional text.', class: 'caption'}
        ]

    const chartRoles = [
        {text: 'Title', usage: "The chart's own title, when the chart owns the primary slot.", class: 'title'},
        {text: 'Subtitle', usage: 'A supporting line beneath a chart title.', class: 'subtitle'},
        {text: 'Eyebrow', usage: 'What a chart title becomes when it steps aside for another heading.', class: 'eyebrow'},
        {text: 'Axis title', usage: 'Names an axis, a series, or a legend.', class: 'axis-title'},
        {text: 'Data label', usage: 'Value labels, annotations and legend entries.', class: 'label'},
        {text: '2024', usage: 'Tick — axis and scale labels at the default density.', class: 'tick'},
        {text: '2024', usage: 'Tick small — the smaller tick tier, for denser charts.', class: 'tick-sm'}
        ]
</script>

## Principles

Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. We have developed a typographic system to unify our apps, charts and graphical output. When combined with our spacing rules our designs and interfaces should be balanced and harmonious.

A typographic system is more than a set of sizes. It is a set of decisions — about size, weight, leading and the relationships between them — made once and recorded, so that they need not be made again on every screen. What follows describes those decisions and the reasoning behind them.

### Font

We use the sans serif font Inter. Inter is a variable font family carefully crafted and designed for computer screens, available via Google Fonts under the Open Font License. By using webfonts in our applications we can be reasonably certain that Inter will be used under normal circumstances. All weights are included, so there is no risk of a browser synthesising a bold or a semibold from a lighter face, which produces a coarser letterform than the designed one.

A fallback stack is always provided:

```
"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
"Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
```

### Roles

The system describes type by **role** rather than by size. A role names the job a piece of text does — a control label, the title of a card, the tick on a chart axis — and carries with it every property that job requires: font family, size, weight, line height and letter spacing.

This is the central idea of the system, and it is worth being clear about why. A size on its own is not a decision; it is the outcome of one. Choosing twenty pixels semibold for a card title answers a question that has already been answered elsewhere in the product, and answers it a little differently each time. Naming the role instead means the question is asked once. It also means the answer can be revised centrally: if card titles should sit a step larger, that change is made in one place and everything bound to the role follows.

Roles are what designs and code should reference. Beneath them sits a scale of raw values that the roles draw from. That scale is deliberately private — it is the material the system is built from, rather than a menu to choose from.

### Type sets

Roles are grouped into three **type sets**, each intended for a different kind of surface. A type set is not a different typeface; it is the same ideas tuned for a different reading situation.

| Type set    | Intended for                                                                        |
| ----------- | ----------------------------------------------------------------------------------- |
| **Product** | Applications and dashboards, where information is condensed and tasks are the focus |
| **Prose**   | Long passages of reading — articles, guidance, help content, documentation          |
| **Chart**   | The text in and around a chart — titles, axis labels, ticks and annotations         |

The sets share several role names deliberately. Body means sixteen pixels regular in both Product and Prose, but its line height differs between them: a reading column wants generous leading and a dense interface does not. Naming them the same thing, and letting the set decide the treatment, is what allows a component to be written once and read correctly in either context.

The sets can be combined and will work together, but this should be done with consideration. Reading content placed on an application surface — a help article inside a dashboard, for instance — is better given the Prose set for that whole region than assembled from a mixture of the two.

### The Product set

Product carries fewer roles than Prose, because application chrome has shallower structure than rich content. The sizes shown below are those used on the widest screens; several roles grow with screen size, which is described under _Responsive sizing_.

<div class="not-prose product my-8">
    <TypographyTable items={productRoles} />
</div>

#### The heading ladder

Three roles carry structure, and they behave differently from one another.

**Page head** and **Section head** are page furniture. Each occupies a fixed position — one page title at the top, section heads repeating down the page to group content — so each is named for that position. Section heads are kept deliberately calm, one step above the content beneath them, because they may appear several times and a large heading repeated six times reads as noise rather than as structure.

**Title** is different in kind. It is the general case: the title of an object, at whatever depth that object sits. A card, a panel, a modal, a callout and a drawer all take the same Title. What distinguishes them in a given layout is not a different size but a different treatment, which is what allows the ladder to nest without multiplying the number of roles.

#### One title, three treatments

Every container that can carry a title has one **primary slot**. Whatever occupies that slot takes the dominant treatment. A title that gives up the slot to something else steps down to the eyebrow treatment, or is left out.

| Treatment  | Role       | Size | Weight | When it applies                                                                                |
| ---------- | ---------- | ---- | ------ | ---------------------------------------------------------------------------------------------- |
| Dominant   | `Title`    | 20px | 600    | The element owns its container's primary slot                                                  |
| Demoted    | `Eyebrow`  | 14px | 500    | A title steps aside — for instance a card title yielding to a chart that carries its own title |
| Supporting | `Subtitle` | 16px | 400    | A supporting line sitting beneath a dominant title                                             |

Because all three are real roles rather than informal adjustments, moving a title between treatments is a matter of changing which role it takes. Three worked examples:

- **A card containing one titled chart.** The chart's title is dominant; the card's own title becomes an Eyebrow above it, or is omitted. If the chart is untitled, the card title is dominant.
- **A card containing two equal charts.** Each chart sits in its own panel, and each panel's title is dominant — they are primary within sibling panels rather than competing for one slot. The card title above them becomes an Eyebrow labelling the group.
- **A small chip card holding a single figure.** The label sits in the Eyebrow treatment above the Metric, which is the same treatment a demoted title takes, so a group of chips reads consistently beside a titled card.

#### Metrics

A metric standing alone, or set within flowing text, uses its normal line height. A metric sitting beside labels is a different thing: it is a single value to be aligned with its companions, and a generous line height pushes it out of that alignment, because a tall line box centres the numeral and adds leading that a small label does not have.

In any label or comparison cluster a metric therefore takes a tight, near-single line height, and the cluster is aligned as a unit:

- **Inline** — "1,284 users" reading as one line. Align to the baseline.
- **Stacked** — the figure above its label. The gap between them is then the gap you set, rather than the gap plus leading.
- **Comparison** — a large figure beside a smaller stack of values. Centre these against one another rather than aligning baselines; a large numeral baseline-aligned to a small multi-line block appears to sag.

The comparison values themselves are data labels rather than metrics, and take the existing small roles.

### The Prose set

Prose carries a fuller ladder, because rich content has genuine depth and needs a heading level for each step of it.

<div class="not-prose prose my-8">
    <TypographyTable items={proseRoles} />
</div>

#### Hero and content are separate tiers

The hero slot sits above the content region as page chrome. It holds either a Display, or a Headline with its Subhead — not both. The content region beneath then runs its own count of headings, starting at Title 1, whatever the hero above it happened to be.

The two do not collide because they belong to different structural tiers. This is the same reasoning a content management system follows when it demotes an article's own first heading on a page that already carries a hero heading.

#### Eyebrows

An Eyebrow is a short overline introducing the heading below it. It appears in both Prose and Product and looks the same in each, but it is doing a different job.

In Prose it is a composition choice: a kicker deliberately placed above a heading, used within the titling components rather than in ordinary flowing content. In Product it is what a Title becomes when it steps aside. The shared treatment is intentional, so that the two read consistently wherever they meet, but they remain separate roles belonging to separate sets.

### The Chart set

Charts are a distinct context and carry their own complete vocabulary. Two things justify that, and both need to hold.

The first is that charts have needs the general scale should not carry. A dense chart wants a tick label smaller than anything the interface should use, and lowering the interface floor to accommodate it would affect every screen.

The second is that charts are consumed on their own. Teams build charts against these roles without adopting the rest of the system, and a vocabulary used on its own has to be complete and self-describing on its own terms. Someone naming the text in a chart should not have to learn the application heading ladder first.

<div class="not-prose chart my-8">
    <TypographyTable items={chartRoles} />
</div>

The first three roles carry no values of their own: they refer to their Product equivalents for every property. A chart is an object sitting in a container, so it titles like one — and referring rather than copying means the two cannot drift apart, and the chart inherits the responsive behaviour of the Product roles automatically.

Axis title and Data label match Product's Label and Body small in size and weight, but hold their own values, so that chart anatomy can be adjusted without affecting the interface around it.

There is no separate role for a legend. A legend entry is a data label and takes Data label; a legend's own heading takes Axis title. A dedicated legend role would describe a position rather than a job, which is the test a new role has to pass.

Ticks are single-line by nature and take a line height equal to their font size, so that they sit precisely against axes and gridlines rather than drifting within a taller line box.

### Size, weight and colour are separate

Size, weight and colour are three independent axes, and keeping them separate is what stops the set of roles from sprawling.

Most apparent gaps in a type scale are not missing sizes. A "subtle heading" is a heading in a muted colour. An "emphasised caption" is a caption at a heavier weight. Expressing either as a new size would add a role that describes an appearance rather than a job, and doing that repeatedly is how a set of roles stops meaning anything.

Weight itself divides in two. **Identity weight** is part of what a role is — a Label is medium, a heading is semibold — and it is carried by the role, so it is never chosen separately. **Emphasis weight** rides on top of a role, for a bold run within a paragraph, and stays a separate choice; folding it into the role would mean maintaining a bold variant of every role that might ever need one.

Four weights are in use: regular (400), medium (500), semibold (600) and bold (700).

### Responsive sizing

Screen sizes and resolutions vary, so a single size for a role is not enough. Each role holds a value at each of five breakpoints and resolves itself as the viewport changes.

| Breakpoint | Minimum width | CSS                          |
| ---------- | ------------- | ---------------------------- |
| base       | —             | the default                  |
| `sm`       | 640px         | `@media (min-width: 640px)`  |
| `md`       | 768px         | `@media (min-width: 768px)`  |
| `lg`       | 1024px        | `@media (min-width: 1024px)` |
| `xl`       | 1280px        | `@media (min-width: 1280px)` |

Values are set for the smallest screen first, so that the hierarchy is correct there, and grow upward. The governing rule is that a role never overtakes the role above it and never falls below the role beneath it, at any width. A role therefore only grows if the roles it must stay ordered against grow with it — which is why the Title ladder and the two Metric roles change as groups rather than individually.

#### Prose sizes at each breakpoint

| Role     | base | `sm` | `md` | `lg` | `xl` |
| -------- | ---- | ---- | ---- | ---- | ---- |
| Display  | 40   | 48   | 56   | 64   | 76   |
| Headline | 32   | 36   | 40   | 48   | 56   |
| Subhead  | 28   | 28   | 28   | 28   | 28   |
| Title 1  | 28   | 30   | 32   | 32   | 36   |
| Title 2  | 24   | 26   | 28   | 30   | 30   |
| Title 3  | 22   | 22   | 22   | 24   | 24   |
| Title 4  | 20   | 20   | 20   | 20   | 20   |
| Subtitle | 18   | 18   | 18   | 18   | 18   |
| Lead     | 22   | 22   | 22   | 22   | 22   |
| Body     | 16   | 16   | 16   | 16   | 16   |
| Body sm  | 14   | 14   | 14   | 14   | 14   |
| Caption  | 12   | 12   | 12   | 12   | 12   |
| Eyebrow  | 14   | 14   | 14   | 14   | 14   |

Two coincidences here are intentional. Subhead matches Title 1 at the smallest size only; the two sit in different regions of the page and are told apart by weight and colour. Lead sits above Title 4 at every width, because Lead is body-tier emphasis rather than a rung of the heading ladder, so an introductory paragraph reading slightly larger than a fourth-level subheading is expected.

#### Product sizes at each breakpoint

| Role         | base | `sm` | `md` | `lg` | `xl` |
| ------------ | ---- | ---- | ---- | ---- | ---- |
| Page head    | 28   | 30   | 32   | 32   | 36   |
| Metric       | 28   | 30   | 32   | 32   | 36   |
| Section head | 24   | 24   | 26   | 26   | 28   |
| Title        | 20   | 20   | 20   | 20   | 20   |
| Metric small | 20   | 20   | 20   | 20   | 20   |
| Body         | 16   | 16   | 16   | 16   | 16   |
| Body small   | 14   | 14   | 14   | 14   | 14   |
| Label        | 14   | 14   | 14   | 14   | 14   |
| Caption      | 12   | 12   | 12   | 12   | 12   |
| Label small  | 12   | 12   | 12   | 12   | 12   |

Page head and Metric match at every width. They are a heading and a numeral that rarely sit next to one another, and they grow together so the pairing stays consistent where they do. Metric small sits level with Title for the same reason, with weight separating them.

Chart sizes are the same at every breakpoint.

You can test the roles on this page by resizing your browser, or by emulating a device in your browser's developer tools.

### Line height

Line height follows two policies, chosen by what the text has to align with.

Most roles take a line height rounded to the four-pixel grid that the spacing scale is built on, so that a block of text composes predictably against the margins and gaps around it. It is proportionally tight at the top of the scale and generous at the bottom, which is how a 76px Display and a 12px Caption can both look correctly set.

Two Prose roles are exceptions, and take a line height relative to their own size instead:

| Role          | Size | Line height | Ratio |
| ------------- | ---- | ----------- | ----- |
| Prose Body    | 16px | 26px        | 1.625 |
| Prose Body sm | 14px | 22px        | 1.571 |

These two only, and in the Prose set only. A grid quantised to four pixels cannot express the leading a reading column wants at sixteen pixels: twenty-four is too tight to read comfortably at length, twenty-eight is too airy, and the grid offers no step between them. Product Body deliberately keeps the grid value, because a dense interface wants the tighter setting.

### Space between blocks is not typography

The space between one block and the next belongs to the stack those blocks sit in, not to the type inside them. The same heading wants generous air above it in an article and very little in a dashboard card, so that space is never bundled into a role.

It is handled by [content flow](/design-system/foundations/flow), described separately.

---

## Practice

**This guidance applies to projects using `@ldn-viz/themes` in a project using Tailwind.**

### Setting a type set

A type set is applied as a class on a containing element. Everything inside it resolves its roles from that set.

```html
<article class="prose">…</article>
<section class="product">…</section>
<div class="chart">…</div>
```

The class is required. Role classes read values that exist only inside a type set, so a role used outside one will not size correctly.

An application surface will normally also want a flow context, which governs the space between blocks. The two are separate systems that happen to share the words _product_ and _prose_:

```html
<section class="flow-product product">…</section>
```

### Prose styles its content automatically

Inside `prose`, ordinary HTML elements are styled for you. Headings take the Title ladder, paragraphs take Body, captions take Caption, and links, lists, blockquotes and tables are handled too. Standard content needs no classes.

```html
<div class="prose">
	<h2>Title</h2>
	<p>Body copy.</p>
	<p class="lead">An introductory paragraph.</p>
</div>
```

<div class="border border-color-border-muted p-4 my-4">
	<h2>Title</h2>
	<p>Body copy.</p>
	<p class="lead">An introductory paragraph.</p>
</div>

Headings map by depth: `h1` to `h4` take Title 1 to Title 4. Display and Headline are hero chrome and are never reached from a content heading — they are applied deliberately, by class. There is no fifth level: an `h5` falls back to Body, because Title 4 is the floor of the ladder.

The `prose` class also limits its own width for readability, to a measure of roughly seventy characters. Figures, tables, code blocks and pull quotes are meant to break out wider than that column; body text is not. If a column feels stranded on a wide screen, the answer is to let those elements break out rather than to lengthen the line.

#### Escaping the prose context

Because `prose` styles elements automatically, you will sometimes need to opt out — most often around an embedded component that brings its own styling. Use `not-prose`, at either block or element level.

```html
<div class="prose">
	<h3>Title</h3>
	<div class="not-prose">
		<h3>I have escaped</h3>
	</div>
	<h3 class="not-prose">So have I</h3>
</div>
```

<div class="border border-color-border-muted p-4 my-4">
	<h3>Title</h3>
	<div class="not-prose">
		<h3>I have escaped</h3>
	</div>
	<h3 class="not-prose">So have I</h3>
</div>

### Product requires explicit roles

The `product` class establishes the type set but applies no styling to elements. This is deliberate: an application's markup carries no reliable typographic meaning — a heading element might be a page title or a widget label — so nothing is assumed. Apply the role you want.

```html
<div class="product">
	<h2>No role applied</h2>
	<h2 class="section-head">Section head</h2>
	<p class="body">Body copy.</p>
	<span class="label">Control label</span>
</div>
```

<div class="not-prose product border border-color-border-muted p-4 my-4">
	<h2>No role applied</h2>
	<h2 class="section-head">Section head</h2>
	<p class="body">Body copy.</p>
	<span class="label">Control label</span>
</div>

### Choosing a role for an interface element

These conventions are settled, and are worth applying rather than judging by eye each time. They cover most of what appears in an application.

| Element                                          | Role                                       |
| ------------------------------------------------ | ------------------------------------------ |
| Input label, tab, navigation item, button        | `label` — see _single-line controls_ below |
| Field value, placeholder, menu item              | `body`                                     |
| Helper text, hints, descriptions, secondary copy | `body-sm`                                  |
| Table column header                              | `label`                                    |
| Table cell                                       | `body-sm`                                  |
| Tooltip, badge, tag, metadata                    | `caption`                                  |
| Modal, callout, panel or drawer heading          | `title`                                    |
| Sidebar or navigation section heading            | `label`                                    |
| Chart legend entry                               | `label`, inside `chart`                    |
| Chart axis name                                  | `axis-title`                               |
| Chart tick or scale label                        | `tick`, or `tick-sm` when dense            |

Two of these are worth drawing out. Control and navigation labels take `label` even where older markup used sixteen pixels — a control label is the Label role rather than a larger size. And a sidebar's _section_ headings are labels rather than titles, so that navigation group headings stay small and do not compete with page content.

Where an existing element uses a size from outside the system, move it to the correct role even if that visibly resizes it.

### Single-line controls

`label-tight` and `label-sm-tight` are the same size and weight as `label` and `label-sm`, with the line height reduced to match the font size.

They exist for controls whose text is a single line, vertically centred, where the component's own padding governs its height — buttons, tabs and chips. A reading line height there adds leading that fights the centring and makes the control size unpredictably.

```html
<button class="label-tight">Download</button>
```

These must not wrap. Label text running to more than one line uses the standard `label` or `label-sm`.

### Titling groups

The titling roles are designed to be used together. Write the group as flat sibling elements and give each its role; the spacing between them is handled by the flow system.

```html
<section class="flow-product product">
	<p class="eyebrow">Air quality</p>
	<h2 class="section-head">Nitrogen dioxide</h2>
	<p class="subtitle">Rolling 24-hour mean</p>
</section>
```

<div class="not-prose product flow-product border border-color-border-muted p-4 my-4">
	<p class="eyebrow">Air quality</p>
	<h2 class="section-head">Nitrogen dioxide</h2>
	<p class="subtitle">Rolling 24-hour mean</p>
</div>

The eyebrow closes up to the heading below it, the subtitle closes up to the heading above it, and the larger break that separates one section from the next moves above the whole group. Reproducing the same appearance with generic classes — a small muted paragraph in place of the Subtitle — will look almost identical but will not be recognised as a titling group, and the spacing will be wrong. That is a practical reason to reach for the named role.

### Emphasis and colour

Colour is a separate axis. Bind text colour to a semantic token rather than to a value.

```html
<p class="body text-color-text">Primary text</p>
<p class="body-sm text-color-text-muted">Secondary text</p>
<span class="label text-color-label">Control label</span>
```

Text and label tokens descend in emphasis — `text`, `text-muted`, `text-wash`, and `label`, `label-muted`. Text or an icon sitting on a filled control uses an inverse token so that it themes correctly against the fill. Some roles are already muted by default: Subhead, Subtitle, Lead, Eyebrow and the chart roles.

Where the intent is genuine emphasis within a role, change the weight:

```html
<p class="body">Readings are <span class="font-semibold">provisional</span>.</p>
```

Reach for this when the job is to emphasise. If a role looks wrong at its own weight, the role is usually the thing to reconsider.

### Things to avoid

**Sizes from outside the system.** Tailwind's own `text-xl`, `text-3xl` and similar are not part of this scale. If a role looks wrong at its size, check that the role is right before overriding it.

**Breakpoint variants on type.** Roles already carry a value at every breakpoint, and every breakpoint has been checked to confirm the hierarchy holds. Writing `md:section-head`, or setting a size per breakpoint, works against that.

**Setting a weight alongside a role** in order to reach a particular look. The role carries its own weight.

**Mixing type sets within one region.** Reading content on an application surface is better given its own `prose` container than assembled from a mixture.

**Referring to the private scale.** The raw values beneath the roles are internal to the system, including within a component. Bind to the role.

### A note on the `prose` class

The `prose` class here is our own, and is unrelated to the Tailwind Typography plugin, which this system does not use. The modifiers that plugin provides — `prose-lg`, `prose-invert`, `prose-headings:` and similar — have no effect. Size comes from the roles, and the reading measure is set by `prose` itself.
