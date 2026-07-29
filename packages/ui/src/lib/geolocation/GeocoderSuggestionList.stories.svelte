<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GeocoderSuggestionList from './GeocoderSuggestionList.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Geocoder/GeocoderSuggestionList',
		component: GeocoderSuggestionList,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	/**
	 * `GeocoderSuggestionList` renders a list of
	 * [GeocoderSuggestion](./?path=/docs/ui-components-geocoder-geocodersuggestion--documentation)s;
	 * it is used indirectly via the
	 * [Geocoder](./?path=/docs/ui-components-geocoder--documentation)
	 *
	 * @component
	 */

	import type { GeocoderAttribution } from './GeocoderAdapter';
	import type { GeolocationNamed, OnSuggestionListInteraction } from './types';

	// The list renders an absolutely-positioned <ul> (top-11), so each story wraps
	// it in a relative container tall enough to reveal the dropdown.

	const onSuggestionEvent: OnSuggestionListInteraction = (event, suggestion) => {
		console.log('suggestion event', event.type, suggestion.name ?? suggestion.address);
	};

	const suggestions: GeolocationNamed[] = [
		{
			id: '1',
			center: [-0.08564082393624517, 51.4944230052667],
			name: "Bricklayers' Arms",
			address: 'South of London Bridge somewhere'
		},
		{
			id: '12',
			center: [-0.07272570707647219, 51.520966913867824],
			name: 'Brick Lane Market',
			address: 'Brick Lane Market, 91 Brick Ln, London, England E1 6RU, United Kingdom'
		},
		{
			id: '13',
			center: [-0.0682034415460464, 51.605862586455316],
			name: 'The Bricklayers Arms',
			address: 'The Bricklayers Arms, 803-805 High Rd, London, England N17 8ER, United Kingdom'
		},
		{
			id: '14',
			center: [-0.2167357587457559, 51.466139217180796],
			name: 'The Bricklayers Arms',
			address: 'The Bricklayers Arms, 32 Waterman St, London, England SW15 1DD, United Kingdom'
		},
		{
			id: '3',
			center: [-0.10552520175642144, 51.495195323492794],
			name: 'West Square Gardens',
			address: 'West Sq, Lambeth, London'
		}
	];

	const linkAttribution: GeocoderAttribution = {
		text: 'Results © Example Geocoder',
		link: 'https://example.com'
	};

	const textAttribution: GeocoderAttribution = {
		text: 'Results © Example Geocoder (no link)'
	};
</script>

<Story name="Default">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<div class="relative h-72 w-72">
				<GeocoderSuggestionList {suggestions} {onSuggestionEvent} maxSuggestions={5} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="No results">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<div class="relative h-24 w-72">
				<GeocoderSuggestionList suggestions={[]} {onSuggestionEvent} maxSuggestions={5} />
			</div>
		</div>
	{/snippet}
</Story>

<!--
Here there are five suggestions but `maxSuggestions` is set to 3, so only the first three are shown.
-->
<Story name="maxSuggestions truncation">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<div class="relative h-48 w-72">
				<GeocoderSuggestionList {suggestions} {onSuggestionEvent} maxSuggestions={3} />
			</div>
		</div>
	{/snippet}
</Story>

<!--
	When `attribution` includes a `link`, the footer row renders a clickable link.
-->
<Story name="With attribution (link)">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<div class="relative h-72 w-72">
				<GeocoderSuggestionList
					{suggestions}
					{onSuggestionEvent}
					attribution={linkAttribution}
					maxSuggestions={5}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!--
	When `attribution` does not include a `link`, the footer row renders plain text.
-->

<Story name="With attribution (plain text)">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<div class="relative h-72 w-72">
				<GeocoderSuggestionList
					{suggestions}
					{onSuggestionEvent}
					attribution={textAttribution}
					maxSuggestions={5}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<!--
	Setting `selected` to a location in the list highlights that item
	instead of defaulting to the first item.
-->
<Story name="Selected highlighting">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<div class="relative h-72 w-72">
				<GeocoderSuggestionList
					{suggestions}
					{onSuggestionEvent}
					selected={suggestions[2]}
					maxSuggestions={5}
				/>
			</div>
		</div>
	{/snippet}
</Story>
