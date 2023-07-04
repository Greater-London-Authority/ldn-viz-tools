<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarSectionTitle from "./SidebarSectionTitle.svelte";
</script>

<Meta title="Ui/Sidebars/SidebarSectionTitle" component={SidebarSectionTitle}/>

<Template let:args>
    <SidebarSectionTitle {...args}/>
</Template>

<Story name="Title only">

    <SidebarSectionTitle>
        Sidebar section title
    </SidebarSectionTitle>

</Story>


<Story name="With description">
    <div class="w-[408px]">
        <SidebarSectionTitle>
            Sidebar section title

            <span slot="description">Select a borough to download usage stats by LSOA.</span>

        </SidebarSectionTitle>
    </div>
</Story>


<Story name="With description and more info">
    <div class="w-[408px]">
        <SidebarSectionTitle>
            Sidebar section title

            <span slot="description">Select a borough to download usage stats by LSOA.</span>

            <span slot="info">
			    This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
		    </span>
        </SidebarSectionTitle>
    </div>
</Story>


<Story name="With more info only">
    <div class="w-[408px]">
        <SidebarSectionTitle>
            Sidebar section title

            <span slot="info">
			    This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
            </span>
        </SidebarSectionTitle>
    </div>
</Story>
