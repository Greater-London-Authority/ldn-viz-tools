<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    //import {config} from "@ldn-viz/themes"

    export let color: string;
    export let checked = false;
    export let label: string;
    const dispatch = createEventDispatcher();
    const toggleChecked = () => {
        checked = !checked;
        dispatch('click', {})
    }
    const keydownHandler = (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
            toggleChecked();
        }
    }
</script>


<div class="flex gap-2 items-center content-center" >
    <svg viewBox="0 0 10 10" height="1.5em"
         role="button" tabindex="0"
         aria-label={`${checked ? 'Checked' : 'Unchecked'} checkbox for ${label}`}
         on:keydown={keydownHandler}
        class=""
    >
        <circle cx="5" cy="5" r="4"
                title={`${label}`}
                stroke={color}
                fill={ checked ? color : "white"}
                on:click={toggleChecked}
        />

        {#if toggleChecked}
            <circle cx="5" cy="5" r="3"
                    title={`${label}`}
                    stroke={"white"}
                    fill={"none"}
                    on:click={toggleChecked}
            />
        {/if}
    </svg>
    <span>{label}</span>
</div>