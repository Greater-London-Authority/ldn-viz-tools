<script>
    import { getContext } from 'svelte';

    export let value;
    const keydownHandler = (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
            $selectedValue = value;
        }
    }

    const {selectedValue} = getContext("selectedValue")
</script>

<div class="buttonGroupItem flex flex-col float-left text-center border-none pb-2 select-none"
     class:selected={$selectedValue===value}
     on:click={() => $selectedValue=value}
     on:keydown={keydownHandler}
     tabindex="0" role="button">
    <slot/>
</div>


<style>
    .buttonGroupItem.selected {
        border-bottom: solid 2px #000000;
    }

    .buttonGroupItem {
        flex: 1 0 auto; /* scale so buttons fill width */
    }
</style>

