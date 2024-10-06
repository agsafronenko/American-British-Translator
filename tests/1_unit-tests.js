const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator()

suite('Unit Tests', () => {

    test("Translates 'favorite' to 'favourite'", () => {
        const textToTranslate = "Mangoes are my favorite fruit."
        const locale = "american-to-british"

        const translation = translator.translate(textToTranslate, locale)
        const expectedOutput = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
       
        assert.equal(translation, expectedOutput)
    });

    test("Translates 'yogurt' to 'yoghurt'", () => {
        const textToTranslate = "I ate yogurt for breakfast.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'I ate <span class="highlight">yoghurt</span> for breakfast.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'condo' to 'flat'", () => {
        const textToTranslate = "We had a party at my friend's condo.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'We had a party at my friend\'s <span class="highlight">flat</span>.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'trashcan' to 'bin'", () => {
        const textToTranslate = "Can you toss this in the trashcan for me?";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'Can you toss this in the <span class="highlight">bin</span> for me?';

        assert.equal(translation, expectedOutput);
    });

    test("No need for translation", () => {
        const textToTranslate = "The parking lot was full.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'The <span class="highlight">car park</span> was full.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'Rube Goldberg machine' to 'Heath Robinson device'", () => {
        const textToTranslate = "Like a high tech Rube Goldberg machine.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'play hooky' to 'bunk off'", () => {
        const textToTranslate = "To play hooky means to skip class or work.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'To <span class="highlight">bunk off</span> means to skip class or work.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'Mr.' to 'Mr'", () => {
        const textToTranslate = "No Mr. Bond, I expect you to die.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'Dr.' to 'Dr'", () => {
        const textToTranslate = "Dr. Grosh will see you now.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = '<span class="highlight">Dr</span> Grosh will see you now.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates '12:15' to '12.15'", () => {
        const textToTranslate = "Lunch is at 12:15 today.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'Lunch is at <span class="highlight">12.15</span> today.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'footie' to 'soccer'", () => {
        const textToTranslate = "We watched the footie match for a while.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'We watched the <span class="highlight">soccer</span> match for a while.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'paracetamol' to 'Tylenol'", () => {
        const textToTranslate = "Paracetamol takes up to an hour to work.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = '<span class="highlight">Tylenol</span> takes up to an hour to work.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'caramelise' to 'caramelize'", () => {
        const textToTranslate = "First, caramelise the onions.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'First, <span class="highlight">caramelize</span> the onions.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'bank holiday' to 'public holiday' and 'funfair' to 'carnival'", () => {
        const textToTranslate = "I spent the bank holiday at the funfair.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'bicky' to 'cookie' and 'chippy' to 'fish-and-chip shop'", () => {
        const textToTranslate = "I had a bicky then went to the chippy.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'bits and bobs' to 'odds and ends' and 'bum bag' to 'fanny pack'", () => {
        const textToTranslate = "I've just got bits and bobs in my bum bag.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'car boot sale' to 'swap meet'", () => {
        const textToTranslate = "The car boot sale at Boxted Airfield was called off.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'Mrs' to 'Mrs.'", () => {
        const textToTranslate = "Have you met Mrs Kalyani?";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';

        assert.equal(translation, expectedOutput);
    });

    test("Translates 'Prof' to 'Prof.'", () => {
        const textToTranslate = "Prof Joyner of King's College, London.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';

        assert.equal(translation, expectedOutput);
    });

    test("Translates '4.30' to '4:30'", () => {
        const textToTranslate = "Tea time is usually around 4 or 4.30.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';

        assert.equal(translation, expectedOutput);
    });

    test("Highlights 'favorite' to 'favourite'", () => {
        const textToTranslate = "Mangoes are my favorite fruit.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'Mangoes are my <span class="highlight">favourite</span> fruit.';

        assert.equal(translation, expectedOutput);
    });

    test("Highlights 'yogurt' to 'yoghurt'", () => {
        const textToTranslate = "I ate yogurt for breakfast.";
        const locale = "american-to-british";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'I ate <span class="highlight">yoghurt</span> for breakfast.';

        assert.equal(translation, expectedOutput);
    });

    test("Highlights 'footie' to 'soccer'", () => {
        const textToTranslate = "We watched the footie match for a while.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = 'We watched the <span class="highlight">soccer</span> match for a while.';

        assert.equal(translation, expectedOutput);
    });

    test("Highlights 'paracetamol' to 'Tylenol'", () => {
        const textToTranslate = "Paracetamol takes up to an hour to work.";
        const locale = "british-to-american";

        const translation = translator.translate(textToTranslate, locale);
        const expectedOutput = '<span class="highlight">Tylenol</span> takes up to an hour to work.';

        assert.equal(translation, expectedOutput);
    });
});