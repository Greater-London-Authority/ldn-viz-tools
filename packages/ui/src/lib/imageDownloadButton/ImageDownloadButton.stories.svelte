<script>
    import {ArrowCircleDownIcon, DocumentDownloadIcon} from '@rgossiaux/svelte-heroicons/solid';
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
        I'm an image download button!
    </ImageDownloadButton>
</Template>

<Story name="Default">
    <svg bind:this={svgRef} width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef}>
        <ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true"/>
    </ImageDownloadButton>
</Story>

<Story name="Button types">
    <svg bind:this={svgRef} width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef} filename="download" format="CSV" style="primary">
        Primary
        <ArrowCircleDownIcon class="ml-2 w-6 h-6" aria-hidden="true"/>
    </ImageDownloadButton>
    <ImageDownloadButton svgNode={svgRef} filename="download" format="CSV" style="secondary">
        Secondary
        <DocumentDownloadIcon class="ml-2 w-6 h-6" aria-hidden="true"/>
    </ImageDownloadButton>
    <ImageDownloadButton svgNode={svgRef} filename="download" format="CSV" style="ghost">
        Ghost
        <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ml-2 w-6 h-6"
                aria-hidden="true"
        >
            <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
        </svg>
    </ImageDownloadButton>
</Story>

<Story name="Disabled">
    <svg bind:this={svgRef} width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef} disabled="true">
        <ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true"/>
    </ImageDownloadButton>
</Story>


<Story name="Image with no explicit size">
    <svg bind:this={svgRef2} width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef2}>
        <ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true"/>
    </ImageDownloadButton>
</Story>


<Story name="Download as an SVG">
    <svg bind:this={svgRef3} width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
        <circle cx="10" cy="10" r="10" fill="blue"/>
    </svg>

    <ImageDownloadButton svgNode={svgRef3} format="SVG">
        <ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true"/>
    </ImageDownloadButton>
</Story>

<style>
	svg {
		margin-bottom: 2em;
	}
</style>