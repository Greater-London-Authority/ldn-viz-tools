---
title: London City Data
description: "Part of the Greater London Authority's City Intelligence Unit"
section: Overview
navLabel: Home
heroImage: header-main-overflow.svg
layout: index
---

<script>
    import ImageLink from '$lib/components/ImageLink.svelte';
</script>

<p class="typeset-longform body-lg text-color-text-muted">We build data applications that help Londoners get access to the data they need, and support policy makers to make data driven decisions to improve London for all.</p>

<div class="grid sm:grid-cols-2 grid-rows-[auto] gap-flow">

<ImageLink
    url="/design-system"
    image="cta-design-system.svg"
    title="Design System Documentation">

<p>A reusable library of type, UI, map & chart components, focused on making interactive data tools & visualisations, faster, better and more accessible.</p>
</ImageLink>

<ImageLink
    url="https://greater-london-authority.github.io/ldn-viz-tools"
    image="cta-foundations.svg"
    title="Component Library Storybook">

<p>A collection of components and patterns for rapid, consistent data visualization design for the City Intelligence Unit at the Greater London Authority.</p>
</ImageLink>

</div>

<div class="py-8 flow-spacious">
<h3 class="title-lg">Projects</h3>
<p class="subtitle-sm">A selection of publications, dashboards and maps from the London City Data team.</p>

<div class="grid grid-cols-2 xl:grid-cols-4 grid-rows-[auto] gap-flow">

<ImageLink
    url="https://apps.london.gov.uk/state-of-london/"
    image="sol-2026.jpg"
    title="State of London Report"
    titleClass="title-md">

<p>The State of London report brings together an array of data about how London is performing across its economy, society and environment.</p>
</ImageLink>

<ImageLink
    url="https://apps.london.gov.uk/public-realm-trees/"
    image="public-realm-trees.jpg"
    title="Public Realm Trees"
    titleClass="title-md">

<p>The London Tree Map shows where more than 1.1 million trees are in streets, parks, and other public spaces across the city.</p>
</ImageLink>

<ImageLink
    url="https://apps.london.gov.uk/population-projections/"
    image="population-projections.png"
    title="Population Projections"
    titleClass="title-md">

<p>London's 2022-based housing-led population projections, produced by GLA demography.</p>
</ImageLink>

<ImageLink
    url="https://apps.london.gov.uk/cool-spaces/"
    image="cool-spaces.jpg"
    title="Cool Spaces Map"
    titleClass="title-md">

<p>Cool Spaces are venues and outdoor spaces open to all where Londoners can take respite on hot days.</p>
</ImageLink>

</div>
</div>
