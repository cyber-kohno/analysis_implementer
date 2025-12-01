<script lang="ts">
  import store from "../../store/store";
  import WDExecute from "./execute/WDExecute.svelte";
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

{#if opr === "Proc"}
  <WDExecute />
{/if}
