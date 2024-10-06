const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  
      test("Translation with text and locale fields", function (done) {
        chai
        .request(server)
        .post("/api/translate")
        .send({text: "Mangoes are my favorite fruit.", locale: "american-to-british"})
        .end(function(err, res) {
          const translation = res.body.translation
          const expectedOutput = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
          
          assert.equal(res.status, 200)
          assert.equal(translation, expectedOutput)
          
          done()
        })
      })

      test("Translation with text and invalid locale field", function (done) {
        chai
        .request(server)
        .post("/api/translate")
        .send({text: "Mangoes are my favorite fruit.", locale: "klingon-to-simlish"})
        .end(function(err, res) {

          const expectedOutput = 'Invalid value for locale field'
          
          assert.equal(res.status, 200)
          assert.equal(res.body.error, expectedOutput)
          
          done()
        })
      })

      test("Translation with missing text field", function (done) {
        chai
        .request(server)
        .post("/api/translate")
        .send({locale: "american-to-british"})
        .end(function(err, res) {
            
          const expectedOutput = 'Required field(s) missing'
          
          assert.equal(res.status, 200)
          assert.equal(res.body.error, expectedOutput)
          
          done()
        })
      })

      test("Translation with missing locale field", function (done) {
        chai
        .request(server)
        .post("/api/translate")
        .send({text: "Mangoes are my favorite fruit."})
        .end(function(err, res) {
            
          const expectedOutput = 'Required field(s) missing'
          
          assert.equal(res.status, 200)
          assert.equal(res.body.error, expectedOutput)
          
          done()
        })
      })

      test("Translation with empty text", function (done) {
        chai
        .request(server)
        .post("/api/translate")
        .send({text: "", locale: "american-to-british"})
        .end(function(err, res) {
            
          const expectedOutput = 'No text to translate'
          
          assert.equal(res.status, 200)
          assert.equal(res.body.error, expectedOutput)
          
          done()
        })
      })

      test("Translation with text that needs no translation", function (done) {
        chai
        .request(server)
        .post("/api/translate")
        .send({text: "This text is fine and there is no need to translate it", locale: "american-to-british"})
        .end(function(err, res) {
          const translation = res.body.translation
          const expectedOutput = 'Everything looks good to me!'
          
          assert.equal(res.status, 200)
          assert.equal(translation, expectedOutput)
          
          done()
        })
      })
});