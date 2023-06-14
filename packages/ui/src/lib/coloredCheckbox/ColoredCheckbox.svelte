<script lang="ts">
    import {createEventDispatcher} from 'svelte';

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
        <rect x="1" y="1" width="8" height="8"
                title={`${label}`}
                stroke={color}
                fill={ checked ? color : "white"}
                on:click={toggleChecked}
        />

        {#if toggleChecked}
            <rect x="2" y="2" width="6" height="6"
                    title={`${label}`}
                    stroke={"white"}
                    fill={"none"}
                    on:click={toggleChecked}
            />
        {/if}
    </svg>
    <span>{label}</span>
</div>