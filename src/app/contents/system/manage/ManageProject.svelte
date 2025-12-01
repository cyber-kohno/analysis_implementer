<script lang="ts">
  import store from "../../../store/store";
  import OperatinButton from "../../../util/OperatinButton.svelte";

  $: transition = (idx: number) => {
    $store.focus.push(idx);
    $store.focus = $store.focus.slice();
  };

  $: toEnvs = () => transition(0);
  $: toWorks = () => transition(1);
</script>

<div class="wrap">
  <OperatinButton name={"Envs"} callback={toEnvs} />
  <OperatinButton name={"Works"} callback={toWorks} />
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(234, 245, 255);
    width: 100%;
    height: 100%;
  }
</style>
