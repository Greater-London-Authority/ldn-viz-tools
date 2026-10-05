<script lang="ts">
    /**
     * This is a dedicated component, as otherwise the calculation of percentage changes from baseline would need to be done in
     * a <script> block in index.md
    */

  import { chartOptions } from "$lib/components/charts/chartOptions";
  import { loadChartData, type ChartDataRow } from "$lib/components/charts/utils";
  import Chart from "./Chart.svelte";

  let {
    title,
    subtitle,
    source,
    byline,
    dataset = "borough_population",
    baseYear = "2024",
    selectedYear = 2051,
    controls
  } = $props();

  let options = $derived(chartOptions[dataset]);

  let allData = $state<ChartDataRow[]>([]);

  // Load the raw population data
  $effect(() => {
    loadChartData(dataset, options as any).then((newData) => {
      allData = newData;
    });
  });

  // Calculate percentage change for each borough between baseYear and selectedYear
  let calculatedData = $derived.by(() => {
    if (allData.length === 0) return [];

    const baseData = allData.filter((d) => d.b === baseYear);
    const targetData = allData.filter((d) => d.b === selectedYear.toString());

    return baseData.map((d) => {
      const target = targetData.find((t) => t.xd === d.xd);
      const pctChange = target ? ((target.y - d.y) / d.y) * 100 : 0;
      return {
        ...d,
        y: pctChange
      };
    });
  });
</script>


<Chart
    {dataset}
    data={calculatedData}

    {title}
    subtitle={`${subtitle ? subtitle + ' ' : ''}Showing percentage change from ${baseYear} to ${selectedYear}.`}
    {source}
    {byline}
    {controls}
>
</Chart>
 