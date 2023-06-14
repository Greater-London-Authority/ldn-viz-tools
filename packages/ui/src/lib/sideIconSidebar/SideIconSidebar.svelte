<script lang="ts">
    export let selected: string;
    export let tabs = []

    	const keydownHandler = (ev: KeyboardEvent, val: string) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			selected = val;
		}
	};


</script>


<div id="sidebar" class="bg-core-grey-800 h-screen flex">

    <div class="w-20 bg-core-grey-800 flex flex-col items-center">
        {#each tabs as tab}
            <div
                    on:click={() => selected = tab.id}
                    on:keydown={(ev) => keydownHandler(ev, tab.id)}
                    tabindex="0"
                    role="button"


                    class:bg-core-blue-500={tab.id===selected}
                    class="w-20 h-20 flex flex-col items-center justify-center text-white text-base leading-4 text-center select-none hover:bg-core-blue-300"
            >
                <svelte:component this={tab.icon} class="h-5 w-5" style="fill: white" aria-hidden="true" />
                {tab.label}
            </div>
        {/each}
    </div>

    <div class="p-6">
        <slot/>
    </div>
</div>


<style>
    #sidebar {
        width: 488px;
    }
</style>