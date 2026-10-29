---
title: Application types
description: Coherent presentation structures
navLabel: Application types
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-1.svg
order: 1
---

<script>
	import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte';
</script>

<p class="lead">Our work covers different types of applications, which can be roughly grouped into dashboards, maps, notebooks and reports.</p>

The application type sets its basic structure: which [layout](/design-system/application-design/page-layout) it uses, what sits in the sidebar and what fills the canvas.

## Dashboards

Dashboards help users to monitor and investigate data.

A dashboard has a sidebar for navigation and filters, and a canvas that holds several separate visualisations, each in a [card](/design-system/application-design/surfaces-and-chrome#cards). It uses the fluid layout, so the canvas fills the width beside the sidebar, and the product typeset.

<figure class="width-content-wide">
	<EnhancedImage src="/application-types/dashboard.png" alt="A typical dashboard style application" />
</figure>

## Maps

The main purpose of a map is the analysis of spatial data.

A map can appear as one element within a dashboard. A standalone map application has a sidebar for navigation and filters, and a canvas filled by an interactive map. It uses the fluid layout and the product typeset.

<figure class="width-content-wide">
	<EnhancedImage src="/application-types/map.png" alt="A typical map style application" />
</figure>

## Notebooks

Notebooks allow for a level of interaction within a narrative flow.

A notebook is long-form text broken up by visualisations. It is read like an article, so it uses the contained layout and the longform typeset.

<figure class="width-content-wide">
	<EnhancedImage src="/application-types/notebook.png" alt="A typical notebook style application" />
</figure>

## Reports

Reports are similar to notebooks, but tend to be more in-depth, often made of several notebook-type pages.

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: an image of a typical report, with its page navigation.</div>
