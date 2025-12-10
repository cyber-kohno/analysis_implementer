<script lang="ts">
  import OperationSwitch from "../../../util/button/OperationSwitch.svelte";
  import LabelRecord from "../../../util/LabelRecord.svelte";
  import Column from "../../../util/layout/Column.svelte";
  import Record from "../../../util/layout/Record.svelte";

  export let isActive: boolean;
  export let setActive: () => void;
  export let name: string;

  $: surplus = (() => {
    let surplus: number | null = null;
    if (isActive) {
      surplus = 80;
    }
    return surplus;
  })();
</script>

<Record height={40} {surplus}>
  <Record height={40}>
    <Column surplus={60}>
      <LabelRecord {name}></LabelRecord>
    </Column>
    <Column width={50}>
      <OperationSwitch
        name={!isActive ? "+" : "-"}
        callback={setActive}
        {isActive}
        width={50}
      />
    </Column>
  </Record>
  {#if isActive}
    <Record surplus={40}>
      <slot />
    </Record>
  {/if}
</Record>
