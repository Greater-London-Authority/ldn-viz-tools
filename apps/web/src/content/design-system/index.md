---
title: Design System
description: A unified approach to UI design, data presentation and mapping.
heroImage: header-design-system.svg
thumbnail: cta-design-system.svg
---

<script>
    import ImageLink from '$lib/components/ImageLink.svelte';
</script>

<p class="subtitle-lg">The London City Data team have developed this design system to coordinate the design of web applications, product templates and documentation.</p>

<div class="not-typeset mt-flow-section grid sm:grid-cols-3 grid-rows-[auto] gap-flow">

<ImageLink
    url="/design-system/foundations"
    image="cta-foundations.svg"
    title="Foundations">

<p>Type, colour, spacing and other essentials. The rules every product built with the system follows, from a single chart to a full application.</p>
</ImageLink>

<ImageLink
    url="/design-system/application-design"
    image="cta-application-design.svg"
    title="Application Design">

<p>Guiding principles for consistent presentation. Regular patterns and structures applied to our applications and products.</p>
</ImageLink>

<ImageLink
    url="/design-system/data-visualisation"
    image="cta-dataviz.svg"
    title="Data Visualisation">

<p>Good data visualisation isn’t just for internal decision making, it’s crucial for helping Londoners to better understand their city.</p>
</ImageLink>

</div>
