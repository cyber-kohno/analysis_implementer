<script lang="ts">
  import ChooseRecord from "./ChooseRecord.svelte";
  import { writable } from "svelte/store";
  import ChooseUtil from "./chooseUtil";
  import type StoreFileChoose from "../../../../store/work/storeFileChoose";
  import StoreWork from "../../../../store/work/storeWork";
  import store from "../../../../store/store";
  import OperatinButton from "../../../../util/OperatinButton.svelte";

  export let root: StoreFileChoose.UsableNode;

  let ref: HTMLDivElement | undefined = undefined;

  $: detail = StoreWork.getDetail($store) as StoreFileChoose.Props;
  let scrollTop = 0;

  const isFlat = writable<boolean>(false);

  $: baseRecords = (() => {
    const list = ChooseUtil.getDispRecords(root, $isFlat);
    console.log(list.length);
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
  };
  $: toggleView = () => {
    // console.log(dispRecords.length);
    $isFlat = !$isFlat;
  };
  $: transfer = () => {
    // ChooseUtil.getSelectedFiles(root).join("\n"),
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
  <OperatinButton
    name={!$isFlat ? "Flat" : "Tree"}
    width={120}
    isDisable={false}
    callback={toggleView}
    isLineup
  />
  <OperatinButton
    name={!$isFlat ? "|← →|" : "|→ ←|"}
    width={90}
    isDisable={false}
    callback={toggleView}
    isLineup
  />
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
      {#each dispRecords as item, i}
        <ChooseRecord {item} dir={getDir(item)} />
      {/each}
    </div>
  </div>
</div>
<div class="operation-div">
  <OperatinButton
    name={"Cancel"}
    width={140}
    isDisable={false}
    callback={cancel}
    isLineup
  />
  <OperatinButton
    name={"Transfer"}
    width={160}
    isDisable={false}
    callback={transfer}
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
