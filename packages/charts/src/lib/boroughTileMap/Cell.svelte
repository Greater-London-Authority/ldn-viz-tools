<script lang="ts">
    import {getContext} from "svelte";
    export let data;
    export let size: number;
    export let encoder;

    const {getValueLabel, getRectColor, getSymbolColor, getSymbolArea} = getContext("flood")
</script>


<rect
        x={0 }
        y={0 }
        width={size }
        height={size}
        fill="lightgrey"
/>

<text class="boroughLabel" font-family="'Roboto', 'open sans', Helvetica, Arial, sans-serif" fill="#353d42"
      font-size="12px" font-weight="bold" paint-order="stroke" x="5" y="14">{data.grid.SHORT_NAME}
</text>

<text class="boroughValue" font-size="10px" font-family="'Roboto', 'open sans', Helvetica, Arial, sans-serif"
      fill="#353d42" paint-order="stroke" x="5"
      y="30">{ $getValueLabel ? $getValueLabel(data) : ""}</text>

<rect
        x={0}
        width={size}
        y={37}
        height={size - 37}
        fill={$getRectColor ? $getRectColor(data) : "none"}
/>
<line x1="0" x2={size} y1="37" y2="37" stroke="white" stroke-width="1"/>

<circle cx={size/2}
        cy={37 + (size - 37)/2}
        r={ ($getSymbolArea) ? Math.sqrt($getSymbolArea(data)) : 0}
        fill={$getSymbolColor ? $getSymbolColor(data) : "none"}/>
