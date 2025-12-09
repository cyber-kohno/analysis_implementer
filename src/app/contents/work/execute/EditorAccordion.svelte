<script lang="ts">
  import OperationSwitch from "../../../util/button/OperationSwitch.svelte";
  import LabelRecord from "../../../util/LabelRecord.svelte";
  import Column from "../../../util/layout/Column.svelte";
  import Record from "../../../util/layout/Record.svelte";

  export let isFull: boolean;
  export let isHidden: boolean;
  export let setFull: () => void;
  export let setHidden: () => void;
  export let name: string;
  export let rate: number;

  $: [rateValue, surplus] = (() => {
    let surplus: number | null = null;
    let rateValue: number | null = rate;
    if (isFull) {
      rateValue = null;
      surplus = 80;
    }
    if (isHidden) rateValue = null;
    return [rateValue, surplus];
  })();
</script>

<Record rate={rateValue} height={40} {surplus}>
  <Record height={40}>
    <Column surplus={120}>
      <LabelRecord {name}></LabelRecord>
    </Column>
    <Column width={120}>
      <OperationSwitch
        name={"-"}
        callback={setHidden}
        isActive={isHidden}
        width={50}
      />
      <OperationSwitch
        name={"+"}
        callback={setFull}
        isActive={isFull}
        width={50}
      />
    </Column>
  </Record>
  {#if !isHidden}
    <Record surplus={40}>
      <slot />
    </Record>
  {/if}
</Record>
