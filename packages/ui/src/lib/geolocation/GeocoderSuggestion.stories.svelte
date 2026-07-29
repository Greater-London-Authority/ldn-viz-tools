<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GeocoderSuggestion from './GeocoderSuggestion.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Geocoder/GeocoderSuggestion',
		component: GeocoderSuggestion,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import type { GeolocationNamed, OnSuggestionListInteraction } from './types';

	// GeocoderSuggestion is an internal sub-component normally rendered by
	// GeocoderSuggestionList. It renders a single <li>, so each story wraps it in
	// a <ul> with a surface background to mirror the list styling.

	const onSuggestionEvent: OnSuggestionListInteraction = (event, suggestion) => {
		console.log('suggestion event', event.type, suggestion.name ?? suggestion.address);
	};

	const fullSuggestion: GeolocationNamed = {
		id: '1',
		center: [-0.08564082393624517, 51.4944230052667],
		name: "Bricklayers' Arms",
		address: 'South of London Bridge somewhere'
	};

	const nameOnlySuggestion: GeolocationNamed = {
		id: '2',
		center: [-0.10552520175642144, 51.495195323492794],
		name: 'West Square Gardens'
	};

	const addressOnlySuggestion: GeolocationNamed = {
		id: '3',
		center: [-0.07272570707647219, 51.520966913867824],
		address: 'Brick Lane Market, 91 Brick Ln, London, England E1 6RU, United Kingdom'
	};
</script>

<Story name="Default">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<ul class="bg-color-surface text-sm text-color-text shadow-lg">
				<GeocoderSuggestion suggestion={fullSuggestion} {onSuggestionEvent} highlighted={null} />
			</ul>
		</div>
	{/snippet}
</Story>

<Story name="Highlighted">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<ul class="bg-color-surface text-sm text-color-text shadow-lg">
				<GeocoderSuggestion
					suggestion={fullSuggestion}
					{onSuggestionEvent}
					highlighted={fullSuggestion}
				/>
			</ul>
		</div>
	{/snippet}
</Story>

<!--
The `name` and <code>address</code> fields render independently. The first suggestion
				has only a name; the second has only an address.
-->
<Story name="Name only / address only">
	{#snippet template()}
		<div class="m-6 w-72 space-y-6">
			<ul class="bg-color-surface text-sm text-color-text shadow-lg">
				<GeocoderSuggestion
					suggestion={nameOnlySuggestion}
					{onSuggestionEvent}
					highlighted={null}
				/>
				<GeocoderSuggestion
					suggestion={addressOnlySuggestion}
					{onSuggestionEvent}
					highlighted={null}
				/>
			</ul>
		</div>
	{/snippet}
</Story>
