<script lang="ts">
    import {getContext} from 'svelte';
    import type {Writable} from 'svelte/types/runtime/store';

    export let tabId: string;
    const {selectedValue} = getContext<{ selectedValue: Writable<string> }>('selectedValue');

    const handleSelection = () => {
        $selectedValue = tabId;
        console.log({tabId, selectedValue: $selectedValue})
    };
    const keydownHandler = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            handleSelection();
        }
    };
    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ');
    };
</script>


<div
        on:click={handleSelection}
        on:keydown={keydownHandler}
        tabindex="0"
        role="tab"
        class={classNames(
		tabId === $selectedValue ? 'bg-core-blue-600 hover:bg-core-blue-700' : 'bg-core-grey-700 hover:bg-core-grey-600',
		'h-8 text-white text-base py-2 px-4 flex items-center select-none'
	)}
>
    <slot/>
</div>