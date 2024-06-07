<script lang="ts">
	import { mean } from 'd3-array';
	import { format } from 'd3-format';
	export let values;

	$: meanVal = mean(values);

	export let formatString = '0.0f';
	$: f = format(formatString);
</script>

<span>{f(meanVal)}</span>
