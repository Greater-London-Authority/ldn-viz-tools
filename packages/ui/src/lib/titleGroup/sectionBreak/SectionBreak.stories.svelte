<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SectionBreak from './SectionBreak.svelte';

	/**
	 * `SectionBreak` — marks a new section within a long-form prose page.
	 *
	 * May appear several times down a page, one per section; sits below
	 * [PageTitle](./?path=/docs/ui-components-titlegroup-pagetitle--documentation)'s hero in the prose titling ladder.
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/TitleGroup/SectionBreak',
		component: SectionBreak,
		tags: ['autodocs'],
		args: {
			title: 'Population'
		}
	});
</script>

<Story name="Title only" />

<Story name="With subtitle" args={{ subtitle: 'How the city has grown over the last decade' }} />

<Story
	name="With eyebrow and subtitle"
	args={{ eyebrow: 'Demographics', subtitle: 'How the city has grown over the last decade' }}
/>
