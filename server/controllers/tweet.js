const twitterservices = require('../services/twitterServices');
const nplService = require('../services/nplService');
const stopwords = require('../utils/stopwords');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getTweets = async (req, res, next) => {
    try {
        const username = req.query.username;
        const count = 5;
        const response = await twitterservices.getUserTweets(username, count);
        if (response.status === 200) {
            const tweets_data = await nplService.getTweetsNplData(response.data);
            const cloud = stopwords.cleanResults(response.data);
            let resp = {};
            resp.tweets = tweets_data;
            resp.cloud = cloud;
            res.status(200).json({ resp });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (ex) {

    }
}

exports.getTrend = async (req, res, next) => {
    try {
        const trend = req.query.trend;
        const count = 5;
        const response = await twitterservices.getTrendTweets(trend, count);
        if (response.status === 200) {
            const tweets_data = await nplService.getTweetsNplData(response.data);
            const cloud = stopwords.cleanResults(response.data);
            let resp = {};
            resp.tweets = tweets_data;
            resp.cloud = cloud;
            res.status(200).json({ resp });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (ex) {

    }
}