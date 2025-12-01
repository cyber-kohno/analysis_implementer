<script lang="ts">
  import store from "../../../store/store";
  import WorkOperationBuilder from "../../work/WorkOperationBuilder";
  import ChannelItem from "./ChannelItem.svelte";

  $: focus = $store.focus;

  $: getManageName = () => {
    if (focus.length === 0) throw new Error();
    return (() => {
      switch (focus[0]) {
        case 0:
          return "Envs";
        case 1:
          return "Works";
        default:
          throw new Error();
      }
    })();
  };
  $: getWork = () => {
    if (focus.length < 2) throw new Error();
    const project = $store.project;
    if (project == null) throw new Error();
    const work = project.works[$store.focus[1]];
    if (work == undefined) throw new Error();
    return work;
  };
  $: getWorkOpr = () => {
    if (focus.length < 3) throw new Error();
    const work = getWork();
    const oprs = WorkOperationBuilder.getOprs(work.type);
    return oprs;
  };
</script>

<div class="wrap">
  <ChannelItem isActive={focus.length === 0} name={"Project"} depth={0} />
  {#if focus.length > 0}
    <ChannelItem
      isActive={focus.length === 1}
      name={getManageName()}
      depth={1}
    />
  {/if}
  {#if focus.length > 1}
    <ChannelItem
      isActive={focus.length === 2}
      name={getWork().type}
      depth={2}
    />
  {/if}
  {#if focus.length > 2}
    <ChannelItem
      isActive={focus.length === 3}
      name={getWorkOpr()[focus[2]]}
      depth={3}
    />
  {/if}
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(88, 88, 88);
    width: 100%;
    height: 30px;
    vertical-align: top;
  }
</style>
