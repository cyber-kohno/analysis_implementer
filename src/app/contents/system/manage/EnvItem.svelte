<script lang="ts">
  import type { KeyValue } from "../../../store/types";

  export let envKeyValue: KeyValue;
  export let isFocus: boolean;
  export let select: () => void;
</script>

<button class="record" onclick={select} data--focus={isFocus}>
  <div class="key">{envKeyValue.key}</div>
  <div class="value">{envKeyValue.value}</div>
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
      vertical-align: top;
    }

    &:hover {
      opacity: 0.8;
    }
  }
  .record[data--focus="true"] {
    background-color: rgb(216, 220, 143);
  }
  .key {
    width: 150px;
    color: rgb(0, 77, 148);
    background-color: rgba(250, 104, 14, 0.2);
  }
  .value {
    width: calc(100% - 150px);
    color: black;
    background-color: rgba(14, 250, 234, 0.2);
  }
</style>
