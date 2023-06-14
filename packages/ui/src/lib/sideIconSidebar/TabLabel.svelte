<script lang="ts">
    import {getContext} from "svelte";
    import type {Writable} from "svelte/types/runtime/store";

    export let tabId;

    const {selectedValue} = getContext<{ selectedValue: Writable<string> }>('selectedValue');
    const {collapsed} = getContext<{ collapsed: Writable<boolean> }>('collapsed');

    const handleSelection = () => {
        console.log(`HAndling selection: tabID ${tabId}, collapsed ${$collapsed}, selectedValue ${$selectedValue}`);

        if ($collapsed) {
            // if we're collapsed, clicking any tab label will open that tab
            $collapsed = false;
            $selectedValue = tabId;
        } else if ($selectedValue == tabId) {
            // if we're expanded, clicking the currently selected tab label triggers collapse
            $collapsed = true;
            $selectedValue = "";
        } else {
            // if we're expanded, clicking a different tab label switched tab
            $selectedValue = tabId;
        }
    }

    const keydownHandler = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            handleSelection();
        }
    };
</script>


<div
        on:click={handleSelection}
        on:keydown={keydownHandler}
        tabindex="0"
        role="button"

        class:bg-core-blue-500={tabId===$selectedValue}
        class="w-20 h-20 flex flex-col items-center justify-center text-white text-base leading-4 text-center select-none hover:bg-core-blue-300"
>
    <slot/>
</div>