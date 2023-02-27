<script>
	// Test for vanilla component - uncomment below and comment out other button intstantiation
	// import { Button } from '../../vanilla/ldn-viz-tools.js';

	// const draw = () =>
	// new Button({ target: document.getElementById('app'), props: { primary: true, label: 'boom' } });
	// onMount(draw);

	import { Button, Scatterplot } from '../lib';
	function handleClick() {
		alert('clicked');
	}

	const data = [
		{
			year: 2017,
			value: 320,
			group: 'apples'
		},
		{
			year: 2017,
			value: 480,
			group: 'bananas'
		},
		{
			year: 2017,
			value: 640,
			group: 'cherries'
		},
		{
			year: 2017,
			value: 400,
			group: 'dates'
		},
		{
			year: 2018,
			value: 640,
			group: 'apples'
		},
		{
			year: 2018,
			value: 960,
			group: 'bananas'
		},
		{
			year: 2018,
			value: 640,
			group: 'cherries'
		},
		{
			year: 2018,
			value: 400,
			group: 'dates'
		},
		{
			year: 2019,
			value: 1600,
			group: 'apples'
		},
		{
			year: 2019,
			value: 1440,
			group: 'bananas'
		},
		{
			year: 2019,
			value: 960,
			group: 'cherries'
		},
		{
			year: 2019,
			value: 400,
			group: 'dates'
		},
		{
			year: 2020,
			value: 3840,
			group: 'apples'
		},
		{
			year: 2020,
			value: 1920,
			group: 'bananas'
		},
		{
			year: 2020,
			value: 960,
			group: 'cherries'
		},
		{
			year: 2020,
			value: 400,
			group: 'dates'
		}
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/ldn-viz-tools/vanilla/style.css" />
</svelte:head>

<Button primary on:click={handleClick}>Hello</Button>

<Button on:click={handleClick} />

<Scatterplot title="The Title" {data} xKey="year" yKey="value" />

<div id="app" />
