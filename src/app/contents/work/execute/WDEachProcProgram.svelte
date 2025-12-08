<script lang="ts">
  import store from "../../../store/store";
  import type StoreExecute from "../../../store/work/StoreSingleProc";
  import StoreWork from "../../../store/work/storeWork";
  import Textarea from "../../../util/form/Textarea.svelte";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import Wrap from "../../../util/layout/Wrap.svelte";
  import MonacoEditor from "../../../util/MonacoEditor.svelte";
  import OperationButton from "../../../util/button/OperationButton.svelte";
  import TypescriptUtil from "../../../util/TypescriptUtil";
  import DataUtil from "../../../util/data/dataUtil";
  import { onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { writable } from "svelte/store";
  import type { FileRequest } from "../../../store/types";
  import Record from "../../../util/layout/Record.svelte";
  import type StoreEachProc from "../../../store/work/StoreEachProc";

  $: project = (() => {
    const project = $store.project;
    if (project == null) throw new Error();
    return project;
  })();

  $: detail = StoreWork.getDetail($store) as StoreEachProc.Props;
  $: resources = detail.resouces;

  type DynamicResource = { key: number; source: string };
  let dynamicResources = writable<DynamicResource[] | null>(null);

  let outputText = writable<string | null>(null);

  onMount(async () => {
    const dsList: DynamicResource[] = [];
    for (const [key, def] of resources.entries()) {
      if (def.retention === "static") continue;

      const { filePath, encoding } = def;
      if (filePath == undefined || encoding == undefined) throw new Error();
      const newFilePath = project.envVars.reduce(
        (ret, cur) => ret.replaceAll(`%${cur.key}%`, cur.value),
        filePath
      );
      const req: FileRequest = { filePath: newFilePath, encoding };
      const source = (await invoke("read_file", { req })) as string;
      dsList.push({ key, source });
    }
    $dynamicResources = dsList;
  });

  $: declares =
    $dynamicResources == null
      ? []
      : [
          ...resources.map((r, i) => {
            if ($dynamicResources == null) throw new Error();
            let source = "";
            if (r.retention === "static") {
              if (r.source == undefined) throw new Error();
              source = r.source;
            } else if (r.retention === "dynamic") {
              const def = $dynamicResources.find((d) => d.key === i);
              if (def == undefined) throw new Error();
              source = def.source;
            }
            const varName = r.varName;
            let type: string = "string";
            let value: any = source;
            if (r.parse != undefined) {
              const names = DataUtil.convertTableToColNames(source, r.parse);
              type = DataUtil.convertNamesToTypeDefs(names) + "[]";
              value = DataUtil.convertTableToJson(source, r.parse);
            }
            const declareDef = `declare const $${varName}: ${type}`;
            // console.log(declareDef);
            return { name: `$${r.varName}`, value, declareDef };
          }),
          // 出力関数
          {
            name: "$output",
            value: (str: string) => ($outputText += `${str}`),
            declareDef: `declare const $output: (str: string) => void;`,
          },
        ];

  $: cancel = () => {
    $outputText = null;
  };

  $: execute = () => {
    // console.log(`execute start! ${req.files.length}`);
    $outputText = "";

    const start = async () => {
      const func = new Function(
        ...declares.map((d) => d.name),
        TypescriptUtil.transpileTsToJs(detail.srcEach)
      );
      func(...declares.map((d) => d.value));
    };

    start().catch((e) => {
      alert(e);
      cancel();
    });
  };
</script>

{#if $dynamicResources != null}
  <HalfPanel>
    <div class="left">
      <div class="main">
        <div class="start-src">
          <Wrap>
            <MonacoEditor
              value={detail.srcStart}
              onChange={(v) => {
                detail.srcStart = v;
              }}
              theme="vs-dark"
              declares={declares.map((d) => d.declareDef)}
            />
          </Wrap>
        </div>
        <div class="each-src">
          <Wrap>
            <MonacoEditor
              value={detail.srcEach}
              onChange={(v) => {
                detail.srcEach = v;
              }}
              theme="vs-dark"
              declares={declares
                .map((d) => d.declareDef)
                .concat(detail.srcStart)}
            />
          </Wrap>
        </div>
        <div class="end-src">
          <Wrap>
            <MonacoEditor
              value={detail.srcEnd}
              onChange={(v) => {
                detail.srcEnd = v;
              }}
              theme="vs-dark"
              declares={declares.map((d) => d.declareDef)}
            />
          </Wrap>
        </div>
        {#if $outputText != null}
          <div class="blind"></div>
        {/if}
      </div>
      <Record align="right">
        <OperationButton
          name={"Execute"}
          callback={execute}
          isLineup
          width={150}
          isDisable={detail.srcEach === "" || $outputText != null}
        />
      </Record>
    </div>
  </HalfPanel>
  <HalfPanel>
    <div class="right">
      <div class="main">
        <Wrap>
          <Textarea
            value={$outputText ?? ""}
            readonly
            disable={$outputText == null}
          />
        </Wrap>
      </div>
      <div class="record">
        <OperationButton
          name={"Cancel"}
          callback={cancel}
          isLineup
          width={150}
          isDisable={$outputText == null}
        />
      </div>
    </div>
  </HalfPanel>
{/if}

<style>
  .left {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    /* background-color: rgb(240, 241, 203); */
  }
  .blind {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #2378227d;
    left: 0;
    top: 0;
    z-index: 5;
  }
  .right {
    display: inline-block;
    position: relative;
    margin: 4px 0 0 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    /* background-color: rgb(189, 157, 157); */
    overflow-y: auto;
  }
  .main {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    background-color: #a0a0a0;
    box-sizing: border-box;
    text-align: left;
  }
  .record {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 30px;
    background-color: #8888aa22;
    box-sizing: border-box;
    text-align: right;
  }
  .start-src {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 30%;
    /* background-color: #8e4d5d22; */
  }
  .each-src {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 40%;
    /* background-color: #5d92524b; */
  }
  .end-src {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 30%;
    /* background-color: #8282d25c; */
  }
</style>
