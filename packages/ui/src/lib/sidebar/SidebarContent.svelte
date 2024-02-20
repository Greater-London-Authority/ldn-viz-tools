<script>
    import DefaultSidebarContent from "./DefaultSidebarContent.svelte";
</script>

<div class="dark grow overflow-y-auto overscroll-contain p-6 pb-2 flex flex-col gap-6">
    <slot>
        <DefaultSidebarContent />
    </slot>
</div>
