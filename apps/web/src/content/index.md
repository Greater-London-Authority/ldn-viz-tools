---
title: London City Data
description: ''
section: Overview
navLabel: Home
heroImage: header-main-overflow.svg
layout: index
---

<script>
	import { Button, PlaceholderImage } from '@ldn-viz/ui'
        import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte'
</script>

<!-- <p class="prose responsive body-lg py-typography-spacing-3xl">The London City Data team bring insight</p> -->

<div class="grid grid-cols-2 gap-4 pt-spacing-xl">
    <div>
        <a href="/design-system">
        <EnhancedImage src='cta-design-system.svg'/>
        </a>
        <h3 class="title-md format">Design System Documentation</h3>
        <p class="leading-normal">A reusable library of type, UI, map & chart components, focused on making interactive data tools & visualisations, faster, better and more accessible.</p>
        <Button href="/design-system" variant="text" slim emphasis="secondary">Read the docs</Button>
    </div>
</div>
