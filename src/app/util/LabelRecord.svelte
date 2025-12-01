<script lang="ts">
    export let name;
</script>

<div>{`*${name}*`}</div>
<style>
    
  div {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 30px;
    background-color: #8888aa22;
    box-sizing: border-box;
    margin: 5px 0 0 0;
    color: #006;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    padding: 0 0 0 4px;
  }
</style>