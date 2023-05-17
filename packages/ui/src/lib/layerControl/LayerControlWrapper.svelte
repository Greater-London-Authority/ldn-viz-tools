<script lang="ts">
    import LayerControl from "./LayerControl.svelte";
    import LayerControlWrapper from "./LayerControlWrapper.svelte"

    type Option = {
        id: string;
        label: string;
        color: string;
        children?: Option[];
    }

    export let options: Option[];
    export let selected: {[option: string]: boolean};
    export let exclusive = false;

    // recursively construct list of ids of all layers (including  children, grandchildren, etc. of top-level layers)
    const listIds = (entries) => {
        let ids = [];
        for (let entry of entries) {
            ids.push(entry.id);
            if ("children" in entry) {
                ids = ids.concat(listIds(entry.children));
            }
        }
        return ids;
    }
    $: {
        if (!selected) {
            selected = Object.fromEntries(listIds(options).map(o => [o, false]))
        }
    }

    const handleClick = (id) => {
        if (!exclusive) {
            return;
        }
        for (let option of options) {
            if (option.id !== id) {
                selected[option.id] = false;
            }
        }
    }
</script>

<div class="layer-control-wrapper">
    {#each options as option, i}
        {@const hasChildLayers = (option.children && option.children.length > 0)}
        {#if option.description || hasChildLayers}


            <LayerControl color={option.color} label={option.label} bind:checked={selected[option.id]} {hasChildLayers}
                          on:click={() => handleClick(option.id)}>

                {#if option.description}
                    {option.description}
                {/if}

                {#if option.children}
                    <LayerControlWrapper options={option.children} bind:selected/>
                {/if}

            </LayerControl>

        {:else}
            <LayerControl color={option.color} label={option.label} bind:checked={selected[option.id]}
                          on:click={() => handleClick(option.id)}/>
        {/if}

    {/each}
</div>


<style>
    .layer-control-wrapper {
        padding: 0 0 20px 0;
    }
</style>