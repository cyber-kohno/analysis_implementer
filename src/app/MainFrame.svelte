<script lang="ts">
  import { onMount } from "svelte";
  import SystemMenu from "./contents/system/SystemMenu.svelte";
  import ProjectFrame from "./contents/system/ProjectFrame.svelte";
  import store from "./store/store";
  import FileUtil from "./util/data/fileUtil";
  import { invoke } from "@tauri-apps/api/core";
  import { listen } from "@tauri-apps/api/event";
  import type { FileRequest } from "./store/types";

  listen("tauri://file-drop", (event) => {
    alert(event.payload);
  });

  let args: string[] | null = null;
  onMount(async () => {
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

    args = (await invoke("get_cli_args")) as string[];

    if(args.length >= 2) {
      const filePath = args[1];
      const req: FileRequest = { filePath, encoding: 'sjis' };
      const fileContent = (await invoke("read_file", { req })) as string;
      const jsonStr = FileUtil.unZip(fileContent);
      $store.project = JSON.parse(jsonStr);
    }
    // alert(args);
    // // クリーンアップ（コンポーネントが破棄されるとき）
    // return () => {
    //   window.removeEventListener("contextmenu", handler);
    // };
  });
</script>

{#if args != null}
  <SystemMenu />
  <ProjectFrame />
{/if}
