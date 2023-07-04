<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarSection from "./SidebarSection.svelte";
    import SidebarSectionTitle from "../sidebarSectionTitle/SidebarSectionTitle.svelte";
    import SidebarContents from "../sidebarContents/SidebarContents.svelte";
</script>

<Meta title="Ui/Sidebars/SidebarSection" component={SidebarSection}/>

<Template let:args>
    <SidebarSection {...args}/>
</Template>

<Story name="Default">
    <div class="w-[408px]">

        <SidebarSection>
            <SidebarSectionTitle>
                Sidebar section title

                <span slot="description">Select a borough to download usage stats by LSOA.</span>
            </SidebarSectionTitle>

            <p class="text-white">Here is some content</p>

        </SidebarSection>
    </div>

</Story>


<Story name="Multiple sections">
    <div class="w-[408px]">

        <SidebarContents>
            <SidebarSection>
                <SidebarSectionTitle>
                    Sidebar section 1

                    <span slot="description">This is the first sidebar section.</span>
                </SidebarSectionTitle>

                <p class="text-white">Here is some content corresponding to the first sidebar section.</p>

            </SidebarSection>

            <SidebarSection>
                <SidebarSectionTitle>
                    Sidebar section 2

                    <span slot="description">This is the second sidebar section.</span>
                </SidebarSectionTitle>

                <p class="text-white">Here is some content corresponding to the second sidebar section.</p>

            </SidebarSection>
        </SidebarContents>
    </div>
</Story>
