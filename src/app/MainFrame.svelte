<script lang="ts">
  import { onMount } from "svelte";
  import SystemMenu from "./contents/system/SystemMenu.svelte";
  import ProjectFrame from "./contents/system/ProjectFrame.svelte";
  import store from "./store/store";
  import FileUtil from "./util/data/fileUtil";

  onMount(() => {
    const handler = (e: MouseEvent) => {
      e.preventDefault();
    };

    // window へ global keydown を登録
    window.addEventListener("keydown", (e) => {
      if (
        e.ctrlKey && // Ctrl キーが押されている
        (e.key === "s" || e.key === "S")
      ) {
        e.preventDefault(); // ブラウザの「ページを保存」ダイアログをブロック
        e.stopPropagation(); // 必要なら他のハンドラへも流れない

        if ($store.project != null) {
          FileUtil.saveProject();
        }
      }
    });
    window.addEventListener("contextmenu", handler);

    // クリーンアップ（コンポーネントが破棄されるとき）
    return () => {
      window.removeEventListener("contextmenu", handler);
    };
  });
</script>

<SystemMenu />
<ProjectFrame />
