<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const handler = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handler);

    // クリーンアップ（コンポーネントが破棄されるとき）
    return () => {
      window.removeEventListener("contextmenu", handler);
    };
  });

</script>


<style>
  .header {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #fff;
  }
  .main {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    background-color: white;
  }
</style>
