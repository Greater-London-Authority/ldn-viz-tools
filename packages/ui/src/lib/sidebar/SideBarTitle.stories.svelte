<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarTitle from "./SidebarTitle.svelte";
</script>

<Meta title="Ui/Sidebars/SidebarTitle" component={SidebarTitle}/>

<Template let:args>
    <SidebarTitle {...args}/>
</Template>

<Story name="Title only">

    <SidebarTitle>
        Main sidebar title
    </SidebarTitle>

</Story>


<Story name="With description">
    <div class="w-[408px]">
        <SidebarTitle>
            Main sidebar title

            <span slot="description">Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec venenatis sapien. Etiam venenatis felis.</span>

        </SidebarTitle>
    </div>
</Story>


<Story name="With description and more info">
    <div class="w-[408px]">
        <SidebarTitle>
            Main sidebar title

            <span slot="description">Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec venenatis sapien. Etiam venenatis felis.</span>

            <span slot="info">
			    This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
		    </span>
        </SidebarTitle>
    </div>
</Story>


<Story name="With more info only">
    <div class="w-[408px]">
        <SidebarTitle>
            Main sidebar title

            <span slot="info">
			    This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
            </span>
        </SidebarTitle>
    </div>
</Story>
