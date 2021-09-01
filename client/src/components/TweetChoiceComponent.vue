<template>
  <div class="container columns">
    <div class="column">
      <p class="has-text-left">Most positive <tooltip-component :sentiment="tweets.positive.sentiment"/></p>
      <tweet-card-component :tweet="tweets.positive" />
    </div>
    <div class="column">
      <p class="has-text-left">Most negative <tooltip-component :sentiment="tweets.negative.sentiment"/></p>
      <tweet-card-component :tweet="tweets.negative" />
    </div>
  </div>
</template>

<script>
import TweetCardComponent from "./TweetCardComponent";
import TooltipComponent from "../components/TooltipComponent"

export default {
  props: {
    tweets: {
      type: Object,
      default: null,
    },
  },
  components: { TweetCardComponent, TooltipComponent },
};
</script>
    TooltipComponent