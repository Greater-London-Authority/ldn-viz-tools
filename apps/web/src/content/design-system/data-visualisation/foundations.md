---
title: Foundations
description: Remove the noise, highlight the signal
section: Data visualisation
navLabel: Foundations
---
<script>
    import chartExample01 from '$lib/assets/images/data-viz-foundations-chart-example-01.png'
</script>

## Principles

A visualisation rarely *just shows* the raw data. It is a curated slice, summary or framing of data to tell a story. If your story is important, your charts should work hard to highlight and communicate it clearly.

As noted by Andy Kirk, in his book “[Data Visualisation](https://visualisingdata.com/book/)”, one of Dieter Rams’ 10 Principles of good design is particularly pertinent to our field.

> Good design is as little design as possible. Less, but better.

<cite>Dieter Rams</cite>

In data visualisation, “Less, but better” means removing unnecessary visual clutter, but keeping and highlighting only elements that reinforce the point we are trying to make, or story we are trying to tell.

### If nothing else, do this

Whatever format of data visualisation you are producing, keep these fundamentals in mind:

- **Accessibility** - Ensure your colour choices have good contrast with the background and differentiation between each other? Have you provided a machine readable text description of the chart contents (and the insight it provides) and a way of accessing the underlying data?

- **Reduce clutter** – Use only the essential grid lines and axis ticks to illustrate the scales.

- **Focus on the key data** – Highlight the data points that you want people to see. Make other data, that may be there for context, more muted.

- **Use as few colours as possible** – Differentiation of data through colour alone can be challenging for quite a few readers. Fewer colours also make for more elegant charts.

- **Annotate the chart** – Not always possible in a dashboard environment but label the key data points if you can.

- **Say what you see** – Provide a narrative title that tells people what they should understand in the data. These insightful headlines, can also be used to provide good alt text for screen readers.

- **Small multiples** – If you’re trying to fit too much data (and colour) on one chart, try faceting the chart into “small multiples” of the same chart type.

- **Scale Correctly** - If you are scaling a circle based on a value, scale the area, not the diameter.

- **Bars & Columns always start at zero** - While line charts can (sometimes) have a non-zero baseline (if clearly indicated), a bar/column chart will radically distort the data if not started from zero.


## In Practice

### Highlight the insight

- **Focus** – 
Focus the value or date ranges of your chart to show data most clearly. But, only if doing so doesn’t remove important context.
For example, a line chart’s y-axis doesn’t always have to start at zero (if clearly identified), as focusing on small value changes may be important.
However, bars & columns must always start at zero, as they are used primarily to compare values. Starting your bars at zero will ensure comparisons are not misleading.

- **Highlight** – 
Highlight the important data with a consistent / thematic colour, and increasing the weight of the line.

- **Label directly** – 
This can help draw attention to a key data point and simplifies reading by not having to translate the meaning of a colour legend. This can be harder to do in an automated / dashboard context.

- **Show key points on the axis** – 
Highlight key dates or values on the axis. Consider only including the date ticks on your axis that are relevant to the chart.

- **Highlight important thresholds and contextual ranges** -
Draw attention to important thresholds in the range of your data. E.g. placing a stronger gridline when your y-axis DOES start at zero. Or where you need to show data around a threshold.

- **Only use dots & marks on important data points** - Don't mark every data point by default, instead focus on meaningful values, like:
    - First, last, highest & lowest values
    - Interesting events
    - To illustrate inconsistent or sparse data points

- **Say what you see** -
Help the reader by titling the chart with a description of what you want them to see in the graphic. You could also use colour in your title text to connect to data points in your chart.

<img src={`${chartExample01}`} class="w-full" alt="An example chart, using the LDN City Data Design System, with a narrative title, labelled data points and highlighted date ranges.">

### Charts in context
Charts rarely appear in isolation. They will often appear in a document or application surrounded by copy, and alongside other charts. So, consider the context your charts appear within.

- **Maintain consistency** -
Make consistent design decisions throughout your work, and certainly within any given presentation. For example, once your reader has learnt that “blue” might mean “London” don’t contradict that in your next chart.

- **Consider chart comparison** -
Ensure any two charts that are likely to be compared, use the same space for layout and use the same scale on the x & y axis.

- **Connect narrative to data** -
Consider highlighting copy in your document or chart title with a colour or style that connects it to highlighted data in your chart.

- **Logical and consistent text hierarchy across charts within your document** -
Charts should feel part of the context they are displayed within, and so chart text sizes should be part of an overarching typographic hierarchy and should be consistent across your document or application.