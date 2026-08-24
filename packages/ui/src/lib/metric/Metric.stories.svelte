<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Metric from './Metric.svelte';

	/**
	 * `Metric` — a single figure with an optional previous value and change.
	 *
	 *
	 * `size` maps to the type roles: `lg` → `metric`/`label`/`body`, `sm` →
	 * `metric-sm`/`label-sm`/`body-sm`. `layout` arranges the parts vertically
	 * (stacked) or horizontally (inline).
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Metric',
		component: Metric,
		tags: ['autodocs'],
		args: {
			label: 'Population',
			value: 100000,
			status: 'positive',
			comparisonValue: 110000
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

<Story name="Plain metric (no change)" args={{ comparisonValue: undefined }} />

<Story name="With translation" args={{ translation: '(Jun 2026)' }} />

<!-- An increase can be displayed as positive/negative/neutral depending on the value of `goodIs` -->
<Story name="Statuses">
	{#snippet template(args)}
		<div class="flex gap-8">
			<Metric {...args} goodIs="high" />
			<Metric {...args} goodIs="low" />
			<Metric {...args} goodIs={undefined} />
		</div>
	{/snippet}
</Story>

<Story name="Formatting changes">
	{#snippet template(args)}
		<div class="flex gap-8">
			<Metric {...args} showChangeAs="absolute" />
			<Metric {...args} showChangeAs="percentage" />
			<Metric
				{...args}
				formatString=".0%"
				value={0.05}
				comparisonValue={0.2}
				showChangeAs="percentage-point"
			/>
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

<Story name="Translation hero">
	{#snippet template(args)}
		<div class="flex flex-col gap-6">
			<Metric
				{...args}
				label="Highest average daily footfall"
				hero="translation"
				layout="vertical"
				translation="June"
				comparisonValue={undefined}
			/>
			<Metric
				{...args}
				label="Highest average daily footfall"
				hero="translation"
				layout="horizontal"
				translation="June"
				comparisonValue={undefined}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Hero and layout combinations">
	{#snippet template(args)}
		<div class="flex flex-col gap-6">
			<Metric {...args} hero="value" layout="vertical" />
			<Metric {...args} hero="change" layout="vertical" />
			<Metric {...args} hero="translation" layout="vertical" translation="June" />
			<Metric {...args} hero="value" layout="horizontal" />
			<Metric {...args} hero="change" layout="horizontal" />
			<Metric {...args} hero="translation" layout="horizontal" translation="June" />
		</div>
	{/snippet}
</Story>

<Story name="Without icon" args={{ showIcon: false }} />

<Story name="Custom change renderer">
	{#snippet template(args)}
		<Metric {...args} hero="change" goodIs="high">
			{#snippet changeRenderer()}
				The change was 10,000.
			{/snippet}
		</Metric>
	{/snippet}
</Story>
