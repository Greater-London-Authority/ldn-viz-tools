<script lang="ts">
    import Button from "../button/Button.svelte";
    import ColoredCheckbox from "./ColoredCheckbox.svelte";

    export let options: { id: string, label: string }[] = [];
    export let buttonsHidden = false;

    export let selectedOptions = [];
    let selectionState = Object.fromEntries(options.map(o => [o.id, false]));

    const selectAll = () => {
        selectionState = Object.fromEntries(options.map(o => [o.id, true]));
    }

    const clearAll = () => {
        selectionState = Object.fromEntries(options.map(o => [o.id, false]));
    }

    $: {
        selectedOptions = options.map(o => o.id).filter(id => selectionState[id]);
    }
</script>

<div>

    {#if !buttonsHidden}
        <Button style="ghost" on:click={selectAll} disabled={selectedOptions.length === options.length}>Select all
        </Button>
        <Button style="ghost" on:click={clearAll} disabled={selectedOptions.length === 0}>Clear all</Button>
    {/if}

    {#each options as option}
        <ColoredCheckbox id={option.id} label={option.label} color={option.color}
                         bind:checked={selectionState[option.id]}/>
    {/each}
</div>