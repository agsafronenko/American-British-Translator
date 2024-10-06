'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // check the required fields
      if (req.body.text === "") return res.json({ error: 'No text to translate' })
      if (!req.body.text || !req.body.locale) return res.json({error: "Required field(s) missing"})
      if (!["american-to-british", "british-to-american"].includes(req.body.locale)) return res.json({ error: 'Invalid value for locale field' })
      
      // perform translation
      let translation = translator.translate(req.body.text, req.body.locale)
      return res.json({text: req.body.text, translation: translation})

    });
};
