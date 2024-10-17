<script context="module">
  import PairArrowCell from './PairArrowCell.svelte';

  export const meta = {
    title: 'Tables/Renderers/PairArrowCell',
    component: PairArrowCell,

    args: {
      value: 0.5,
      contextVals: [0.1]
    }
  };
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
  <PairArrowCell {...args} />
</Template>

<Story name="Default" source />


<Story name="Multiple - custom colors" source>
  <div class="w-36 flex flex-col">
    <PairArrowCell
      value={-2}
      extent={[-2, +2]}
      positiveColor="pink"
      negativeColor="gold"
    />
    <PairArrowCell
      value={-1}
      extent={[-2, +2]}
      positiveColor="pink"
      negativeColor="gold"
    />
    <PairArrowCell
      value={+1}
      extent={[-2, +2]}
      positiveColor="pink"
      negativeColor="gold"
    />
    <PairArrowCell
      value={+2}
      extent={[-2, +2]}
      positiveColor="pink"
      negativeColor="gold"
    />
  </div>
</Story>
