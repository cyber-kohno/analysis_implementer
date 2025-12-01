<script lang="ts">
  import store from "../../store/store";
  import StoreProject from "../../store/storeProject";

  const createProject = () => {
    $store.project = StoreProject.getInitial();
  };
  const clearProject = () => {
    $store.project = null;
    $store.focus = [];
  };
  $: isOpenProject = $store.project != null;
</script>

<div class="wrap">
  <button class="item" data--disable={isOpenProject} onclick={createProject}>New</button>
  <button class="item" data--disable={!isOpenProject}>Save</button>
  <button class="item" data--disable={isOpenProject}>Load</button>
  <button class="item" data--disable={!isOpenProject} onclick={clearProject}>Clear</button>
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(142, 192, 235);
    width: 100%;
    height: 30px;
  }
  .item {
    display: inline-block;
    position: relative;
    background-color: rgb(205, 232, 255);
    height: 24px;
    margin: 3px 0 0 4px;
    padding: 0 12px;
    box-sizing: border-box;
    color: rgb(27, 90, 162);
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    border: 1px solid #001e48;
    border-radius: 2px;

    &:hover {
      background-color: rgb(224, 241, 255);
    }
  }
  .item[data--disable=true] {
    opacity: 0.4;
    pointer-events: none;
  }
</style>
