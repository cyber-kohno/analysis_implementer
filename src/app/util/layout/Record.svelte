<script lang="ts">
  export let height = 30;
</script>

<div style:height={`${height}px`}><slot /></div>

<style>
  div {
    display: inline-block;
    position: relative;
    width: 100%;
    background-color: #8888aa22;
    box-sizing: border-box;
    text-align: left;
  }
</style>
