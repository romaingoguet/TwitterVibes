<template>
    <tweet :id="tweet.tweet.id_str"></tweet>
</template>

<script>
import { Tweet } from "vue-tweet-embed";

export default {
  props: {
    tweet: {
      type: Object,
      default: null,
    },
  },
  name: "TweetCardComponent",
  components: { Tweet },
};
</script>

<style scoped>
</style>