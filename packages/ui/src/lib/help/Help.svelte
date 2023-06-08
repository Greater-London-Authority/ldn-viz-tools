<script lang="ts">
    import {InformationCircleIcon} from "@rgossiaux/svelte-heroicons/outline";
    import {shift} from "svelte-floating-ui/dom";
    import {createFloatingActions} from "svelte-floating-ui";

    export let requireClick = false;

    let iconRef;

    const [floatingRef, floatingContent, update] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom",
        middleware: [
            shift()
        ]
    });

    let showTooltip = false;
</script>

<div
        style="width: fit-content; height: fit-content; display: inline flex;"
        on:mouseenter={() => (!requireClick && (showTooltip = true))}
        on:mouseleave={() => (!requireClick && (showTooltip = false))}
        on:click={() => showTooltip = !showTooltip}
        bind:this={iconRef}
        use:floatingRef
>
    <InformationCircleIcon style="height: 2em"/>

    {#if showTooltip}
        <div class="arrow"
             style={`left: ${ iconRef.getBoundingClientRect().x + 5 }px; top: ${iconRef.getBoundingClientRect().y + 30}px`}/>
    {/if}

</div>


{#if showTooltip}

    <div style="position:absolute" use:floatingContent class="popover" on:click={() => showTooltip = false}>
        <slot/>
    </div>
{/if}


<style>
    .arrow {
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;

        border-top: 1px solid gray;
        border-left: 1px solid gray;

        transform: rotate(45deg);
    }

    .popover {
        border: 1px solid gray;
        background: white;
        padding: 1em;
    }
</style>