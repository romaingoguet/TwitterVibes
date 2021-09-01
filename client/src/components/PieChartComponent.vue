<script>
import { Doughnut, mixins } from "vue-chartjs";

const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data() {
    return {};
  },
  props: {
    chartData: {
      type: Array,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    let pieData = this.getData(this.chartData);
    this.renderChart(pieData.data, this.options);
  },
  methods: {
    getData(tweetsData) {
      let data = {};
      let color = [];
      for (let i = 0; i < tweetsData.length; i++) {
        const sentiment = tweetsData[i].sentiment.analyzed;
        if (sentiment !== undefined) {
          if (data[sentiment] === undefined) {
            data[sentiment] = 1;
            color.push(this.getColor(sentiment));
          } else {
            data[sentiment]++;
          }
        }
      }
      return {
        data: {
          datasets: [
            {
              data: Object.values(data),
              labels: "data",
              backgroundColor: color,
            },
          ],
          labels: Object.keys(data),
        },
      };
    },
    getColor(sentiment) {
      let color = "";
      switch (sentiment) {
        case "positive":
          color = "rgba(117, 234, 153, 0.8)";
          break;
        case "negative":
          color = "rgba(234, 117, 117, 0.8)";
          break;
        case "neutral":
          color = "rgba(140, 140, 140, 1)";
          break;
        case "mixed":
          color = "rgba(0, 0, 0, 0.37)";
          break;
      }
      return color;
    },
  },
};
</script>