<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import loader from "@monaco-editor/loader";
  import type * as Monaco from "monaco-editor";

  let editorDiv: HTMLDivElement | null = null;
  let editor: Monaco.editor.IStandaloneCodeEditor;

  export let value = "";
  export let language = "typescript";
  export let theme: Monaco.editor.BuiltinTheme = "vs";
  export let onChange: (value: string) => void = () => {};
  export let declares: string[] = [];

  const uid = crypto.randomUUID();
  const declareUri = `global-${uid}.d.ts`;
  const themeName = `theme-${uid}`;

  let extraLib: any | null = null;

  onMount(async () => {
    if (!editorDiv) return;

    loader.config({
      paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs",
      },
    });

    const monaco = await loader.init();

    const typescript = monaco.languages.typescript as any;

    if (declares.length > 0) {
      console.log(declareUri);
      extraLib = typescript.typescriptDefaults.addExtraLib(
        declares.join("\n"),
        declareUri
      );
    }

    // 🟦 テーマ定義
    monaco.editor.defineTheme(themeName, {
      base: theme,
      inherit: true,
      rules: [],
      colors: {},
    });

    editor = monaco.editor.create(editorDiv, {
      value,
      language,
      theme: themeName,
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  });

  onDestroy(() => {
    editor?.dispose();
    extraLib?.dispose();
  });
</script>

<div bind:this={editorDiv} class="editor-wrapper"></div>

<style>
  .editor-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
