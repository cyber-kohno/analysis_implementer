<script lang="ts">
  import { writable } from "svelte/store";
  import store from "../../../store/store";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import Wrap from "../../../util/layout/Wrap.svelte";
  import OperationButton from "../../../util/button/OperationButton.svelte";
  import LabelRecord from "../../../util/LabelRecord.svelte";
  import TextInput from "../../../util/form/TextInput.svelte";
  import StoreWork from "../../../store/work/storeWork";
  import type StoreExecute from "../../../store/work/StoreSingleProc";
  import StoreResource from "../../../store/work/StoreResource";
  import ResourceItem from "./ResourceItem.svelte";
  import OperationSwitch from "../../../util/button/OperationSwitch.svelte";
  import Textarea from "../../../util/form/Textarea.svelte";
  import Record from "../../../util/layout/Record.svelte";

  const focusIndex = writable<number>(-1);
  const varName = writable<string>("");
  const retention = writable<StoreResource.RetentionMethod>("static");
  const filePath = writable<string>("");
  const source = writable<string>("");
  const convert = writable<StoreResource.ParseMethod | undefined>(undefined);

  $: detail = StoreWork.getDetail($store) as StoreExecute.Props;

  $: add = () => {
    const getKey = () => {
      let keySeq = detail.resouces.length;
      while (true) {
        let key = `resource_${keySeq}`;
        if (detail.resouces.map((r) => r.varName).includes(key)) {
          keySeq++;
          continue;
        }
        return key;
      }
    };
    detail.resouces.push(StoreResource.getInitial(getKey()));
    detail.resouces = detail.resouces.slice();
  };

  $: select = (i: number) => {
    if ($focusIndex === i) $focusIndex = -1;
    else {
      $focusIndex = i;
      const resource = detail.resouces[$focusIndex];
      $varName = resource.varName;
      $retention = resource.retention;
      $convert = resource.parse;
      $filePath = resource.filePath ?? "";
      $source = resource.source ?? "";
    }
  };
  $: toggleCsvConvert = () => {
    if ($convert === "csv") {
      $convert = undefined;
    } else {
      $convert = "csv";
    }
  };
  $: toggleTsvConvert = () => {
    if ($convert === "tsv") {
      $convert = undefined;
    } else {
      $convert = "tsv";
    }
  };

  $: cancel = () => {
    $focusIndex = -1;
  };
  $: update = () => {
    detail.resouces[$focusIndex] = {
      varName: $varName,
      retention: $retention,
      filePath: $retention === "static" ? undefined : $filePath,
      source: $retention === "dynamic" ? undefined : $source,
      parse: $convert,
    };
    detail.resouces = detail.resouces.slice();
    $focusIndex = -1;
  };
  $: del = () => {
    if ($focusIndex === -1) throw new Error();
    detail.resouces.splice($focusIndex, 1);
    detail.resouces = detail.resouces.slice();
    $focusIndex = -1;
  };
</script>

<div class="wrap">
  <HalfPanel>
    <Wrap>
      <Record>
        <OperationButton name="Add" callback={add} width={100} />
      </Record>
      <div class="main">
        {#each detail.resouces as res, i}
          <ResourceItem
            resource={res}
            select={() => select(i)}
            isFocus={$focusIndex === i}
          />
        {/each}
      </div>
    </Wrap>
  </HalfPanel>
  <HalfPanel>
    <Wrap>
      {#if $focusIndex !== -1}
        <div class="main">
          <LabelRecord name={"variable_name"} />
          <TextInput
            value={$varName}
            set={(v) => ($varName = v)}
            width={"calc(100% - 4px)"}
            isRequied
          />
          <LabelRecord name={"retention_method"} />
          <Record>
            <OperationSwitch
              name="Static"
              callback={() => ($retention = "static")}
              isLineup
              isActive={$retention === "static"}
            />
            <OperationSwitch
              name="Dinamic"
              callback={() => ($retention = "dynamic")}
              isLineup
              isActive={$retention === "dynamic"}
            />
          </Record>
          {#if $retention === "static"}
            <LabelRecord name={"source"} />
            <Record height={150}>
              <Wrap>
                <Textarea value={$source ?? ""} set={(v) => ($source = v)} />
              </Wrap>
            </Record>
          {:else if $retention === "dynamic"}
            <LabelRecord name={"file_path"} />
            <TextInput
              value={$filePath}
              set={(v) => ($filePath = v)}
              width={"calc(100% - 4px)"}
              isRequied
            />
          {/if}
          <LabelRecord name={"parse_method"} />
          <Record>
            <OperationSwitch
              name="CSV to JSON"
              callback={toggleCsvConvert}
              isLineup
              isActive={$convert === "csv"}
            />
            <OperationSwitch
              name="TSV to JSON"
              callback={toggleTsvConvert}
              isLineup
              isActive={$convert === "tsv"}
            />
          </Record>
        </div>
        <Record align='right'>
          <OperationButton
            name="Delete"
            callback={del}
            isDisable={$focusIndex === -1}
            isLineup
            width={120}
          />
          <OperationButton
            name="Cancel"
            callback={cancel}
            isLineup
            width={120}
          />
          <OperationButton
            name="Update"
            callback={update}
            isLineup
            width={120}
          />
        </Record>
      {/if}
    </Wrap>
  </HalfPanel>
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(234, 245, 255);
    width: 100%;
    height: 100%;
  }
  .main {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    background-color: #95a6a6;
    box-sizing: border-box;
    text-align: left;
  }
</style>
