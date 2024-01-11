<script lang="ts">
    import {createEncoderFactory} from 'encodable';

    import Cell from "./Cell.svelte";
    import {setContext} from "svelte";
    import {writable} from "svelte/store";

    import {joinDataWithGrid, calcGridDimensions} from "./utils";

    export let data;

    export let spec;

    // Can specify one of three identifiers to use for matching
    export let gssCodeField;
    export let nameField = "borough";
    export let shortNameField: string;


    const encoderConfig = {
        channelTypes: {
            valueLabel: 'Text',
            rectColor: 'Color',

            symbolColor: 'Color',
            symbolArea: 'Numeric'
        },
        defaultEncoding: {
            valueLabel: {field: 'ValueA'},
            rectColor: {value: "lightgrey"},
            symbolColor: {value: "red"},
            symbolArea: {field: "ValueA"},
        }
    }

    const context = {
        getValueLabel: writable(),
        getRectColor: writable(),
        getSymbolColor: writable(),
        getSymbolArea: writable(),

    }
    setContext("flood", context);

    $: encoderFactory = createEncoderFactory(encoderConfig);
    $: encoder = encoderFactory.create(spec);
    $: encoder.setDomainFromDataset(data);


    let joinedData = [];
    $: joinedData = joinDataWithGrid(data, gssCodeField, shortNameField, nameField);

    let containerWidth;
    let containerHeight;

    let innerSize;
    let outerSize;

    $: ({innerSize, outerSize} = calcGridDimensions(containerWidth, containerHeight))


    $: {
        encoder.channels.symbolArea.scale && encoder.channels.symbolArea.scale!.range([0, Math.pow((innerSize - 37) / 2, 2)]);

        context.getValueLabel.set((d) => encoder.channels.valueLabel.encodeDatum(d, 0))
        context.getRectColor.set((d) => encoder.channels.rectColor.encodeDatum(d, 0))
        context.getSymbolColor.set((d) => encoder.channels.symbolColor.encodeDatum(d, 0))
        context.getSymbolArea.set((d) => encoder.channels.symbolArea.encodeDatum(d, 0))
    }

</script>

<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="w-full h-full">
    <svg width="100%" height="100%">

        {#each joinedData as d}
            <g transform={`translate(${d.grid.GRID_X * (outerSize)}, ${d.grid.GRID_Y * (outerSize)})`}>
                <Cell data={d} size={innerSize} {encoder}/>
            </g>
        {/each}

    </svg>
</div>

<!-- https://encodable.vercel.app/encodable-color -->
<p>TODO: tooltips, legends, time-series plots, better examples of color scales</p>