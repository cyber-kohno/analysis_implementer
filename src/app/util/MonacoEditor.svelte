<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import loader from "@monaco-editor/loader";
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api.js";

  let editorDiv: HTMLDivElement | null = null;
  let editor: Monaco.editor.IStandaloneCodeEditor;

  // props
  export let value: string = "";
  export let language: string = "typescript";
  export let theme: Monaco.editor.BuiltinTheme = "vs";
  export let onChange: (value: string) => void = () => {};

  /** 型定義を string[] で受け取る */
  export let declares: string[] = [];

  let monaco: typeof Monaco;

  /** ▶ 各コンポーネントごとにユニーク ID を持たせる */
  const uid = crypto.randomUUID();

  /** ExtraLib の URI をユニーク化して衝突を防ぐ */
  const declareUri = `global-${uid}.d.ts`;

  /** テーマ名もコンポーネントごとにユニークにする */
  const themeName = `theme-${uid}`;

  onMount(async () => {
    if (!editorDiv) return;

    const monacoEditor = await import("monaco-editor");
    loader.config({ monaco: monacoEditor.default });
    monaco = await loader.init();

    // -----------------------------------------
    // ExtraLib を追加（グローバルに追加されるので URI はユニークにする）
    // -----------------------------------------
    if (declares.length > 0) {
      const typescript = monaco.languages.typescript as any;
      typescript.typescriptDefaults.addExtraLib(
        declares.join("\n"),
        declareUri
      );
    }

    // -----------------------------------------
    // テーマの設定（こちらもグローバルなのでユニーク名必須）
    // -----------------------------------------
    monaco.editor.defineTheme(themeName, {
      base: theme, // vs / vs-dark / hc-black など
      inherit: true,
      rules: [],
      colors: {},
    });

    editor = monaco.editor.create(editorDiv, {
      value,
      language,
      theme: themeName, // 🔥 独立したテーマを適用
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  });

  onDestroy(() => {
    editor?.dispose();
  });
</script>

<div bind:this={editorDiv} class="editor-wrapper"></div>

<style>
  .editor-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
