<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import SidebarContainer from "./SidebarContainer.svelte";
    import SidebarTitle from "./SidebarTitle.svelte";
    import SidebarGroupTitle from "./SidebarGroupTitle.svelte";
    import SidebarSectionTitle from "./SidebarSectionTitle.svelte";
    import SidebarDivider from "./SidebarDivider.svelte";
    import SidebarSection from "./SidebarSection.svelte";
</script>

<Meta title="Ui/Sidebars" component={SidebarContainer}/>

<Template let:args>
    <SidebarContainer {...args}/>
</Template>

<Story name="A complete sidebar panel">
    <div class="w-[408px]">
            <SidebarContainer>
                <SidebarTitle>
                    Main sidebar title

                    <span slot="description">This is a short description of this sidebar. Why does it exist? What does it let you do?</span>

                    <span slot="info">
			            This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
		            </span>
                </SidebarTitle>




                <SidebarSection>
                    <SidebarSectionTitle>
                        Section 1

                        <span slot="description">Select a borough to download usage stats by LSOA.</span>

                        <span slot="info">
                            This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
                        </span>
                    </SidebarSectionTitle>

                <SidebarGroupTitle>
                    Group 1
                </SidebarGroupTitle>


                <SidebarGroupTitle>
                    Group 2
                </SidebarGroupTitle>


                </SidebarSection>



                <SidebarSection>
                    <SidebarSectionTitle>
                        Section 2

                        <span slot="description">Select a borough to download usage stats by LSOA.</span>

                        <span slot="info">
                            This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
                        </span>
                    </SidebarSectionTitle>

                    <SidebarGroupTitle>
                        Group 3
                    </SidebarGroupTitle>

                    <SidebarGroupTitle>
                        Group 4
                    </SidebarGroupTitle>

                </SidebarSection>




                <SidebarSection>
                    <SidebarSectionTitle>
                        Section 3

                        <span slot="description">Select a borough to download usage stats by LSOA.</span>

                        <span slot="info">
                            This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
                        </span>
                    </SidebarSectionTitle>

                    <p>Some controls would go here...</p>
                </SidebarSection>


                <SidebarSection>
                    <SidebarSectionTitle>
                        Section 4

                        <span slot="description">Select a borough to download usage stats by LSOA.</span>

                        <span slot="info">
                            This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user clicks on 'more info'.
                        </span>
                    </SidebarSectionTitle>

                    <p>Some controls would go here...</p>
                </SidebarSection>

            </SidebarContainer>
    </div>
</Story>
