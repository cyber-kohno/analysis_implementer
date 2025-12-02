<script lang="ts">
  import store from "../../../store/store";
  import StoreWork from "../../../store/work/storeWork";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import OperationButton from "../../../util/button/OperationButton.svelte";
  import WorkItem from "./WorkItem.svelte";

  $: project = (() => {
    const project = $store.project;
    if (project == null) throw new Error();
    return project;
  })();
  $: works = project.works;

  $: add = (type: StoreWork.WorkType) => {
    works.push(StoreWork.getInitial(type, works.length));
    project.works = works.slice();
  };
</script>

<div class="wrap">
  <HalfPanel>
    <div class="left">
      <OperationButton name={"Add Execute"} callback={() => add("execute")} />
      <OperationButton
        name={"Add Execute Iterate"}
        callback={() => add("execute-iterate")}
      />
      <OperationButton
        name={"Add File Choose"}
        callback={() => add("file-choose")}
      />
    </div>
  </HalfPanel>
  <HalfPanel>
    <div class="right">
      {#each works as work, index}
        <WorkItem {work} {index} />
      {/each}
    </div>
  </HalfPanel>
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(234, 245, 255);
    width: 100%;
    height: 100%;
  }
  .left {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background-color: rgb(203, 223, 241);
  }
  .right {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background-color: rgb(157, 186, 189);
    overflow-y: auto;
  }
</style>
