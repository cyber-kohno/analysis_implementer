<script lang="ts">
  export let height = 30;
  export let rate: number | null = null;
  export let surplus: number | null = null;
  export let align: "left" | "center" | "right" = "left";

  $: heightValue = (() => {
    let heightValue =
      surplus == null ? `${height}px` : `calc(100% - ${surplus}px)`;
    if (rate != null) heightValue = `${rate}%`;
    return heightValue;
  })();
</script>

<div style:height={heightValue} style:text-align={align}><slot /></div>

<style>
  div {
    display: inline-block;
    position: relative;
    width: 100%;
    background-color: #8888aa22;
    box-sizing: border-box;
  }
</style>
