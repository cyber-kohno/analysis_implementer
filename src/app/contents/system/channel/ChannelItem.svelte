<script lang="ts">
  import store from "../../../store/store";

  export let isActive: boolean;
  export let name: string;
  export let depth: number;

  $: link = () => {
    $store.focus = $store.focus.slice(0, depth);
  };
</script>

<button class="item" data--active={isActive} onclick={link}
  >{`[${name}]`}</button
>

<style>
  .item {
    display: inline-block;
    position: relative;
    background-color: rgba(254, 255, 254, 0.158);
    height: 24px;
    margin: 3px 0 0 4px;
    padding: 0 8px;
    box-sizing: border-box;
    color: rgba(0, 190, 253, 0.441);
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    border: none;
    border-radius: 2px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.289);
    }
  }
  .item[data--active="true"] {
    color: rgb(0, 190, 253);
  }
</style>
