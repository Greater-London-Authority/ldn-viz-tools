<script lang="ts">
    import {getContext} from 'svelte';
    import type {Writable} from 'svelte/store';
    import {classNames} from '../utils/classNames';
    import Button from "../button/Button.svelte";

    export let value: string;
    const keydownHandler = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            $selectedValue = value;
        }
    };

    const {selectedValue} = getContext<{ selectedValue: Writable<string> }>('selectedValue');
    const variant = getContext<"tabs" | "radio">('variant');

    const commonClasses = {
        tabs: 'flex-auto flex flex-col items-center py-2 select-none',
        radio: 'flex-auto flex flex-col items-center py-2 select-none !border-b-0 hover:border-b-2',
    };

    const activeClasses = {
        tabs: 'border-b-2 border-core-grey-700 text-core-grey-700 dark:text-white dark:border-white',
        radio: '!bg-core-blue-500',
    };

    const inactiveClasses = {
        tabs: 'text-core-grey-400 bg-core-grey-50 hover:border-core-blue-600 dark:text-core-grey-200 dark:bg-core-grey-700 !border-b-0',
        radio: 'text-core-grey-400 bg-core-grey-50 hover:border-core-blue-600 dark:text-core-grey-200 !dark:bg-core-grey-700',
    }
</script>

<Button
        on:click={() => ($selectedValue = value)}
        on:keydown={keydownHandler}
        tabindex="0"
        class={classNames(
		$selectedValue === value ? activeClasses[variant] : inactiveClasses[variant],
		commonClasses[variant]
	)}
>
    <slot/>
</Button>
