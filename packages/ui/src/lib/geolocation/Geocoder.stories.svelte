<script context="module">
	import Geocoder from './Geocoder.svelte';
	import GeocoderSuggestionList from './GeocoderSuggestionList.svelte';

	export const meta = {
		title: 'Ui/Components/Geocoder',
		component: Geocoder,
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { GeocoderAdapterList } from './GeocoderAdapterList';
	import type {
		Geolocation,
		GeolocationCoords,
		GeolocationNamed,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from './types';

	let suggestions: undefined | GeolocationNamed[];
	let selected = {};

	const formatResult = (location: Geolocation): string => {
		return '\n' + JSON.stringify(location, null, 2);
	};

	const onLocationSelected: OnGeolocationSearchResult = (location: Geolocation) => {
		selected = location;
	};

	const onSearchError: OnGeolocationSearchError = (err) => {
		console.error(err);
	};

	const centerOfBounds = (bounds: [number, number, number, number]): GeolocationCoords => {
		return [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2];
	};

	const listAdapter = new GeocoderAdapterList([
		{
			id: '1',
			center: [-0.08564082393624517, 51.4944230052667],
			name: "Bricklayers' Arms",
			address: 'South of London Bridge somewhere'
		},
		{
			id: '11',
			center: [-0.08564082393624517, 51.4944230052667],
			name: 'Bricklayers Arms Flyover',
			address: "Flys over Bricklayers' Arms"
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
			id: '2',
			center: [-0.08564082393624517, 51.4944230052667],
			name: 'Bricklayers Arms Flyover',
			address: "Flys over Bricklayers' Arms"
		},
		{
			id: '3',
			center: [-0.10552520175642144, 51.495195323492794],
			name: 'West Square Gardens',
			address: 'West Sq, Lambeth, London'
		},
		{
			id: '4',
			center: centerOfBounds([
				-0.12463302780648178, 51.520795753244215, -0.12751886736666052, 51.522583023763104
			]),
			bounds: [-0.12463302780648178, 51.520795753244215, -0.12751886736666052, 51.522583023763104],
			name: 'Russell Square',
			address: 'Next to Russell Square station, Bloomsbury, Camden, London'
		},
		{
			id: '5',
			center: centerOfBounds([
				-0.025778325874284747, 51.4962206418233, -0.027878115405741255, 51.49783613304322
			]),
			bounds: [-0.025778325874284747, 51.4962206418233, -0.027878115405741255, 51.49783613304322],
			name: 'Sir John McDougall Gardens',
			address: 'Westferry Rd, Tower Hamlets, London'
		}
	]);
</script>

<Template let:args>
	<Geocoder {...args} />
</Template>

<Story name="Suggestions dropdown">
	<div class="m-6 space-y-6">
		<p class="dark:text-white">
			A simple geocoder with dropdown suggestions. A simple hardcoded list adapter is used here so
			results are limited.
		</p>
		<p class="dark:text-white">
			At least three characters are required before any suggestions are provided. This avoids
			spamming the underlying Web APIs with excessively vague requests.
		</p>
		<p class="dark:text-white">
			Try entering 'brick' or 'london' if you're having trouble finding any places.
		</p>
		<Geocoder
			let:onSuggestionEvent
			let:attribution
			let:suggestions
			adapter={listAdapter}
			{onLocationSelected}
			{onSearchError}
			classes="w-72"
		>
			{#if suggestions?.length > 0}
				<GeocoderSuggestionList
					{onSuggestionEvent}
					{attribution}
					{suggestions}
					{selected}
					maxSuggestions={5}
				/>
			{/if}
		</Geocoder>
		<pre class="dark:text-white whitespace-pre-wrap">
			{selected ? formatResult(selected) : formatResult({})}
		</pre>
	</div>
</Story>

<Story name="Selected">
	<div class="m-6 space-y-6">
		<p class="dark:text-white">
			A simple geocoder with dropdown suggestions. A simple hardcoded list adapter is used here so
			results are limited.
		</p>
		<p class="dark:text-white">
			At least three characters are required before any suggestions are provided. This avoids
			spamming the underlying Web APIs with excessively vague requests.
		</p>
		<p class="dark:text-white">
			Try entering 'brick' or 'london' if you're having trouble finding any places.
		</p>
		<Geocoder
			let:onSuggestionEvent
			let:attribution
			let:suggestions
			adapter={listAdapter}
			bind:selected
			{onSearchError}
			classes="w-72"
		>
			{#if suggestions?.length > 0}
				<GeocoderSuggestionList
					{onSuggestionEvent}
					{attribution}
					{suggestions}
					{selected}
					maxSuggestions={5}
				/>
			{/if}
		</Geocoder>
		<pre class="dark:text-white whitespace-pre-wrap">
			{selected ? formatResult(selected) : formatResult({})}
		</pre>
	</div>
</Story>

<Story name="Disabled dropdown">
	<div class="m-6 space-y-6">
		<p class="dark:text-white">
			I've disabled the dropdown in this story, instead, I'm accessing the results by binding on the
			result set. I'm manually displaying them below but you can do whatever you like with them.
		</p>
		<p class="dark:text-white">
			Try entering 'brick' or 'london' if you're having trouble finding any places.
		</p>
		<Geocoder
			adapter={listAdapter}
			{onLocationSelected}
			{onSearchError}
			bind:suggestions
			classes="w-72"
		/>
		<pre class="dark:text-white whitespace-pre-wrap">
			{#if suggestions}
				{#each suggestions as location}
					{formatResult(location)}<br />
				{/each}
			{/if}
		</pre>
	</div>
</Story>

<Story name="Custom placeholder">
	<div class="m-6 space-y-6">
		<p class="dark:text-white">
			A simple geocoder with dropdown suggestions. A simple hardcoded list adapter is used here so
			results are limited.
		</p>
		<p class="dark:text-white">
			At least three characters are required before any suggestions are provided. This avoids
			spamming the underlying Web APIs with excessively vague requests.
		</p>
		<p class="dark:text-white">
			Try entering 'brick' or 'london' if you're having trouble finding any places.
		</p>
		<Geocoder
			let:onSuggestionEvent
			let:attribution
			let:suggestions
			adapter={listAdapter}
			{onLocationSelected}
			{onSearchError}
			classes="w-72"
			placeholder="Type here to search for a place "
		>
			{#if suggestions?.length > 0}
				<GeocoderSuggestionList
					{onSuggestionEvent}
					{attribution}
					{suggestions}
					{selected}
					maxSuggestions={5}
				/>
			{/if}
		</Geocoder>
		<pre class="dark:text-white whitespace-pre-wrap">
			{selected ? formatResult(selected) : formatResult({})}
		</pre>
	</div>
</Story>
