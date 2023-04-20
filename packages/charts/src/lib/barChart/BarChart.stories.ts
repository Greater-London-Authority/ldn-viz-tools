import type { Meta, StoryObj } from '@storybook/svelte';

import BarChart from './BarChart.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta: Meta<BarChart> = {
	title: 'Charts/BarChart',
	component: BarChart,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<BarChart>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary: Story = {};
