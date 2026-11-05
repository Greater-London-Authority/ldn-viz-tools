<script lang="ts">
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import type { Snippet } from 'svelte';
	import { monthlyData } from '../layoutExamples/DemoData/monthlyData';

	interface Props {
		/**
		 * Page heading content, placed first inside the typeset. Layouts that already have a
		 * page heading, such as a report with a banner, leave it out.
		 */
		children?: Snippet;
	}

	let { children }: Props = $props();

	// Spec and data for single line example (default)
	let singleLineData = monthlyData.filter((d) => d.Variable == 'Variable A');

	let singleLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.line(singleLineData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: theme.currentTheme.data.primary,
				tip: true
			})
		]
	});
</script>

<div class="typeset-longform">
	{@render children?.()}

	<p>
		The London City Data Design System (lcd-ds) styles long documents, such as borough profiles and
		briefings. A report uses headings, paragraphs, a chart, lists, a table, code and a figure.
	</p>
	<ObservablePlot
		spec={singleLineSpec}
		data={singleLineData}
		title="In London, Variable A's value has fallen steadily since 2017"
		subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
		alt="Line chart of London's variable A values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration only"
		chartDescription="The line chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
	/>
	<p>
		The text before and after a chart explains what it shows. Authors who put a chart between two
		paragraphs may ask:
	</p>
	<blockquote>
		<p>
			Will the chart's <code>title</code> clash with my <code>h2</code> headings? Do I need to set the
			spacing each time I add a figure?
		</p>
	</blockquote>
	<p>
		No. The document sits in a <code>div</code> with the <code>typeset-longform</code> class, which
		sets the <code>flow-spacious</code> flow context. The context sets the space above each of its direct
		children by what the child is, so a chart between two paragraphs gets more space than a paragraph
		after a paragraph.
	</p>
	<p>
		The typeset also limits the width of each child. Running text is capped at
		<code>--measure-text</code>, 38 times the body size. Charts, tables and figures are capped at
		<code>--measure-wide</code>, 56 times the body size.
	</p>
	<p>
		The roles and their sizes are listed in the <a href="/?path=/docs/foundations-typography--docs"
			>Typography guide</a
		>.
	</p>
	<hr />
	<h2>The elements of a report</h2>
	<p class="subhead-sm">Each element the typeset styles, in order</p>
	<p>
		A report uses the typeset instead of styling each element. Authors add <strong>bold</strong> and
		<em>italic</em> text with plain HTML. There are three reasons:
	</p>
	<ol>
		<li>Every page of the report uses the same sizes and spacing.</li>
		<li>Authors write plain HTML or Markdown and add no classes.</li>
		<li>A change to the theme applies to every report without editing the reports.</li>
	</ol>
	<h3>A third-level heading</h3>
	<p>
		Inside <code>typeset-longform</code>, an <code>h1</code> takes the <code>headline-lg</code>
		role, an <code>h2</code> takes <code>headline-sm</code> and an <code>h3</code> takes
		<code>title-lg</code>. A heading after a paragraph gets more space above it than a paragraph
		does.
	</p>
	<figure>
		<img
			src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
			alt="A red telephone box on a London street with the Elizabeth Tower and Big Ben in the background"
		/>
		<figcaption>
			A figure can be as wide as <code>--measure-wide</code>. The caption is inside the
			<code>figure</code> element, so it sits close to the image.
		</figcaption>
	</figure>
	<p>A short unordered list:</p>
	<ul>
		<li>Each London borough has a profile.</li>
		<li>Every profile uses the same indicators.</li>
	</ul>
	<h2>Stacked headings</h2>
	<h3>A heading straight after another heading</h3>
	<p>
		When one heading follows another, the second has no space above it, so the two read as one unit.
	</p>
	<h3>A heading after a paragraph</h3>
	<p>The next list describes a set of indicators. The first item has three paragraphs.</p>
	<ul>
		<li>
			<p><strong>Employment rate.</strong></p>
			<p>The share of working-age residents in work, compared with the London average.</p>
			<p>The space between paragraphs inside an item is the same as the space between items.</p>
		</li>
		<li>
			<p><strong>Median house price to earnings ratio.</strong></p>
			<p>
				A measure of housing affordability: how many years of local earnings it takes to buy a
				typical home.
			</p>
		</li>
		<li>
			<p><strong>Air quality: annual mean NO₂.</strong></p>
			<p>Nitrogen dioxide concentration at the roadside, compared with the legal limit.</p>
		</li>
	</ul>
	<h2>Code</h2>
	<p>
		A notebook can show the code behind a figure. A code block is readable without a syntax
		highlighter such as <a href="https://highlightjs.org/">highlight.js</a> or
		<a href="https://prismjs.com/">Prism</a>.
	</p>
	<p>This code sets the line in the chart above to the theme's primary data colour:</p>
	<pre><code class="language-js"
			>{`Plot.line(data, {
  x: 'Month',
  y: 'Value',
  stroke: theme.currentTheme.data.primary,
  tip: true
})`}</code
		></pre>
	<p>
		The colour comes from the theme. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy a selection.
	</p>
	<h3>Nested lists</h3>
	<p>A nested list groups points under a main point. This one groups indicators by theme.</p>
	<ol>
		<li>
			<strong>Work and income</strong>
			<ul>
				<li>Employment rate</li>
				<li>Median weekly earnings</li>
			</ul>
		</li>
		<li>
			<strong>Housing</strong>
			<ul>
				<li>Median house price to earnings ratio</li>
				<li>Households in temporary accommodation</li>
			</ul>
		</li>
		<li><strong>Environment</strong></li>
	</ol>
	<p>
		In Markdown, a <code>&lt;li&gt;</code> gets a child <code>&lt;p&gt;</code> only when it has more than
		one paragraph. The typeset spaces both kinds of item the same way.
	</p>
	<ul>
		<li>
			<p><strong>This item has two paragraphs.</strong></p>
			<p>This is its second paragraph.</p>
			<ul>
				<li>These nested items have no <code>&lt;p&gt;</code> tags</li>
				<li>because each has one line</li>
			</ul>
		</li>
		<li>
			<p><strong>This item also has two paragraphs.</strong></p>
			<p>Its spacing matches the item above.</p>
			<ul>
				<li>
					<p>This nested item has two paragraphs, so each is in a <code>&lt;p&gt;</code> tag.</p>
					<p>This is the second one.</p>
				</li>
				<li><p>A nested item with one paragraph in a <code>&lt;p&gt;</code> tag.</p></li>
			</ul>
		</li>
		<li><p>An item with no nested list.</p></li>
	</ul>
	<h2>Description lists</h2>
	<p>
		A description list pairs each term with its definition. A report can use one for a glossary of
		indicators, methodology notes or questions and answers.
	</p>
	<dl>
		<dt>What is the London City Data Design System?</dt>
		<dd>
			The tokens, components and type roles that GLA City Intelligence uses for charts, dashboards
			and reports.
		</dd>
		<dt>What is a type role?</dt>
		<dd>
			A name for what a piece of text does, such as a section heading, a chart title or an axis
			tick. The role sets the size, weight and line height.
		</dd>
		<dt>Why are charts wider than the text?</dt>
		<dd>
			Lines of text are easier to read at a limited width, so <code>typeset-longform</code> caps
			them at <code>--measure-text</code>. Charts, tables and figures need more room, so they are
			capped at <code>--measure-wide</code>.
		</dd>
	</dl>
	<p class="eyebrow">Other elements</p>
	<h2>Links, tables and inline code</h2>
	<p>
		A report links to its sources, like <a href="https://data.london.gov.uk"
			>this link to the London Datastore</a
		>. Links use the <code>--color-interactive-primary-text</code> token and an underline.
	</p>
	<p>A table:</p>
	<table>
		<thead><tr><th>Borough</th><th>Sub-region</th><th>Indicator</th></tr></thead><tbody
			><tr><td>Barking and Dagenham</td><td>East</td><td>Employment rate</td></tr><tr
				><td>Camden</td><td>Central</td><td>House price to earnings</td></tr
			><tr><td>Croydon</td><td>South</td><td>Annual mean NO₂</td></tr><tr
				><td>Hackney</td><td>East</td><td>Green space per resident</td></tr
			><tr><td>Richmond upon Thames</td><td>West</td><td>Recycling rate</td></tr></tbody
		>
	</table>
	<p>
		Inline code can be a token such as <code>--measure-text</code> or a package name such as
		<code>@ldn-viz/charts</code>.
	</p>
	<h3>A heading with <code>code</code> in it</h3>
	<p>
		A methodology section might name a token or function in its heading. Code can also sit inside a
		link, as in this link to the
		<a href="https://github.com/Greater-London-Authority/ldn-viz-tools"
			><code>ldn-viz-tools</code></a
		>
		repository.
	</p>
	<h4>A fourth-level heading</h4>
	<p>
		Inside <code>typeset-longform</code>, an <code>h4</code> takes the <code>title-md</code> role.
		Headings <code>h1</code> to <code>h5</code> each take a role, so they need no class.
	</p>
	<h5>A fifth-level heading</h5>
	<p>
		An <code>h5</code> takes the <code>title-sm</code> role. An <code>h6</code> has no role.
	</p>
	<h3>A third-level heading</h3>
	<h4>With a fourth-level heading straight after it</h4>
	<p>The two headings have no space between them.</p>
</div>
