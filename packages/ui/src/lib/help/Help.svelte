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
    <InformationCircleIcon class="h-6 dark:stroke-white" {...$$restProps} />

    {#if showTooltip}
        <div class="arrow absolute w-h h-5 bg-white border-t border-t-core-grey-400 border-l border-l-core-grey-400 rotate-45"
             style={`width: 20px; height: 20px; left: ${ iconRef.getBoundingClientRect().x + 5 }px; top: ${iconRef.getBoundingClientRect().y + 30}px`}/>
    {/if}

</div>


{#if showTooltip}

    <div style="position:absolute" use:floatingContent class="text-black dark:text-white mt-2.5 border border-core-grey-400 bg-white dark:bg-core-grey-800 p-4" on:click={() => showTooltip = false}>
        <slot/>
    </div>
{/if}
