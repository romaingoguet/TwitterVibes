<template>
  <div class="container">
    <div class="list is-hoverable">
      <div class="list-item" v-for="(tweet, index) in tweets" :key="index">
        <tweet-card-component :tweet="tweet" />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import TweetCardComponent from "./TweetCardComponent";

export default {
  props: {
    tweets: {
      type: Array,
      default: null,
    },
  },
  components: { TweetCardComponent },
  name: "ListComponent",
};
</script>

<style scoped>
</style>