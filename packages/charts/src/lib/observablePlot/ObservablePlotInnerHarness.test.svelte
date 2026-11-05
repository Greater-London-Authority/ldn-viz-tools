<script lang="ts">
	/**
	 * Test-only harness for ObservablePlotInner.svelte.test.ts.
	 *
	 * `rerender` replaces the whole props object, so a component that reads `spec`
	 * straight from its props sees a change even when `spec` is the same object.
	 * Passing `spec` through `$derived` drops updates to the same object, as a
	 * parent that holds `spec` in its own state would.
	 */
	import ObservablePlotInner from './ObservablePlotInner.svelte';

	interface Props {
		spec: any;
		data: { [key: string]: any }[];
		id: string;
		ariaHidden?: boolean;
	}

	let { spec, data, id, ariaHidden = true }: Props = $props();

	const stableSpec = $derived(spec);
</script>

<ObservablePlotInner spec={stableSpec} {data} {id} {ariaHidden} />
