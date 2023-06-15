<script lang="ts">
    import ColoredRadio from "./ColoredRadio.svelte";
    export let selectedId: string;
    export let name: string;
    export let options: { id: string, label: string }[] = [];
    export let hideClearButton = false;
</script>

<div>
    {#if !hideClearButton}
        <button on:click={() => selectedId = undefined}>Clear</button>
    {/if}

    {#each options as option}
        <ColoredRadio id={option.id} label={option.label} color={option.color} bind:selectedId={selectedId}
                      name={name}/>
    {/each}
</div>