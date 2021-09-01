const analyzeSentiment = require('./sentimentAnalysis');

/**
 * 
 * @param {Array} tweets 
 */
exports.getTweetsNplData = async (tweets) => {
    const language = require('@google-cloud/language');
    const client = new language.LanguageServiceClient();
    const response = await Promise.all(tweets.map(async (tweet) => {
        try {
            const sentiment = await getNplData(client, tweet);
            const sentimentResults = analyzeSentiment.formatSentiment(sentiment);
            return {
                'tweet': tweet,
                'sentiment': sentimentResults
            };
        } catch (ex) {
            return {
                'tweet': tweet,
                'sentiment': {error : `code:${ex.code}`, details: ex.details}
            }
        }
    }));
    return response;
}

/**
 * 
 * @param {LanguageServiceClient} client 
 * @param {Array} tweet 
 */
async function getNplData(client, tweet) {
    const document = {
        content: tweet.full_text,
        type: 'PLAIN_TEXT',
    };
    // Detects the sentiment of the text
    return await client.analyzeSentiment({ document: document });
}