<script lang="ts">
	interface Props {
		[key: string]: any;
	}

	let { ...rest }: Props = $props();
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...rest}>
	<path
		d="M7.5 12.2574L7.5 16.5M7.5 16.5L11.7426 16.5M7.5 16.5L16 8M16.4999 11.7428L16.4999 7.50014M16.4999 7.50014L12.2573 7.50014M16.4999 7.50014L7.9999 16.0001M18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8493 2.12132 9.15077 5.63604 5.63606C9.15076 2.12134 14.8492 2.12134 18.364 5.63606C21.8787 9.15077 21.8787 14.8493 18.364 18.364Z"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
</svg>
