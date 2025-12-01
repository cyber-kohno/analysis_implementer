<script lang="ts">
  import store from "../../../store/store";
  import type StoreWork from "../../../store/work/storeWork";

  export let work: StoreWork.Props;
  export let index: number;

  $: transition = () => {
    $store.focus.push(index);
    $store.focus = $store.focus.slice();
  };
</script>

<button class="record" onclick={transition}>
  <div class="type">{work.type}</div>
  <div class="name">{work.name}</div>
</button>

<style>
  .record {
    display: inline-block;
    position: relative;
    width: calc(100% - 4px);
    text-align: left;
    padding: 0;
    font-size: 0;
    height: 30px;
    margin: 2px 0 0 2px;
    background-color: rgb(204, 205, 183);
    border: 1px solid #00000059;

    * {
      display: inline-block;
      position: relative;
      height: 100%;
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      padding-left: 4px;
      box-sizing: border-box;
    }

    &:hover {
      background-color: rgb(244, 174, 174);
    }
  }
  .type {
    width: 150px;
    color: green;
    background-color: rgba(238, 250, 14, 0.2);
  }
  .name {
    width: calc(100% - 150px);
    color: black;
    background-color: rgba(38, 250, 14, 0.2);
  }
</style>
