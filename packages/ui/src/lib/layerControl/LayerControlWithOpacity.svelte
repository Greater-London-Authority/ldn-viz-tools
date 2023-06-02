<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import LayerControl from "./LayerControl.svelte";

    export let color: string;
    export let checked = false;
    export let label: string;
    export let expanded = false;
    export let hasChildLayers = false;

    export let opacity;

    const dispatch = createEventDispatcher();

    const hasChildren = Object.keys($$slots).length > 0;

    const toggleChecked = () => {
        checked = !checked;
        dispatch('click', {})
    }

    const keydownHandler = (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
            toggleChecked();
        }
    }
    const keydownHandlerExpansion = (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
            expanded = !expanded;
        }
    }

    /*
    TODO:
    * light/dark mode styling
    * a clean way to add e.g., a transparency slider for each layer
    * when a layer is toggled, in some cases child layers should also be toggled
     */
</script>


<LayerControl {color} bind:checked {label} bind:expanded {hasChildLayers}>
    <div style="display: flex">
        <label for="opacity-slider">Opacity: </label>
        <input id="opacity-slider" bind:value={opacity} type="range" min="0" max="1" step="0.05"/>
    </div>
</LayerControl>