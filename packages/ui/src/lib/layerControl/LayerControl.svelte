<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    export let color: string;
    export let checked = false;
    export let label: string;
    export let expanded = false;
    export let hasChildLayers = false;

    const dispatch = createEventDispatcher();

    const hasChildren = Object.keys($$slots).length > 0;

    const toggleChecked = () => {
        checked = !checked;
        dispatch('click', {})
    }

    const keydownHandler =  (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
                toggleChecked();
            }
    }
    const keydownHandlerExpansion =  (ev) => {
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

<div class="layer-control">

    <div role="tabpanel">

        <div class="layer-control-head" style={`color: ${color}`}>


            <svg viewBox="0 0 10 10" height="1.5em"
                 role="button" tabindex="0"
                 aria-label={`${checked ? 'Checked' : 'Unchecked'} checkbox for ${label}`}
                 on:keydown={keydownHandler}>
                <circle cx="5" cy="5" r="4"
                        title={`${label}`}
                        stroke={color}
                        fill={ checked ? color : "white"}
                        on:click={toggleChecked}
                />

                {#if toggleChecked}
                    <circle cx="5" cy="5" r="3"
                            title={`${label}`}
                            stroke={"white"}
                            fill={"none"}
                            on:click={toggleChecked}
                    />
                {/if}

            </svg>

            <a target="_self" class="layerTitle"
               aria-controls="accTab_205" aria-expanded="false" role="button"
               tabindex="0"
               on:keydown={keydownHandlerExpansion}
               on:click|preventDefault={() => expanded = !expanded}>
                <span>{label}</span>
                {#if hasChildren && hasChildLayers}
                    <svg role="presentation" width="10" height="16" viewBox="0 0 320 512" focusable="false"
                         class:expanded>
                        <path d="M143 256.3l-136-136c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.8 22.5c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 0.1zM177 448.3c-9.4 9.4-24.6 9.4-34-0.1l-136-136c-9.4-9.3-9.4-24.5 0-33.9l22.7-22.6c9.3-9.4 24.5-9.4 33.9 0l96.4 96.4 96.5-96.3c9.3-9.4 24.5-9.4 33.9 0l22.6 22.6c9.4 9.3 9.4 24.5 0 33.9z"></path>
                    </svg>
                {:else if hasChildren}
                    <svg role="presentation" width="10" height="16" viewBox="0 0 319 512" focusable="false"
                         class:expanded>
                        <path d="M143 352.3l-136-136c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                    </svg>
                {/if}
            </a>

        </div>

        {#if expanded}
            <div class="layer-control-body">
                <slot/>
            </div>
        {/if}

    </div>

</div>


<style>
    .expanded {
        transform: rotate(-90deg);
    }

    .layerTitle {
        color: #ffffff;
        text-decoration: none;
    }


    .layer-control {
        margin: 0px 0px 10px 0px;
    }

    .layer-control-head {
        margin: 0px 0px 2px 0px;
        align-items: center;
        display: flex;

    }

    .layer-control-body {
        margin: 0px 0px 10px 22px;
        color: #ffffff;

    }

    svg {
        margin-right: 6px;
        vertical-align: middle;
        fill: currentColor;
    }

</style>