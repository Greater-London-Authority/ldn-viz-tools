<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarGroupTitle from "./SidebarGroupTitle.svelte";
</script>

<Meta title="Ui/Sidebars/SidebarGroupTitle" component={SidebarGroupTitle}/>

<Template let:args>
    <SidebarGroupTitle {...args}/>
</Template>

<Story name="Title only">

    <div class="w-[408px]">
        <SidebarGroupTitle>
            Sidebar group title
        </SidebarGroupTitle>
    </div>

</Story>


<Story name="With more info only">
    <div class="w-[408px]">
        <SidebarGroupTitle>
            Sidebar group title

            <span slot="info">
			    This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
            </span>
        </SidebarGroupTitle>
    </div>
</Story>
