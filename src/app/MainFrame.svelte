<script lang="ts">
  import { onMount } from "svelte";
  import SystemMenu from "./contents/system/SystemMenu.svelte";
  import ProjectFrame from "./contents/system/ProjectFrame.svelte";

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

<SystemMenu />
<ProjectFrame />
