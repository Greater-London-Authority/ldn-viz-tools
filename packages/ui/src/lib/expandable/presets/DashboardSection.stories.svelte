<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '../../card/Card.svelte';
	import DashboardSection from './DashboardSection.svelte';
	import DashboardSectionGroup from './DashboardSectionGroup.svelte';

	/**
	 * Prototype, from the Figma page "WIP – Collapsible dashboard section".
	 * `DashboardSectionGroup` holds `DashboardSection`s that each open on their own.
	 *
	 * `closedStyle` sets how a closed section's title looks: `title` keeps
	 * `dashboard-section-title`, and `eyebrow` drops it to the eyebrow role so the open
	 * sections stand out.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Expandable/Dashboard Section',
		component: DashboardSection,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			closedStyle: { control: 'radio', options: ['title', 'eyebrow'] },
			mount: { control: 'radio', options: ['first-open', 'always', 'open'] }
		},
		args: { closedStyle: 'title', mount: 'first-open' }
	});

	const sections = [
		{ value: 'footfall', title: 'Footfall overview', subtitle: 'Visits across the CAZ' },
		{ value: 'origins', title: 'Visitor origins', subtitle: 'Where visitors travel from' },
		{ value: 'time', title: 'Time of day patterns', subtitle: 'Visits by hour' },
		{ value: 'comparison', title: 'Comparison with last year', subtitle: 'Change since 2025' }
	];
</script>

{#snippet cards()}
	{#each ['Weekday visits', 'Weekend visits', 'Night-time visits'] as t (t)}
		<Card title={t} subtitle="Subtitle" hint="Help text">
			<div class="h-32 bg-color-surface-muted"></div>
		</Card>
	{/each}
{/snippet}

{#snippet dashboard(args: any, value: string[])}
	<div class="typeset-product max-w-5xl">
		<h1 class="dashboard-main-title mb-6">Dashboard title</h1>
		<DashboardSectionGroup {value}>
			{#each sections as s (s.value)}
				<DashboardSection
					{...args}
					value={s.value}
					title={s.title}
					subtitle={s.subtitle}
					headingLevel={2}
					contentClass="grid grid-cols-1 gap-2 md:grid-cols-3"
				>
					{@render cards()}
				</DashboardSection>
			{/each}
		</DashboardSectionGroup>
	</div>
{/snippet}

<Story name="Default">
	{#snippet template(args)}
		{@render dashboard(args, ['footfall', 'comparison'])}
	{/snippet}
</Story>

<!-- Closed sections use the eyebrow role. -->
<Story name="Eyebrow closed style" args={{ closedStyle: 'eyebrow' }}>
	{#snippet template(args)}
		{@render dashboard(args, ['footfall', 'comparison'])}
	{/snippet}
</Story>

<!-- `controls` adds "Expand all" and "Collapse all". `persistKey` keeps the open sections in localStorage, so they survive a reload. -->
<Story name="Controls and persistence">
	{#snippet template(args)}
		<div class="typeset-product max-w-5xl">
			<DashboardSectionGroup controls persistKey="storybook-dashboard-section">
				{#each sections as s (s.value)}
					<DashboardSection
						{...args}
						value={s.value}
						title={s.title}
						subtitle={s.subtitle}
						headingLevel={2}
						contentClass="grid grid-cols-1 gap-2 md:grid-cols-3"
					>
						{@render cards()}
					</DashboardSection>
				{/each}
			</DashboardSectionGroup>
		</div>
	{/snippet}
</Story>
