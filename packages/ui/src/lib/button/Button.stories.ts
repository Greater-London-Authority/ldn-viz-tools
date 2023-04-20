import type { Meta, StoryObj } from '@storybook/svelte';

import Button from './Button.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta: Meta<Button> = {
	title: 'Ui/Button',
	component: Button,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<Button>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary: Story = {};
