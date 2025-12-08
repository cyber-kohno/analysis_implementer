<script lang="ts">
  import store from "../../store/store";
  import WDChooseFile from "./choose-file/WDChooseFile.svelte";
  import WDEachTarget from "./each/WDEachTarget.svelte";
  import WDEachProcProgram from "./execute/WDEachProcProgram.svelte";
  import WDSingleProcProgram from "./execute/WDSingleProcProgram.svelte";
  import WDResources from "./resource/WDResources.svelte";
  import WorkOperationBuilder from "./WorkOperationBuilder";

  $: oprs = (() => {
    const project = $store.project;
    if (project == null) throw new Error();
    const work = project.works[$store.focus[1]];
    if (work == undefined) throw new Error();
    return WorkOperationBuilder.getOprs(work.type);
  })();

  $: opr = (() => {
    const oprIndex = $store.focus[2];
    return oprs[oprIndex];
  })();
</script>

{#if opr === "Program"}
  <WDSingleProcProgram />
{:else if opr === "Iterate-Program"}
  <WDEachProcProgram />
{:else if opr === "Resources"}
  <WDResources />
{:else if opr === "Iterate-Target"}
  <WDEachTarget />
{:else if opr === "File-Choose"}
  <WDChooseFile />
{/if}
