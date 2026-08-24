<script module lang="ts">
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { format } from 'd3-format';
	import { monthlyData } from '../../../../charts/src/data/demoData';

	let { Story } = defineMeta({
		title: 'Ui/Example Layouts/Typography',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});

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

<Story name="Typography">
	<div class="container py-16">
		<div class="flow-prose prose">
			<!-- Hero cluster — eyebrow kicker, headline and subhead couple tight to the title -->
			<p class="eyebrow">GLA City Intelligence</p>
			<h1 class="headline">State of London</h1>
			<p class="subhead">A sample data notebook, styled by the London City Data Design System</p>

			<p class="lead">
				This page is an example of long-form analytical content — the kind of borough profile or
				briefing where a paragraph sets up a chart, a chart earns a table, and a table needs a
				footnote.
			</p>
			<p>
				The words here are placeholder, but every element is real, so we can see how the London City
				Data Design System (lcd-ds) styles a whole document rather than a single component. Think of
				it as a stand-in for a City Intelligence notebook about London.
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
				A chart like the one above rarely stands alone. It sits inside a train of thought, and the
				text around it has to carry its own weight without fighting the figure for attention. A
				common worry when a document mixes elements is:
			</p>
			<blockquote>
				<p>
					Won't the chart's <code>title</code> clash with my <code>h2</code> headings? Do I have to hand-tune
					spacing every time I drop a figure between two paragraphs?
				</p>
			</blockquote>
			<p>
				The answer is no. Vertical rhythm is a property of the context, not of the type inside it.
				Wrapping the document in a <code>div</code> element with the <code>flow-prose</code> class
				applied means consecutive blocks — a
				<code>p</code>, a figure, a heading — space themselves, so a chart between two paragraphs
				lands with the <em>right</em> gap, not an arbitrary one.
			</p>
			<p>
				The <code>flow-prose</code> context also caps reading columns at a legible width through
				<code>--readable-width</code>, while letting wide elements like charts and tables
				<em>break out</em> beyond the column when they need the room.
			</p>
			<p>
				The rest of this page runs through every typographic element the system styles, so we can
				confirm they all hold up together:
			</p>

			<p>
				For the full vocabulary — roles, families and the one binding rule — see the <a
					href="/?path=/docs/ui-typography--docs">Typography guide</a
				>.
			</p>
			<hr />
			<h2>What to expect from here on out</h2>
			<p class="subtitle">A tour of every element the design system styles</p>
			<div>
				<p>
					What follows is placeholder copy standing in for the body of a report, written to exercise
					the design system itself. It works through every sensible typographic element a notebook
					might use, such as <strong>bold text</strong>, unordered lists, ordered lists, code
					samples, block quotes, <em>and even italics</em>.
				</p>
			</div>
			<p>It's worth covering all of these, for a few reasons:</p>
			<ol>
				<li>A document should read as one coherent piece, not a pile of mismatched components.</li>
				<li>Authors bind text to a role and let the system pick the size, weight and rhythm.</li>
				<li>
					When a report is exported or re-themed, the same roles carry the hierarchy across every
					surface without a rewrite.
				</li>
			</ol>
			<p>Now we're going to try out another heading level.</p>
			<h3>Good typography should be invisible</h3>
			<p>
				That's a level-three heading — with any luck the ladder from title to subtitle to body reads
				clearly, and you notice the argument rather than the type.
			</p>
			<p>A principle the design system keeps coming back to:</p>
			<blockquote>
				<p>
					Bind to a role, never to a size. Every piece of text has a job — a section head, a chart
					title, an axis tick — and the system already names it. Pick the role and the rest arrives
					with it.
				</p>
			</blockquote>
			<p>Images should sit comfortably in the flow as well:</p>
			<figure>
				<img
					src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
					alt="A red telephone box on a London street with the Elizabeth Tower and Big Ben in the background"
				/>
				<figcaption>
					A figure can break out wider than the reading column when it needs the room. The caption
					stays with its image because the two are wrapped together in a single <code>figure</code>.
				</figcaption>
			</figure>
			<p>Here is an unordered list, to check that shorter items look right in the flow as well:</p>
			<ul>
				<li>Each London borough gets its own profile.</li>
				<li>Every profile shares the same set of indicators.</li>
				<li>Later in this page we'll use longer, more complex list items.</li>
			</ul>
			<p>And that's the end of this section.</p>
			<h2>What if we stack headings?</h2>
			<h3>A subheading can follow straight after</h3>
			<p>
				Sometimes a section head is followed immediately by a lower-level heading, with no paragraph
				in between. The flow rule handles this: consecutive headings tuck closer together than a
				paragraph-then-heading pair would, so the pair reads as one unit.
			</p>
			<h3>When a heading comes after a paragraph …</h3>
			<p>
				When a heading follows body text it gets a little more space, as above, to signal a fresh
				section. Now let's see what a more complex list looks like — the kind used to annotate a set
				of indicators.
			</p>
			<ul>
				<li>
					<p><strong>Employment rate.</strong></p>
					<p>
						The share of working-age residents in work. It's a headline indicator, so it usually
						leads a borough profile and anchors the comparison against the London average.
					</p>
					<p>
						List items like this often run to two or three paragraphs, so the spacing between the
						paragraphs, the item's lead-in, and the gap to the next item all has to make sense
						together. Getting that rhythm right is exactly what the <code>flow</code> context is for.
					</p>
				</li>
				<li>
					<p><strong>Median house price to earnings ratio.</strong></p>
					<p>
						A measure of housing affordability — how many years of local earnings it takes to buy a
						typical home. It pairs naturally with the employment indicator above, which is why the
						two sit together in the same list.
					</p>
				</li>
				<li>
					<p><strong>Air quality: annual mean NO₂.</strong></p>
					<p>
						Nitrogen dioxide concentration at the roadside, against the legal limit. Three items
						read as a genuine list rather than a pair, and there is plenty more we could add. Filter
						the data yourself and press <kbd>Enter</kbd> to re-run the notebook.
					</p>
				</li>
			</ul>
			<p>
				A list like this usually closes with a sentence or two, because jumping straight to the next
				heading looks abrupt.
			</p>
			<h2>Code should look okay by default.</h2>
			<p>
				Data notebooks often show the query or snippet behind a figure. Most authors will reach for
				a syntax highlighter such as <a href="https://highlightjs.org/">highlight.js</a>
				or <a href="https://prismjs.com/">Prism</a>, but a code block should still read
				<em>okay</em> out of the box, even with no highlighting.
			</p>
			<p>Here's roughly how you set the chart above to use the design system's data colour:</p>
			<!-- <pre><code class="language-js">Plot.line(data, {
	  x: 'Month',
	  y: 'Value',
	  stroke: theme.currentTheme.data.primary,
	  tip: true,
	})
	  </code></pre> -->
			<p>Binding to the theme's data colour means the chart re-themes with the rest of the page.</p>
			<h3>What about nested lists?</h3>
			<p>
				Nesting is best used sparingly — deep hierarchies are hard to scan on screen — but reports
				do occasionally need a level of structure beneath a point, so the system has to style it
				well.
			</p>
			<ol>
				<li>
					<strong>Keep structure shallow where you can.</strong>
					<ul>
						<li>
							A flat list is easier to scan than a nested one, so reach for nesting only when the
							sub-points genuinely belong to their parent.
						</li>
						<li>
							The same holds for navigation in a dashboard — keep it as flat as the content allows.
						</li>
						<li>
							And for the folders in a codebase, deep trees tend to hide more than they organise.
						</li>
					</ul>
				</li>
				<li>
					<strong>When you do nest, one level usually says enough.</strong>
					<ul>
						<li>Two levels covers almost every real report.</li>
						<li>Three is rare, and worth pausing over before you commit to it.</li>
						<li>Beyond that, a table or a set of subheadings is almost always clearer.</li>
					</ul>
				</li>
				<li>
					<strong>Three items read as a list; two barely do.</strong>
					<ul>
						<li>Vary the length of items so the list doesn't look mechanical.</li>
						<li>Let the indent and marker do the work — no manual spacing needed.</li>
						<li>Then close the point and move on.</li>
					</ul>
				</li>
			</ol>
			<p>
				One quirk of Markdown: a <code>&lt;li&gt;</code> only gets a child <code>&lt;p&gt;</code>
				when it holds more than one paragraph. The design system styles both the wrapped and unwrapped
				cases so single-line and multi-paragraph items sit together cleanly.
			</p>
			<ul>
				<li>
					<p><strong>Take this nested list as an example.</strong></p>
					<p>This top-level item has a second paragraph.</p>
					<ul>
						<li>These items won't get <code>&lt;p&gt;</code> tags</li>
						<li>because they are only one line each</li>
					</ul>
				</li>
				<li>
					<p><strong>But this second top-level item will.</strong></p>
					<p>Its spacing has to stay consistent with the item above.</p>
					<ul>
						<li>
							<p>
								Because this item runs to a second line, it now carries a <code>&lt;p&gt;</code>
								tag of its own.
							</p>
							<p>And this is that second line.</p>
						</li>
						<li><p>Then one more item, so it reads as a proper list.</p></li>
					</ul>
				</li>
				<li><p>A closing item, with no nested list beneath it.</p></li>
			</ul>
			<p>And a sentence to close off the section.</p>
			<h2>We didn't forget about description lists</h2>
			<p>
				Description lists earn their keep in a data notebook — a glossary of indicators, a set of
				methodology notes, or an FAQ that sits alongside the numbers. Each term pairs with its
				definition, and the design system keeps that pairing tight.
			</p>
			<dl>
				<dt>What is the London City Data Design System?</dt>
				<dd>
					A shared toolkit of tokens, components and typography roles (lcd-ds) that GLA City
					Intelligence uses to build charts, dashboards and reports that look and behave as one
					system.
				</dd>
				<dt>What does "bind to a role, not a size" mean?</dt>
				<dd>
					Every piece of text has a job — a section head, a chart title, an axis tick. You choose
					the role and the size, line-height and weight come with it, so the hierarchy stays
					consistent across every surface.
				</dd>
				<dt>Why cap the reading column but let charts break out?</dt>
				<dd>
					Body text is easiest to read at a limited measure, so <code>flow-prose</code> caps it via
					<code>--readable-width</code>. Charts, tables and figures carry more information, so
					they're allowed to break out wider than the column when the viewport gives them room.
				</dd>
			</dl>
			<p class="eyebrow">Building blocks</p>
			<h2>There are other elements we need to style</h2>
			<p>
				Links matter in a notebook that cites its sources, like <a href="https://data.london.gov.uk"
					>this link to the London Datastore</a
				>. They pick up a semantic colour token rather than a raw value, so they stay legible and
				on-brand in both light and dark themes.
			</p>
			<p>Tables carry the numbers behind the prose. Here's an illustrative one:</p>
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
				Inline code should read cleanly too — whether that's a token like <code
					>--readable-width</code
				>
				or a package name like <code>@ldn-viz/charts</code>.
			</p>
			<h3>Sometimes <code>code</code> appears in a heading</h3>
			<p>
				A methodology section might name a token or a function right in its heading. The
				<em>"wrap it in a code span"</em> approach holds up here, so the inline code reads as code without
				breaking the heading's weight or size.
			</p>
			<p>
				Code can also sit inside a link — say, pointing to the
				<a href="https://github.com/Greater-London-Authority/ldn-viz-tools"
					><code>ldn-viz-tools</code></a
				> repository. The underline runs beneath the code span, which is a small compromise but far simpler
				than the effort it would take to avoid.
			</p>
			<h4>This is the first h4</h4>
			<p>
				And it marks the floor of the heading ladder. Keep content to h1–h4;
				<code>h5</code> and <code>h6</code> aren't styled, because by <code>h4</code> the heading is already
				close to body size and there's nowhere sensible left to go.
			</p>
			<p>
				Making an <code>h5</code> smaller than the body copy it introduces would invert the hierarchy,
				so the ladder stops at four levels by design. If you need more structure than that, the section
				probably wants splitting.
			</p>
			<h3>Stacked headings, one more time</h3>
			<h4>Including an h4 tucked straight under an h3</h4>
			<p>
				With any luck the headings above sit closer to each other than they would to a paragraph, so
				each pair reads as a single unit rather than two loose lines.
			</p>
			<p>
				A closing paragraph gives the document a decent block of text to end on. A heading sitting
				too near the end tends to look unbalanced, so it's worth rounding off a section with prose
				rather than a title.
			</p>
			<p>
				That covers every element the London City Data Design System styles in long-form content —
				enough to trust that a full notebook will hang together on the page.
			</p>
		</div>
	</div>
</Story>
