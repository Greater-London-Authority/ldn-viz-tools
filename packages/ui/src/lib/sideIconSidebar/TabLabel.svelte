<script lang="ts">
    import {getContext} from "svelte";
    import type {Writable} from "svelte/types/runtime/store";

    export let tabId;

    const {selectedValue} = getContext<{ selectedValue: Writable<string> }>('selectedValue');

    const keydownHandler = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            $selectedValue = tabId;
        }
    };
</script>


<div
        on:click={() => $selectedValue = tabId}
        on:keydown={keydownHandler}
        tabindex="0"
        role="button"

        class:bg-core-blue-500={tabId===$selectedValue}
        class="w-20 h-20 flex flex-col items-center justify-center text-white text-base leading-4 text-center select-none hover:bg-core-blue-300"
>
<slot />
</div>