---
title: Application design
description: Guiding principles for consistent presentation
section: Application design
navLabel: Application design
layout: index
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design.svg
---

<script>
	import { Button } from '@ldn-viz/ui'
    import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte'
</script>

<p class="prose responsive body-lg">This section covers guidance on regular patterns applied to our applications and products.</p>

<div class="grid grid-cols-2 xl:grid-cols-4 grid-rows-[auto] gap-4 ">
    <div>
        <a href="/design-system/application-design/application-types">
        <EnhancedImage src='cta-application-design-1.svg'/>
        </a>
        <h3 class="title-sm format">Application types</h3>
        <Button href="/design-system/application-design/application-types" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div>
        <a href="/design-system/application-design/layout" >
        <EnhancedImage src='cta-application-design-2.svg'/>
        </a>
        <h3 class="title-sm format">Layout</h3>
        <Button href="/design-system/application-design/layout" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div>
        <a href="/design-system/application-design/theming">
        <EnhancedImage src=cta-application-design-3.svg/>
        </a>
        <h3 class="title-sm format">Theming</h3>
        <Button href="/design-system/application-design/theming" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
    <div>
        <a href="/design-system/application-design/ui-components">
        <EnhancedImage src=cta-application-design-4.svg/>
        </a>
        <h3 class="title-sm format">Ui components</h3>
        <Button href="/design-system/application-design/ui-components" variant="text" slim emphasis="secondary">Read more</Button>
    </div>
</div>
