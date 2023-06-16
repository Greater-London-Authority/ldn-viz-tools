<script lang="ts">
    import ColoredRadioButton from "./ColoredRadioButton.svelte";
    export let selectedId: string;
    export let name: string;
    export let options: { id: string, label: string, disabled?: boolean }[] = [];
    export let buttonsHidden = false;
</script>

<div>
    {#if !buttonsHidden}
        <button on:click={() => selectedId = undefined}>Clear</button>
    {/if}

    {#each options as option}
        <ColoredRadioButton id={option.id} label={option.label} color={option.color} disabled={option.disabled}
                            bind:selectedId={selectedId}
                      name={name}/>
    {/each}
</div>