<script>
	export let title = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	aria-hidden="true"
	stroke-width="1.5"
	stroke="currentColor"
	fill="none"
	{...$$restProps}
>
	<title>{title}</title>
	<circle cx="12" cy="12" r="3.5" />
	<circle cx="12" cy="12" r="8" />
	<line x1="12" y1="4" x2="12" y2="0" />
	<line x1="20" y1="12" x2="24" y2="12" />
	<line x1="12" y1="20" x2="12" y2="24" />
	<line x1="4" y1="12" x2="0" y2="12" />
</svg>
