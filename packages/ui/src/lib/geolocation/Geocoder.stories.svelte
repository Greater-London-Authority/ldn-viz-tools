<script context="module">
	import Geocoder from './Geocoder.svelte';

	export const meta = {
		title: 'Ui/Geocoder',
		component: Geocoder,
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { GeocoderAdapterList } from './GeocoderAdapterList';

	let results
	let selected = ''

	const formatResult = (location) => {
		return '\n' + JSON.stringify(location, null, 2)
	}

	const onLocationSelected = (location) => {
		selected = formatResult(location)
	}

	const listAdapter = new GeocoderAdapterList([
		{
			id: 1,
			center: [-0.08564082393624517, 51.4944230052667],
			name: "Bricklayers' Arms",
			address: "South of London Bridge somewhere",
		},
		{
			id: 11,
			center: [-0.08564082393624517, 51.4944230052667],
			name: "Bricklayers Arms Flyover",
			address: "Flys over Bricklayers' Arms",
		},
		{
			id: 12,
			center: [-0.07272570707647219, 51.520966913867824],
			name: "Brick Lane Market",
			address: "Brick Lane Market, 91 Brick Ln, London, England E1 6RU, United Kingdom",
		},
		{
			id: 13,
			center: [-0.0682034415460464, 51.605862586455316],
			name: "The Bricklayers Arms",
			address: "The Bricklayers Arms, 803-805 High Rd, London, England N17 8ER, United Kingdom",
		},
		{
			id: 14,
			center: [-0.2167357587457559, 51.466139217180796],
			name: "The Bricklayers Arms",
			address: "The Bricklayers Arms, 32 Waterman St, London, England SW15 1DD, United Kingdom",
		},
		{
			id: 2,
			center: [-0.08564082393624517, 51.4944230052667],
			name: "Bricklayers Arms Flyover",
			address: "Flys over Bricklayers' Arms",
		},
		{
			id: 2,
			center: [-0.10552520175642144, 51.495195323492794],
			name: "West Square Gardens",
			address: "West Sq, Lambeth, London",
		},
		{
			id: 3,
			bounds: [
				-0.12463302780648178,
				51.520795753244215,
				-0.12751886736666052,
				51.522583023763104, 
			],
			name: "Russell Square",
			address: "Next to Russell Square station, Bloomsbury, Camden, London",
		},
		{
			id: 4,
			bounds: [
				-0.025778325874284747,
				51.4962206418233,
				-0.027878115405741255,
				51.49783613304322, 
			],
			name: "Sir John McDougall Gardens",
			address: "Westferry Rd, Tower Hamlets, London",
		},
	])
</script>

<Template let:args>
	<Geocoder {...args} />
</Template>

<Story	name="Suggestions dropdown">
	<div class="m-6 space-y-6">
		<p class="dark:text-white">
			A simple geocoder with dropdown suggestions. A simple hardcoded list adapter is used here so results are limited.
		</p>
		<p class="dark:text-white">
			At elast three characters are required before any suggestions are provided. This avoids spamming the underlying Web APIs with excessively vague requests.
		</p>
		<p class="dark:text-white">
			Try entering 'brick' or 'london' if you're having trouble finding any places.
		</p>
		<Geocoder
			adapter={listAdapter}
			{onLocationSelected}
			classes="w-72" />
		<pre class="dark:text-white whitespace-pre-wrap">
			{selected}
		</pre>
	</div>
</Story>

<Story	name="Disabled dropdown">
	<div class="m-6 space-y-6">
		<p class="dark:text-white">
			I've disabled the dropdown in this story, intead, I'm accessing the results by binding on the result set. I'm manually displaying them below but you can do whatever you like with them.
		</p>
		<p class="dark:text-white">
			Try entering 'brick' or 'london' if you're having trouble finding any places.
		</p>
		<Geocoder
			disableSuggestionList
			adapter={listAdapter}
			bind:results
			classes="w-72" />
		<pre class="dark:text-white whitespace-pre-wrap">
			{#if results}	
				{#each results as location}
					{formatResult(location)}<br />
				{/each}
			{/if}
		</pre>
	</div>
</Story>
