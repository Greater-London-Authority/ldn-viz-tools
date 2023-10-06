<script>
	export let circleClass = '';
	export let arcClass = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 100 100"
	fill="none"
	stroke-width="8"
	{...$$restProps}
>
	<circle stroke="#515a5e" cx="50" cy="50" r="38" class={circleClass} />
	<path stroke="#6DA7DE" d="M 50,12 a 38,38 0 0,1 38,38" class={arcClass}>
		<animateTransform
			attributeName="transform"
			type="rotate"
			from="0 50 50"
			to="360 50 50"
			dur="1s"
			repeatCount="indefinite"
		/>
	</path>
</svg>
