<script lang="ts">
    import ColoredCheckbox from "./ColoredCheckbox.svelte";

    export let options: { id: string, label: string }[] = [];

    export let selectedOptions = [];
    let selectionState = Object.fromEntries(options.map(o => [o.id, false]));

    $: {
        selectedOptions = options.map(o => o.id).filter(id => selectionState[id]);
    }
</script>

<div>
    {#each options as option}
        <ColoredCheckbox id={option.id} label={option.label} color={option.color}
                         bind:checked={selectionState[option.id]}/>
    {/each}
</div>