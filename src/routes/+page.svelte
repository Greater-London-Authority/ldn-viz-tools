<script>
	// Test for vanilla component - uncomment below and comment out other button intstantiation
	// import { Button } from '../../vanilla/ldn-viz-tools.js';

	// const draw = () =>
	// new Button({ target: document.getElementById('app'), props: { primary: true, label: 'boom' } });
	// onMount(draw);

	import { data } from '../data/testData';
	import { BarChart, Button, Scatterplot } from '../lib';
	function handleClick() {
		alert('clicked');
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/ldn-viz-tools/vanilla/style.css" />
</svelte:head>

<Button primary on:click={handleClick}>Hello</Button>

<Button on:click={handleClick} />

<Scatterplot title="The Title" {data} xKey="year" yKey="value" />

<BarChart title="The Title" {data} xKey="year" yKey="value" />

<div id="app" />
