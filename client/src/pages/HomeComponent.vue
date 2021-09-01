<template>
  <div class="container">
    <div class="title-wrapper">
      <h1 class="column title is-offset-3 is-half is-size-1 is-bold">
        Get the general sentiment from Twitter user or trend
      </h1>
      <div class="form-wrapper">
        <form class="vue-form" @submit.prevent="fetchData()">
          <div class="columns is-variable is-1">
            <div class="column is-offset-3 is-half">
              <input
                class="control input has-text-left is-primary"
                type="text"
                name="ressource"
                id="ressource"
                required="required"
                v-model="ressource"
                placeholder="Enter something"
              />
            </div>
            <div class="column is-narrow">
              <button type="submit" class="is-primary button">
                Collect data
              </button>
            </div>
            <div v-if="errorvisible">{{ this.error }}</div>
          </div>
        </form>
      </div>
    </div>
    <div class="column cloud">
      <cloud-component
        v-if="loaded"
        :data="wordcount"
        :font="font"
        :width="1000"
        :heigth="650"
        :padding="1"
      />
    </div>
    <div class="column is-4 container">
      <pie-chart-component
        v-if="loaded"
        :chartData="tweetsData"
        :options="chartOptions"
      />
    </div>
    <tweet-choice-component v-if="loaded" :tweets="tweetchoice" />
    <div class="columns">
      <div class="column info has-text-left">
        <h2 class="is-size-2 is-bold">How it works</h2>
        <p class="explain is-size-5">
          You enter a username (ex: @user) or a trend (ex: #trend)<br/>
          and we analyze data
        </p>
      </div>
      <div class="birds column">
        <img src="../assets/illus.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PieChartComponent from "../components/PieChartComponent";
import TweetChoiceComponent from "../components/TweetChoiceComponent";
import CloudComponent from "../components/CloudComponent";

export default {
  name: "HomeComponent",
  data() {
    return {
      loaded: false,
      loading: false,
      layout: null,
      errorvisible: false,
      error: "",
      wordcount: [],
      ressource: "",
      tweetsData: [],
      chartOptions: { legend: false },
      tweetchoice: {},
      list: [],
      font: "Impact",
    };
  },
  components: { PieChartComponent, TweetChoiceComponent, CloudComponent },
  methods: {
    async fetchData() {
      this.resetData();
      this.loading = true;
      try {
        let response = {};
        if (this.ressource.charAt(0) === "@") {
          response = await axios.get(
            `http://localhost:3131/api/v1/tweets?username=${this.ressource.substring(
              1
            )}`
          );
        } else if (this.ressource.charAt(0) === "#") {
          response = await axios.get(
            `http://localhost:3131/api/v1/trend?trend=${this.ressource.substring(
              1
            )}`
          );
        } else {
          this.errorvisible = true;
          this.error = "Must begin with @ or #";
        }
        this.loading = false;
        if (!this.errorvisible && response.status == 200) {
          this.wordcount = response.data.resp.cloud;
          this.tweetsData = response.data.resp.tweets;
          this.tweetchoice = this.getTweetChoice(this.tweetsData);
          this.loaded = true;
        }
      } catch (err) {
        if (err.response.status === 404) {
          this.errorvisible = true;
          this.error = "Ressources not found";
        }
      }
    },
    getTweetChoice(tweets) {
      let positive = {};
      let negative = {};
      for (let i = 0; i < tweets.length; i++) {
        if (
          positive.tweet === undefined ||
          tweets[i].sentiment.score > positive.sentiment.score
        ) {
          positive = tweets[i];
        }
        if (
          negative.tweet === undefined ||
          tweets[i].sentiment.score < negative.sentiment.score
        ) {
          negative = tweets[i];
        }
      }
      return {
        positive: positive,
        negative: negative,
      };
    },
    resetData() {
      this.loaded = false;
      this.loading = false;
      this.errorvisible = false;
      this.error = "";
      this.wordcount = [];
      this.tweetsData = [];
      this.tweetchoice = {};
      this.list = [];
    },
  },
};
</script>

<style scoped>
.subtitle {
  margin-bottom: 1.5rem;
}

.title-wrapper {
  padding-top: 3rem;
  padding-bottom: 4rem;
}

</style>
