<template>
  <div class="tooltip">
    <img src="../assets/info.svg" alt="" />
    <div class="tooltiptext">
      <div>analyzed {{ sentiment.analyzed }}</div>
      <div>magnitude {{ sentiment.magnitude }}</div>
      <div>score {{ sentiment.score }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sentiment: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    console.log(this.sentiment);
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  font-size: 12px;
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>