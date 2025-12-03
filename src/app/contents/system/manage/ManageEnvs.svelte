<script lang="ts">
  import { writable } from "svelte/store";
  import store from "../../../store/store";
  import HalfPanel from "../../../util/HalfPanel.svelte";
  import Wrap from "../../../util/layout/Wrap.svelte";
  import OperationButton from "../../../util/button/OperationButton.svelte";
  import EnvItem from "./EnvItem.svelte";
  import LabelRecord from "../../../util/LabelRecord.svelte";
  import TextInput from "../../../util/form/TextInput.svelte";

  const focusIndex = writable<number>(-1);
  const key = writable<string>("");
  const value = writable<string>("");

  $: project = (() => {
    const project = $store.project;
    if (project == null) throw new Error();
    return project;
  })();
  $: add = () => {
    const getKey = () => {
      let keySeq = project.envVars.length;
      while (true) {
        let key = `env_${keySeq}`;
        if (project.envVars.map((e) => e.key).includes(key)) {
          keySeq++;
          continue;
        }
        return key;
      }
    };
    project.envVars.push({ key: getKey(), value: "" });
    project.envVars = project.envVars.slice();
  };

  // $: curEnv = (() => {
  //   const env = project.envVars[$focusIndex];
  //   return env ?? null;
  // })();

  $: select = (i: number) => {
    if ($focusIndex === i) $focusIndex = -1;
    else {
      $focusIndex = i;
      const env = project.envVars[$focusIndex];
      $key = env.key;
      $value = env.value;
    }
  };

  $: update = () => {
    project.envVars[$focusIndex] = { key: $key, value: $value };
    project.envVars = project.envVars.slice();
    $focusIndex = -1;
  };
  $: cancel = () => {
    $focusIndex = -1;
  };
  $: del = () => {
    if ($focusIndex === -1) throw new Error();
    project.envVars.splice($focusIndex, 1);
    project.envVars = project.envVars.slice();
    $focusIndex = -1;
  };
</script>

<div class="wrap">
  <HalfPanel>
    <Wrap>
      <div class="record">
        <OperationButton name="Add" callback={add} isLineup width={100} />
      </div>
      <div class="main">
        {#each project.envVars as env, i}
          <EnvItem
            envKeyValue={env}
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
          <LabelRecord name={"enviroment_key"} />
          <TextInput
            value={$key}
            set={(v) => ($key = v)}
            width={"calc(100% - 4px)"}
            isRequied
          />
          <LabelRecord name={"enviroment_value"} />
          <TextInput
            value={$value}
            set={(v) => ($value = v)}
            width={"calc(100% - 4px)"}
          />
        </div>
        <div class="record">
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
        </div>
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
