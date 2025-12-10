<script lang="ts">
  import ChooseRecord from "./ChooseRecord.svelte";
  import { writable } from "svelte/store";
  import ChooseUtil from "./chooseUtil";
  import type StoreFileChoose from "../../../../store/work/storeFileChoose";
  import OperationButton from "../../../../util/button/OperationButton.svelte";
  import store from "../../../../store/store";

  let ref: HTMLDivElement | undefined = undefined;

  export let detail: StoreFileChoose.Props;
  $: root = (() => {
    if (detail.directoryTree == null) throw new Error();
    return detail.directoryTree;
  })();
  let scrollTop = 0;

  const isFlat = writable<boolean>(false);

  $: baseRecords = (() => {
    const list = ChooseUtil.getDispRecords(root, $isFlat);
    return list;
  })();

  $: dispRecords = (() => {
    const list: StoreFileChoose.NodeDispProps[] = [];
    baseRecords.forEach((r, i) => {
      if (ref != undefined) {
        const rect = ref.getBoundingClientRect();
        console.log(scrollTop);
        const criteria = -scrollTop + i * 25;
        console.log(criteria);
        if (criteria >= 0 && criteria <= rect.height) list.push(r);
      }
    });
    return list;
  })();

  $: cancel = () => {
    detail.directoryTree = null;
    $store = { ...$store };
  };
  $: toggleView = () => {
    // console.log(dispRecords.length);
    $isFlat = !$isFlat;
  };
  $: copyClipboard = () => {
    const list = ChooseUtil.getDispRecords(root, true);
    const text = list
      .filter((r) => r.node.isSelected)
      .map(
        (r) => `${r.node.path}\\${r.node.name}`
      )
      .join("\n");
    navigator.clipboard.writeText(text);
    alert('The selected element has been saved to the clipboard.');
  };

  $: getDir = (item: StoreFileChoose.NodeDispProps) => {
    let ret: string | null = null;
    if ($isFlat) {
      ret = item.node.path
        .replace(detail.scanRequest.rootPath, "")
        .replace(item.node.name, "");
    }
    return ret;
  };
</script>

<div class="operation-div">
  <OperationButton
    name={!$isFlat ? "Flat" : "Tree"}
    width={120}
    isDisable={false}
    callback={toggleView}
    isLineup
  />
  <!-- <OperationButton
    name={!$isFlat ? "|← →|" : "|→ ←|"}
    width={90}
    isDisable={false}
    callback={toggleView}
    isLineup
  /> -->
</div>
<div class="main">
  <div
    class="list"
    bind:this={ref}
    onscroll={(e) => {
      scrollTop = e.currentTarget.scrollTop;
    }}
  >
    <div class="inner" style:height="{baseRecords.length * 25}px">
      {#each dispRecords as item}
        <ChooseRecord {item} dir={getDir(item)} />
      {/each}
    </div>
  </div>
</div>
<div class="operation-div">
  <OperationButton
    name={"Cancel"}
    width={140}
    isDisable={false}
    callback={cancel}
    isLineup
  />
  <OperationButton
    name={"Clipboard"}
    width={190}
    isDisable={false}
    callback={copyClipboard}
    isLineup
  />
</div>

<!-- {#if $store.preview != undefined}
  <FloatDialog />
{/if} -->

<style>
  .main {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% - 64px);
  }
  .list {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background-color: #ffffff;
    overflow: auto;
  }
  .inner {
    display: inline-block;
    position: relative;
    width: 100%;
  }
  .operation-div {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 32px;
    background-color: #8888aa44;
    text-align: right;
  }
</style>
