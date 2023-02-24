<script>
	import { Button } from '../lib';
	function handleClick() {
		alert('clicked');
	}
</script>

<Button primary on:click={handleClick}>Hello</Button>

<Button on:click={handleClick}>Hello</Button>
