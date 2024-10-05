const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require("./british-only.js")

function invertDictionary(dict) {
  let invertedDict = {}
  Object.entries(dict).forEach(([key, value]) => {
    invertedDict[value] = key;
  })
  return invertedDict
}

const britishToAmericanSpelling = invertDictionary(americanToBritishSpelling)
const britishToAmericanTitles = invertDictionary(americanToBritishTitles)

class Translator {
    constructor() {
        this.americanToBritish = [americanOnly, americanToBritishSpelling, americanToBritishTitles]
        this.britishToAmerican = [britishOnly, britishToAmericanSpelling, britishToAmericanTitles]
    }

    translate(text, locale) {
        let dicts = locale === "american-to-british" ? this.americanToBritish : this.britishToAmerican
        let tokensArr = text.match(/mrs\.*|ms\.*|mx\.*|dr\.*|prof\.*|\d{1,2}[:\.]\d{2}|[\w']+|[.,!?;:]/gi);
        let tokensArrTranslated = tokensArr.map(token => {
          if (/\d{1,2}[:.]\d{2}/.test(token)) {
            return this.timeTranslation(token, locale)
          } else {
            return this.wordTranslation(token, dicts)
          }
    })
        let tokensString = this.makeString(tokensArrTranslated)
        return text === tokensString ? "Everything looks good to me!" : tokensString
    }


    timeTranslation(time, locale) {
      const isAmericanToBritish = locale === "american-to-british" && /:/.test(time);
      const isBritishToAmerican = locale === "british-to-american" && /\./.test(time);
      
      if (isAmericanToBritish || isBritishToAmerican) {
        const translatedTime = isAmericanToBritish ? time.replace(":", ".") : time.replace(".", ":");
        return `<span class="highlight">${translatedTime}</span>`;
      }
      
      return time;
    }

    wordTranslation(word, dicts) {
      const isCapitalized = this.capitalize(word[0]) === word[0]
      const selectedWord = isCapitalized ? word.toLowerCase() : word
      for (let dict of dicts) {
        if (dict.hasOwnProperty(selectedWord)) {
          let translatedWord = dict[selectedWord]
          return `<span class="highlight">${isCapitalized ? this.capitalize(translatedWord) : translatedWord}</span>`
        }
      }
        return word
    }

    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    }

    makeString(arr) {
      return arr.reduce((acc, word, index) => acc + (/[.,!?;:]$/g.test(word) ? word : (index > 0 ? " " : "") + word), "");

}
}

module.exports = Translator;