<script lang="ts">
  import store from "../../../store/store";
  import type StoreFileChoose from "../../../store/work/storeFileChoose";
  import StoreWork from "../../../store/work/storeWork";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import Wrap from "../../../util/layout/Wrap.svelte";
  import ChoosePhase from "./choose/ChoosePhase.svelte";
  import ScanCondPhase from "./scan/ScanCondPhase.svelte";

  $: detail = StoreWork.getDetail($store) as StoreFileChoose.Props;
</script>

<HalfPanel>
  <Wrap><ScanCondPhase /></Wrap>
</HalfPanel>
<HalfPanel>
  <Wrap>
    {#if detail.directoryTree != null}
      <ChoosePhase root={detail.directoryTree} />
    {/if}
  </Wrap>
</HalfPanel>

<style>
</style>
