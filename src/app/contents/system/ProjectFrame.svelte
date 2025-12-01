<script lang="ts">
  import store from "../../store/store";
  import ChannelFrame from "./channel/ChannelFrame.svelte";
  import ContentFrame from "./ContentFrame.svelte";

  $: isOpenProject = $store.project != null;
</script>

<div class="wrap">
  {#if isOpenProject}
    <ChannelFrame />
    <ContentFrame />
  {/if}
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(215, 232, 247);
    width: 100%;
    height: calc(100% - 30px);
  }
</style>
