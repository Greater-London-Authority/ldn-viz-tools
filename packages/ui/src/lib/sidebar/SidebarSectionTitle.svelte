<script>

    import {InformationCircleIcon} from "@rgossiaux/svelte-heroicons/solid";

    import Modal from "../modal/Modal.svelte";

    let isOpen = false;
    const openModal = () => isOpen = true
</script>


<div>

    {#if $$slots.info}

        <div class="flex justify-between items-end self-stretch">
            <div class="text-base font-bold text-white">
                <slot/>
            </div>

            <div class="text-xs text-core-grey-200 flex gap-1">
                <span on:click={openModal}>more info</span>
                <InformationCircleIcon class="h-4 w-4 fill-current" on:click={openModal}/>
            </div>


        </div>

    {:else}
        <div class="text-xl text-white">
            <slot/>
        </div>
    {/if}

    <div class="text-xs text-white mt-1">
        <slot name="description"/>
    </div>


    {#if $$slots.info}
        <Modal title="More info" description="" bind:isOpen>
            <slot name="info"/>
        </Modal>
    {/if}


</div>