---
title: Design System
description: A unified approach to UI design, data presentation and mapping.
section: Overview
heroImage: header-design-system.svg
thumbnail: cta-design-system.svg
layout: index
---

<script>
	import { Button, PlaceholderImage } from '@ldn-viz/ui'
    import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte'
</script>

<p class="prose lead py-6">The London City Data team have developed this design system to coordinate the design of web applications, product templates and documentation.</p>

<div class="grid sm:grid-cols-3 grid-rows-[auto] gap-4">
    <div class="flow-product">
        <a href="/design-system/foundations">
        <EnhancedImage src='cta-foundations.svg'/>
        </a>
        <h3>Foundations</h3>
        <p class="body-sm leading-normal">A reusable library of type, UI, map & chart components, focused on making interactive data tools & visualisations, faster, better and more accessible.</p>
        <Button href="/design-system/foundations" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div class="flow-product">
        <a href="/design-system/application-design" >
        <EnhancedImage src='cta-application-design.svg'/>
        </a>
        <h3>Application Design</h3>
        <p class="body-sm leading-normal">A reusable library of type, UI, map & chart components, focused on making interactive data tools & visualisations, faster, better and more accessible.</p>
        <Button href="/design-system/application-design" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div class="flow-product">
        <a href="/design-system/data-visualisation">
        <EnhancedImage src='cta-dataviz.svg'/>
        </a>
        <h3>Data Visualisation</h3>
        <p class="body-sm leading-normal">A reusable library of type, UI, map & chart components, focused on making interactive data tools & visualisations, faster, better and more accessible.</p>
        <Button href="/design-system/data-visualisation" variant="text" slim emphasis="secondary">Read more</Button>
    </div>

</div>
