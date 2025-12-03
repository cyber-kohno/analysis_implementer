<script lang="ts">
  import store from "../../store/store";
  import StoreProject from "../../store/storeProject";
  import OperationButton from "../../util/button/OperationButton.svelte";
  import FileUtil from "../../util/data/fileUtil";

  const createProject = () => {
    $store.project = StoreProject.getInitial();
  };
  const clearProject = () => {
    if (confirm("Your working data will be deleted. Are you sure?")) {
      $store.project = null;
      $store.fileHandle = null;
      $store.focus = [];
    }
  };
  $: isOpenProject = $store.project != null;
  $: saveProject = () => {
    FileUtil.saveProject();
    console.log("save");
  };
  $: loadProject = () => {
    FileUtil.loadProject();
  };

  $: fileName = (() => {
    const handle = $store.fileHandle;
    return handle == null ? "(Untitled)" : handle.name;
  })();
</script>

<div class="wrap">
  <OperationButton
    name={"New"}
    isDisable={isOpenProject}
    callback={createProject}
    isLineup
  />
  <OperationButton
    name={"Save"}
    isDisable={!isOpenProject}
    callback={saveProject}
    isLineup
  />
  <OperationButton
    name={"Load"}
    isDisable={isOpenProject}
    callback={loadProject}
    isLineup
  />
  <OperationButton
    name={"Clear"}
    isDisable={!isOpenProject}
    callback={clearProject}
    isLineup
  />
  <div class="file" data--untitled={$store.fileHandle == null}>{fileName}</div>
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    background-color: rgb(142, 192, 235);
    width: 100%;
    height: 30px;
    padding: 0 0 0 4px;
    box-sizing: border-box;
  }
  /* .item {
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
  .item[data--disable="true"] {
    opacity: 0.4;
    pointer-events: none;
  } */
  .file {
    display: inline-block;
    position: relative;
    height: 100%;
    background-color: rgba(0, 255, 255, 0.314);
    color: black;
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    margin-left: 40px;
    padding: 0 4px;
    box-sizing: border-box;
  }
  .file[data--untitled="true"] {
    color: rgba(0, 0, 0, 0.378);
  }
</style>
