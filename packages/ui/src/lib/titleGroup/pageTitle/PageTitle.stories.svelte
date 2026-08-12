<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageTitle from './PageTitle.svelte';

	/**
	 * `PageTitle` — the hero title of a prose page.
	 *
	 * May have multiple [SectionBreak](./?path=/docs/ui-components-titlegroup-sectionbreak-documentation)
	 * headings beneath it.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/TitleGroup/PageTitle',
		component: PageTitle,
		tags: ['autodocs'],
		args: {
			title: 'State of London'
		},
		argTypes: {
			hero: {
				options: ['headline', 'display'],
				control: { type: 'radio' }
			}
		}
	});
</script>

<Story name="Headline only" />

<Story name="With subhead" args={{ subhead: 'The GLA’s annual look at the city, in data.' }} />

<Story
	name="With eyebrow and subhead"
	args={{
		eyebrow: 'GLA City Intelligence',
		subhead: 'The GLA’s annual look at the city, in data.'
	}}
/>

<Story name="Display hero" args={{ hero: 'display', title: 'London Datastore' }} />
