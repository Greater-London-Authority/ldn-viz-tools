---
title: Foundations
description: Foundational principles
section: Foundations
navLabel: Foundational Label
layout: index
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations.svg
---

<script>
	import { Button } from '@ldn-viz/ui'
    import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte'
</script>

<p class="prose responsive body-lg">The data visualisation and information design projects undertaken by the City Intelligence unit are diverse in range and scope. From simple charts and static presentations to complex, interactive web applications.</p>

<div class="grid grid-cols-2 xl:grid-cols-4 grid-rows-[auto] gap-4 ">
    <div>
        <a href="/design-system/foundations/accessibility">
        <EnhancedImage src='cta-foundations-1.svg'/>
        </a>
        <h3 class="title-sm format">Accessibility</h3>
        <Button href="/design-system/foundations/accessibility" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div>
        <a href="/design-system/foundations/colour" >
        <EnhancedImage src='cta-foundations-2.svg'/>
        </a>
        <h3 class="title-sm format">Colour</h3>
        <Button href="/design-system/foundations/colour" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div>
        <a href="/design-system/foundations/design-tokens">
        <EnhancedImage src=cta-foundations-3.svg/>
        </a>
        <h3 class="title-sm format">Design tokens</h3>
        <Button href="/design-system/foundations/design-tokens" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div>
        <a href="/design-system/foundations/typography">
        <EnhancedImage src=cta-foundations-4.svg/>
        </a>
        <h3 class="title-sm format">Typography</h3>
        <Button href="/design-system/foundations/typography" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
</div>
