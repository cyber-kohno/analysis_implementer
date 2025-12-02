<script lang="ts">
  import store from "../../store/store";
  import TextInput from "../../util/form/TextInput.svelte";
  import HalfPanel from "../../util/HalfPanel.svelte";
  import LabelRecord from "../../util/LabelRecord.svelte";
  import OperationButton from "../../util/button/OperationButton.svelte";
  import WorkOperationBuilder from "./WorkOperationBuilder";

  $: work = (() => {
    const project = $store.project;
    if (project == null) throw new Error();
    const work = project.works[$store.focus[1]];
    if (work == undefined) throw new Error();
    return work;
  })();

  $: oprs = (() => {
    return WorkOperationBuilder.getOprs(work.type);
  })();

  $: setFocus = (index: number) => {
    $store.focus.push(index);
    $store.focus = $store.focus.slice();
  };

  $: updateWorkName = (v: string) => {
    work.name = v;
  };
</script>

<HalfPanel>
  <div class="left">
    <LabelRecord name="work_name" />
    <TextInput
      value={work.name}
      set={updateWorkName}
      width={"calc(100% - 4px)"}
      isRequied={true}
    />
  </div>
</HalfPanel>
<HalfPanel>
  <div class="right">
    {#each oprs as opr, index}
      <OperationButton name={opr} callback={() => setFocus(index)} />
    {/each}
  </div>
</HalfPanel>

<style>
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
