<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Metric from './Metric.svelte';

	/**
	 * `Metric` — a single figure with its context and change. Consolidates the
	 * former metric, change-indicator, change-values and static-metric
	 * treatments into one component.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Metric',
		component: Metric,
		tags: ['autodocs'],
		args: {
			label: 'Population',
			value: '100,000',
			change: '10%',
			status: 'positive',
			comparisonValue: '110,000'
		},
		argTypes: {
			status: {
				options: ['positive', 'negative', 'neutral'],
				control: { type: 'select' }
			},
			hero: {
				options: ['value', 'change'],
				control: { type: 'radio' }
			},
			size: {
				options: ['lg', 'sm'],
				control: { type: 'radio' }
			},
			layout: {
				options: ['vertical', 'horizontal'],
				control: { type: 'radio' }
			}
		}
	});
</script>

<Story name="Default" />

<!-- If `hero` is `"change"`, then the change (rather than value) is displayed in large text. -->
<Story name="Hero: change" args={{ hero: 'change' }} />

<Story name="Horizontal" args={{ layout: 'horizontal' }} />

<Story name="Plain metric (no change)" args={{ change: '', comparisonValue: '' }} />

<Story name="With translation" args={{ translation: '(20%)' }} />

<!-- Status can be displaed as positive/negative/netral -->
<Story name="Statuses">
	{#snippet template(args)}
		<div class="flex gap-8">
			<Metric {...args} status="positive" />
			<Metric {...args} status="negative" />
			<Metric {...args} status="neutral" />
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args)}
		<div class="flex items-end gap-8">
			<Metric {...args} size="lg" />
			<Metric {...args} size="sm" />
		</div>
	{/snippet}
</Story>

<Story name="Hero and layout combinations">
	{#snippet template(args)}
		<div class="flex flex-col gap-6">
			<Metric {...args} hero="value" layout="vertical" />
			<Metric {...args} hero="change" layout="vertical" />
			<Metric {...args} hero="value" layout="horizontal" />
			<Metric {...args} hero="change" layout="horizontal" />
		</div>
	{/snippet}
</Story>

<Story name="Without icon" args={{ showIcon: false }} />
