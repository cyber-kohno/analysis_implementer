<script lang="ts">
  export let value: string;
  export let set: (v: string) => void = () => {};
  export let readonly: boolean = false;
  export let disable: boolean = false;
</script>

<textarea
  {value}
  oninput={(e) => set(e.currentTarget.value)}
  {readonly}
  data--readonly={readonly}
  data--disable={disable}
></textarea>

<style>
  textarea {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    resize: none;
    outline: none;
    box-sizing: border-box;
    border: none;
    font-size: 18px;
    color: #000000;
  }
  textarea[data--readonly="true"] {
    color: #001d86;
    background-color: rgb(213, 230, 233);
  }
  textarea[data--disable="true"] {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
