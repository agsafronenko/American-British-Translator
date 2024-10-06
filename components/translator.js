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

class Translator {

    setLocaleConfig(locale) {
      if (locale === "american-to-british") {
        this.dicts = [americanOnly, americanToBritishSpelling]
        this.timeSeparator = ":"
        this.titlePeriod = "."
      } else {
        this.dicts = [britishOnly, britishToAmericanSpelling]
        this.timeSeparator = "."
        this.titlePeriod = ""
      }
    }

    translate(text, locale) {
      this.setLocaleConfig(locale)
      let translatedText = this.translateTime(text)
      translatedText = this.translateTitles(translatedText)
      translatedText = this.translateWords(translatedText)

      return translatedText === text ? "Everything looks good to me!" : translatedText
    }

    translateTime(text) {
      const timeRegExp = new RegExp(`\\d{1,2}${this.timeSeparator}\\d{2}`, 'g')
      let time = text.match(timeRegExp)

      if (!time) return text

      return text.replace(timeRegExp, (match) => {
        const translatedTime = match.replace(this.timeSeparator, this.timeSeparator === '.' ? ":" : ".")
        return this.highlight(translatedTime)
      });
    }

    translateTitles(text) {
      const titleRegex = new RegExp(`(?<![a-zA-Z])(${Object.values(americanToBritishTitles).map(t => t + this.titlePeriod).join("|")})`, "gi")

      return text.replace(titleRegex, (match) => this.titlePeriod ? this.highlight(match.replace(".", "")) : this.highlight(match + "."))
    }

    translateWords(text) {
      const isCapitalized = this.capitalize(text)[0] === text[0]
      let textDecapitalized = isCapitalized ? this.decapitalize(text) : text

      for (let dict of this.dicts) {
        const regex = new RegExp(`\\b(${Object.keys(dict).join('|')})\\b`, 'gi');
        textDecapitalized = textDecapitalized.replace(regex, (match) => {
          const replacement = dict[match.toLowerCase()]; 
          return this.highlight(replacement);
        });
      }

      return isCapitalized ? this.capitalize(textDecapitalized) : textDecapitalized
    }

    decapitalize(text) {
      return text[0].toLowerCase() + text.slice(1);
    }

    capitalize(text) {
      return text[0].toUpperCase() + text.slice(1);
    }

    highlight(translatedPart) {
      return `<span class="highlight">${translatedPart}</span>`
    }
}

module.exports = Translator;