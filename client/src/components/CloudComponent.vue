<template>
  <div class="container">
    <div class="wordCloud" ref="wordCloud"></div>
  </div>
</template>

<script>
import * as cloud from "d3-cloud";
import * as d3 from "d3";
let fill = d3.scaleOrdinal(d3.schemeCategory10);

export default {
  name: "CloudComponent",
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    fontSizeMapper: {
      type: Function,
      default: function (d) {
        return d.size;
      },
    },
    onWordClick: {
      type: Function,
      default: (word) => {
        window.alert(`You clicked ${word.text}`);
      },
    },
    rotate: {
      type: [Function, String, Number],
      default: function () {
        return (~~(Math.random() * 6) - 3) * 30;
      },
    },
    font: {
      type: [String, Function],
      default: "Serif",
    },
    width: {
      type: [Number, String],
      default: 500,
    },
    height: {
      type: [Number, String],
      default: 500,
    },
    padding: {
      type: [Number, String],
      default: 0,
    },
    spiral: {
      type: String,
      default: "archimedean",
    },
    coloring: {
      type: String,
      default: "random",
    },
    colors: {
      type: Array,
    },
  },
  mounted() {
    this.createCanvas();
  },
  methods: {
    createCanvas: function () {
      const list = this.analyzeWords(this.data);
      const max = Math.max(...Object.values(list));
      let wordSize = [];
      for (let [key, value] of Object.entries(list)) {
        wordSize.push({
          text: key,
          size: 20 + (Math.pow(value, 2) / Math.pow(max, 2)) * 50,
        });
      }
      d3.select(this.$el).selectAll("*").remove();
      const layout = cloud()
        .size([this.width, this.height])
        .words(wordSize)
        .padding(this.padding)
        //.spiral(this.spiral)
        .rotate(0)
        .font("Impact")
        .fontSize(function (d) {
          return d.size;
        })
        .on("end", this.end);
      layout.start();
    },
    end: function (words) {
      d3.select(this.$el)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", `translate(${this.width / 2},${this.height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("fill", function (d, i) {
          return fill(i);
        })
        .style("font-family", (d) => d.font)
        .style("font-size", (d) => {
          return `${d.size}px`;
        })
        .attr("text-anchor", "middle")
        .attr("transform", (d) => {
          return `translate(${[d.x, d.y]})rotate(${d.rotate})`;
        })
        .text((d) => d.text);
    },
    analyzeWords(wordlist) {
      let string = wordlist.join(" ");
      return string
        .replace(/[.]/g, "")
        .split(/\s/)
        .reduce(
          (map, word) =>
            Object.assign(map, {
              [word]: map[word] ? map[word] + 1 : 1,
            }),
          {}
        );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
