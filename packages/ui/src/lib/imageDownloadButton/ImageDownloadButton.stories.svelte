<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import ImageDownloadButton from "./ImageDownloadButton.svelte";

    let svgRef;
    let svgRef2;
    let svgRef3;
    let svgRef4;
</script>

<Meta title="Ui/ImageDownloadButton" component={ImageDownloadButton}/>

<Template let:args>
    <ImageDownloadButton {...args}>
        I'm a button from UI!
    </ImageDownloadButton>
</Template>

<Story name="Default">
    <svg bind:this={svgRef} width="300" height="300">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef}/>
</Story>


<Story name="Disabled">
    <ImageDownloadButton svgNode={svgRef} disabled="true"/>
</Story>


<Story name="Set label, tooltip, filenmae">
    <svg bind:this={svgRef4} width="300" height="300">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef4} label="Download" tooltip="Click to download!"
                         filename="I was downloaded from Storybook.png"/>
</Story>


<Story name="Image with no explicit size">
    <svg bind:this={svgRef2} width="300" height="300">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef2}/>
</Story>


<Story name="Download as an SVG">
    <svg bind:this={svgRef3} width="300" height="300">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef3} format="SVG"/>
</Story>
