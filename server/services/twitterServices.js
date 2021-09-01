const axios = require("axios");
require('dotenv').config();

const TWITTER_API_USER_BASE_URL = "https://api.twitter.com/1.1/statuses/user_timeline.json";
const TWITTER_API_TREND_BASE_URL = "https://api.twitter.com/1.1/search/tweets.json";

/**
 * 
 * @param {String} user 
 * @param {Int} count 
 */
exports.getUserTweets = async (user, count) => {
    const token = process.env.TWITTER_TOKEN;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    count = count > 20 ? 20 : count;
    let response = {};
    try {
        const apiresponse = await axios.get(twitterUserRequestUrl(user, count), config);
        response.status = apiresponse.status;
        response.data = apiresponse.data;
    } catch (ex) {
        response.status = 404;
        response.message = 'Unable to get data';
    }
    return response;
}

/**
 * 
 * @param {String} trend 
 * @param {Int} count 
 */
exports.getTrendTweets = async (trend, count) => {
    const token = process.env.TWITTER_TOKEN;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    count = count > 20 ? 20 : count;
    let response = {};
    try {
        const apiresponse = await axios.get(twitterTrendRequestUrl(trend, count), config);
        response.status = apiresponse.status;
        response.data = apiresponse.data.statuses;
    } catch (ex) {
        response.status = 404;
        response.message = "Unable to get data";
    }
    return response;
}

/**
 * we can add "&include_rts=false" to exclude retweets but they still count toward the slice selected by the count parameter
 * @param {String} user 
 * @param {Int} count 
 */
const twitterUserRequestUrl = (user, count) => {
    return `${TWITTER_API_USER_BASE_URL}?tweet_mode=extended&screen_name=${user}&count=${count}`;
}

/**
 * @param {String} trend 
 * @param {Int} count 
 */
const twitterTrendRequestUrl = (trend, count) => {
    return `${TWITTER_API_TREND_BASE_URL}?q=%23${trend}&result_type=mixed&lang=en&count=${count}&tweet_mode=extended`;
}