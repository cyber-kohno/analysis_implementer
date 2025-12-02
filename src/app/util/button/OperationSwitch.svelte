<script lang="ts">
  export let isDisable: boolean = false;
  export let name: string;
  export let callback: () => void = () => {};
  export let isLineup = false;
  export let width = 0;
  export let isActive = false;
</script>

<button
  data--active={isActive}
  data--disable={isDisable}
  data--lineup={isLineup}
  onclick={callback}
  style:width={width === 0 ? "none" : `${width}px`}>{name}</button
>

<style>
  button {
    display: block;
    position: relative;
    background-color: rgb(218, 241, 212);
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

    /* &:hover {
      background-color: rgb(218, 241, 212);
    } */
  }
  button[data--active="true"] {
    background-color: rgb(247, 237, 104);
  }
  button[data--disable="true"] {
    opacity: 0.4;
    pointer-events: none;
  }
  button[data--lineup="true"] {
    display: inline-block;
    margin: 3px 4px 0 0;
  }
</style>
