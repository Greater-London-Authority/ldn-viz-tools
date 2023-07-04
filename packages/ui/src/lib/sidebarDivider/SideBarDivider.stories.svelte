<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarDivider from "./SidebarDivider.svelte";
</script>

<Meta title="Ui/Sidebars/SidebarDivider" component={SidebarDivider}/>

<Template let:args>
    <SidebarDivider {...args}/>
</Template>

<Story name="Default">
    <div class="w-[408px]">
        <SidebarDivider>
            Main sidebar title
        </SidebarDivider>
    </div>
</Story>
