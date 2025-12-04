<script lang="ts">
  export let height = 30;
  export let align: "left" | "center" | "right" = 'left';
</script>

<div style:height={`${height}px`} style:text-align={align}><slot /></div>

<style>
  div {
    display: inline-block;
    position: relative;
    width: 100%;
    background-color: #8888aa22;
    box-sizing: border-box;
  }
</style>
