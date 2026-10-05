<script lang="ts">
  import { Input } from "@ldn-viz/ui";

  let { selectedYear = $bindable(), baseYear, label = "Comparison Year" } = $props();
</script>

<div class="space-y-4 w-full md:w-1/2">
  <div class="px-4 pt-4">
    <label for="year-slider" class="block text-sm font-medium text-color-text">
      {label}: <span class="font-bold text-color-interactive-primary-active">{selectedYear}</span>
    </label>
    <Input
      id="year-slider"
      type="range"
      min="2025"
      max="2051"
      step="1"
      bind:value={selectedYear}
      class="w-full h-2 bg-color-border-muted rounded-lg appearance-none cursor-pointer mt-2"
    />
    <div class="flex justify-between text-xs text-color-text-muted mt-1">
      <span>2025</span>
      <span>2051</span>
    </div>
  </div>
</div>