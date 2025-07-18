<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import { scaleBand, scaleOrdinal } from 'd3-scale';
  import CategoricalTick from './CategoricalTick.svelte';

  const { Story } = defineMeta({
    title: 'Tables/Components/Renderers/CategoricalTick',
    component: CategoricalTick,
    tags: ['autodocs'],

    argTypes: {
      value: {
        type: 'number',
        inputType: 'number'
      }
    },
    args: {
      value: 0.5,
      colorScale: scaleOrdinal()
        .domain(['a', 'b', 'c', 'd'])
        .range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']),

      extent: [0, 1],

      posScale: scaleBand().range([0, 1]).domain(['a', 'b', 'c', 'd'])
    }
  });
</script>

{#snippet defaultTemplate({ args })}
<CategoricalTick {...args} />
{/snippet}

<Story name="Default" source />

<Story name="Multiple" source>
  {#snippet template({ args })}
  <div class="flex w-36 flex-col">
    <CategoricalTick {...args} value="a" />
    <CategoricalTick {...args} value="b" />
    <CategoricalTick {...args} value="c" />
    <CategoricalTick {...args} value="d" />
  </div>
  {/snippet}
</Story>
