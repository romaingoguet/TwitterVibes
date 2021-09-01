const SENTIMENT = {
    MIXED: 'mixed',
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
}

const TRESHOLD = {
    NEUTRAL: 0.1,
    MIXED: 1
}

/**
 * Rules:
 * score > 0.1 => positive
 * score < -0.1 => négative
 * -0.1 < score < 0.1 + magnitude < 1 => neutral
 * -0.1 < score < 0.1 + magnitude > 1 => mixed
 * @param {Object} sentimentData 
 * @return {String}
 */
function analyzeSentiment(score, magnitude) {
    if (score > TRESHOLD.NEUTRAL) {
        return SENTIMENT.POSITIVE;
    } else if (score < -TRESHOLD.NEUTRAL) {
        return SENTIMENT.NEGATIVE;
    } else {
        return magnitude > TRESHOLD.MIXED ? SENTIMENT.MIXED : SENTIMENT.NEUTRAL;
    }
}

/**
 * 
 * @param {Object} sentimentData
 * @return {Object} 
 */
exports.formatSentiment = (sentimentData) => {
    const score = sentimentData[0].documentSentiment.score;
    const magnitude = sentimentData[0].documentSentiment.magnitude;
    const analyzedSentiment = analyzeSentiment(score, magnitude);
    return {
        score: score,
        magnitude: magnitude,
        analyzed: analyzedSentiment
    };
}