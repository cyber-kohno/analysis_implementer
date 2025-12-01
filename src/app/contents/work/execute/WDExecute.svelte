<script lang="ts">
  import store from "../../../store/store";
  import type StoreExecute from "../../../store/work/StoreExecute";
  import StoreWork from "../../../store/work/storeWork";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import MonacoEditor from "../../../util/MonacoEditor.svelte";

  $: detail = StoreWork.getDetail($store) as StoreExecute.Props;
</script>

<HalfPanel>
  <div class="left">
    <MonacoEditor
      value={detail.source}
      onChange={(v) => {
        detail.source = v;
      }}
      theme="vs-dark"
    />
  </div>
</HalfPanel>
<HalfPanel>
  <div class="right"></div>
</HalfPanel>

<style>
  .left {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background-color: rgb(240, 241, 203);
  }
  .right {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background-color: rgb(189, 157, 157);
    overflow-y: auto;
  }
</style>
