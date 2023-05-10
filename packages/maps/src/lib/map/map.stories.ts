import type { Meta, StoryObj } from '@storybook/svelte';

import Map from './Map.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta: Meta<Map> = {
	title: 'Maps/Map',
	component: Map,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<Map>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary: Story = {};
