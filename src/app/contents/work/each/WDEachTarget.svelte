<script lang="ts">
  import { writable } from "svelte/store";
  import store from "../../../store/store";
  import StoreEachTarget from "../../../store/work/StoreEachTarget";
  import StoreWork from "../../../store/work/storeWork";
  import OperationButton from "../../../util/button/OperationButton.svelte";
  import OperationSwitch from "../../../util/button/OperationSwitch.svelte";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import LabelRecord from "../../../util/LabelRecord.svelte";
  import Record from "../../../util/layout/Record.svelte";
  import Wrap from "../../../util/layout/Wrap.svelte";
  import Textarea from "../../../util/form/Textarea.svelte";
  import TextInput from "../../../util/form/TextInput.svelte";
  import { onMount } from "svelte";
  import type StoreEachProc from "../../../store/work/StoreEachProc";

  $: detail = (StoreWork.getDetail($store) as StoreEachProc.Props).eachTarget;

  let target = writable<StoreEachTarget.TargetMethod>("files");
  let files = writable<string>("");
  let directory = writable<string>("");

  const reset = () => {
    $target = detail.target;
    switch (detail.target) {
      case "directory":
        {
          if (detail.directory == undefined) throw new Error();
          $directory = detail.directory;
        }
        break;
      case "files":
        {
          if (detail.files == undefined) throw new Error();
          $files = detail.files.join("\n");
        }
        break;
    }
  };
  onMount(reset);
  const update = () => {
    detail.target = $target;
    switch ($target) {
      case "directory":
        {
          detail.directory = $directory;
        }
        break;
      case "files":
        {
          detail.files = $files.split("\n");
        }
        break;
    }
  };
</script>

<HalfPanel>
  <Wrap>
    <div class="main">
      <LabelRecord name={"retention_method"} />
      <Record>
        <OperationSwitch
          name="Files"
          callback={() => ($target = "files")}
          isActive={$target === "files"}
        />
        <OperationSwitch
          name="Directory"
          callback={() => ($target = "directory")}
          isActive={$target === "directory"}
        />
      </Record>
      {#if $target === "directory"}
        <LabelRecord name={"target_directory_path"} />
        <TextInput
          value={$directory}
          set={(v) => ($directory = v)}
          width={"calc(100% - 4px)"}
          isRequied
        />
      {:else if $target === "files"}
        <LabelRecord name={"target_files"} />
        <div class="files">
          <Wrap>
            <Textarea value={$files} set={(v) => ($files = v)} />
          </Wrap>
        </div>
      {/if}
    </div>
    <Record align="right">
      <OperationButton name="Reset" callback={reset} isLineup width={120} />
      <OperationButton name="Update" callback={update} isLineup width={120} />
    </Record>
  </Wrap>
</HalfPanel>
<HalfPanel></HalfPanel>

<style>
  .main {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    background-color: #95a6a6;
    box-sizing: border-box;
    text-align: left;
  }
  .files {
    display: inline-block;
    position: relative;
    width: 100%;
    background-color: #8888aa22;
    box-sizing: border-box;
    height: calc(100% - 100px);
  }
</style>
