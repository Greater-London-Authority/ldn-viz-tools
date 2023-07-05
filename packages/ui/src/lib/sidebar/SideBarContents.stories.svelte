<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarContents from "./SidebarContents.svelte";
</script>

<Meta title="Ui/Sidebars/SidebarContents" component={SidebarContents}/>

<Template let:args>
    <SidebarContents {...args}/>
</Template>

<Story name="Default">
    <div class="w-[408px]">
        <SidebarContents>
            <span>A thing</span>
            <span>A second thing</span>
            <span>A third thing</span>
        </SidebarContents>
    </div>
</Story>
