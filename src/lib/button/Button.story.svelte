<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Button from './Button.svelte';
	export let Hst: Hst;
</script>

<Hst.Story title="ldn-viz/Button">
	<!-- Typed! -->
	<Hst.Variant title="default"><Button primary>Primary button</Button></Hst.Variant>
	<Hst.Variant title="Fast"><Button>Seconday Button</Button></Hst.Variant>
</Hst.Story>
