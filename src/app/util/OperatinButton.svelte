<script lang="ts">
  export let isDisable: boolean = false;
  export let name: string;
  export let callback: () => void = () => {};
</script>

<button class="item" data--disable={isDisable} onclick={callback}>{name}</button
>

<style>
  .item {
    display: block;
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
  }
</style>
