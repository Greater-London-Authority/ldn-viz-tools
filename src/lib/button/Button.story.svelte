<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Button from './Button.svelte';
	export let Hst: Hst;
</script>

<Hst.Story title="ui/Button">
	<!-- Typed! -->
	<Hst.Variant title="default"><Button>Default button</Button></Hst.Variant>
	<Hst.Variant title="primary"><Button primary>Primary Button</Button></Hst.Variant>
</Hst.Story>
