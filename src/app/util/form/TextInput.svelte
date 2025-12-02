<script lang="ts">
  export let isRequied = false;
  export let readonly = false;
  export let width: string = "100px";
  export let value: string;
  export let set: (value: string) => void = () => {};
</script>

<input
  type="text"
  style:width
  {value}
  oninput={(e) => {
    set(e.currentTarget.value);
  }}
  {readonly}
  data--readonly={readonly}
  data--blank={isRequied && value === ""}
/>

<style>
  input {
    display: inline-block;
    position: relative;
    margin: 5px 0 0 2px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #888;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 14px;
  }
  input[data--blank="true"] {
    background-color: #ff0;
  }
  input[data--readonly="true"] {
    color: rgb(0, 0, 184);
    background-color: #d2d2d2;
  }
</style>
