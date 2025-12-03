<script lang="ts">
  import store from "../../../store/store";
  import type StoreExecute from "../../../store/work/StoreExecute";
  import StoreWork from "../../../store/work/storeWork";
  import Textarea from "../../../util/form/Textarea.svelte";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import Wrap from "../../../util/layout/Wrap.svelte";
  import MonacoEditor from "../../../util/MonacoEditor.svelte";
  import OperationButton from "../../../util/button/OperationButton.svelte";
  import TypescriptUtil from "../../../util/TypescriptUtil";
  import DataUtil from "../../../util/data/dataUtil";

  $: detail = StoreWork.getDetail($store) as StoreExecute.Props;
  $: resources = detail.resouces;

  $: declares = [
    ...resources.map((r) => {
      let source = "";
      if (r.retention === "static") {
        if (r.source == undefined) throw new Error();
        source = r.source;
      } else if (r.retention === "dynamic") {
      }
      const varName = r.varName;
      let type: string = "string";
      let value: any = source;
      if (r.convert != undefined) {
        const names = DataUtil.convertTableToColNames(source, r.convert);
        type = DataUtil.convertNamesToTypeDefs(names) + "[]";
        value = DataUtil.convertTableToJson(source, r.convert);
      }
      const declareDef = `declare const $${varName}: ${type}`;
      console.log(declareDef);
      return { name: `$${r.varName}`, value, declareDef };
    }),
    // 出力関数
    {
      name: "$output",
      value: (str: string) => (detail.output += `${str}`),
      declareDef: `declare const $output: (str: string) => void;`,
    },
  ];

  $: cancel = () => {
    detail.output = null;
  };
  $: execute = () => {
    // console.log(`execute start! ${req.files.length}`);

    detail.output = "";

    const start = async () => {
      const func = new Function(
        ...declares.map((d) => d.name),
        TypescriptUtil.transpileTsToJs(detail.source)
      );
      func(...declares.map((d) => d.value));
    };

    start().catch((e) => {
      alert(e);
      cancel();
    });
  };
</script>

<HalfPanel>
  <div class="left">
    <div class="main">
      <MonacoEditor
        value={detail.source}
        onChange={(v) => {
          detail.source = v;
        }}
        theme="vs-dark"
        declares={declares.map((d) => d.declareDef)}
      />
      {#if detail.output != null}
        <div class="blind"></div>
      {/if}
    </div>
    <div class="record">
      <OperationButton
        name={"Execute"}
        callback={execute}
        isLineup
        width={150}
        isDisable={detail.source === "" || detail.output != null}
      />
    </div>
  </div>
</HalfPanel>
<HalfPanel>
  <div class="right">
    <div class="main">
      <Wrap>
        <Textarea
          value={detail.output ?? ""}
          readonly
          disable={detail.output == null}
        />
      </Wrap>
    </div>
    <div class="record">
      <OperationButton
        name={"Cancel"}
        callback={cancel}
        isLineup
        width={150}
        isDisable={detail.output == null}
      />
    </div>
  </div>
</HalfPanel>

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
</style>
