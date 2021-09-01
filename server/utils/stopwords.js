const { response } = require("express");
const stopwords = require("./stopwordlist.json")

const symbols = [
    "&",
    "(",
    ")",
    "_",
    "{",
    "}",
    "[",
    "]",
    ",",
    ";",
    ":",
    "!",
    "?",
    ".",
    "/",
    "\\n"
];

exports.cleanResults = (response) => {
    let wordlist = [];
    response.forEach(tweet => {
        const tweetarray = tweet.full_text.split(" ");
        const stopwords_list = stopwords[tweet.lang];
        if (stopwords_list !== undefined) {
            wordlist = wordlist.concat(cleanStopWords(tweetarray, stopwords_list));
        } else {
            wordlist.concat(tweetarray);
        }
    });
    return wordlist;
}

exports.formateResponse = (response, ressource) => {
    response.forEach(tweet => {
        // check npl
    })
}

/**
 * 
 * @param {array} wordlist 
 */
const cleanStopWords = (wordlist, stopwords) => {
    // wordlist = wordlist.map(word => cleansymbol(word.toLowerCase()));
    let a = wordlist.filter(word => {
        const isStopWord = stopwords.includes(word.toLowerCase());
        return !isStopWord;
    });
    return a;
}

/**
 * TODO: clean symbol from word
 * @param {string} word 
 */
const cleansymbol = (word) => {
    return word;
}