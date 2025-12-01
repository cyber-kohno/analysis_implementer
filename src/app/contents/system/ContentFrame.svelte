<script lang="ts">
  import store from "../../store/store";
  import WorkDetailFrame from "../work/WorkDetailFrame.svelte";
  import WorkManageFrame from "../work/WorkManageFrame.svelte";
  import ManageEnvs from "./manage/ManageEnvs.svelte";
  import ManageProject from "./manage/ManageProject.svelte";
  import ManageWorks from "./manage/ManageWorks.svelte";

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
</script>

<div class="wrap">
  {#if focus.length === 0}
    <ManageProject />
  {:else if focus.length === 1}
    {#if focus[0] === 0}
      <ManageEnvs />
    {/if}
    {#if focus[0] === 1}
      <ManageWorks />
    {/if}
  {:else if focus.length === 2}
    <WorkManageFrame />
  {:else if focus.length === 3}
    <WorkDetailFrame />
  {/if}
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(170, 170, 170);
    width: 100%;
    height: calc(100% - 30px);
  }
</style>
