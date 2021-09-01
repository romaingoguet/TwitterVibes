const express = require('express');
const router = express.Router();
const tweetController = require ('../controllers/tweet.js')

router.get('/tweets', tweetController.getTweets);
router.get('/trend', tweetController.getTrend);

module.exports = router;