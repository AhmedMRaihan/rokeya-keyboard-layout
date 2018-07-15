const {JSDOM} = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
global.window = dom;
global.document = dom;
const $ = require('jquery');

// assertion
chai = require('chai');
assert = chai.assert;
expect = chai.expect;

// library
var bnKeyboardSource = require("../rokeya_layout-4.4.73.js");
var Keyboard = bnKeyboardSource.Keyboard;
var banglaLayout = bnKeyboardSource.banglaLayout;

// preparation (i.e. qunit-fixture)
$("body").append('<textarea style="display:block" id="checkItOut" name="checkItOut"></textarea><input type="text" id="basicUsageEvents" />');

describe('Installation', function () {

    it('should initiate for textarea', function (done) {
        var bnLayout = new banglaLayout("checkItOut").loadHelpTooltip();
        assert.ok(bnLayout != null, "Class initiation failed");
        done();
    });

    it('should initiate for input[type=text]', function (done) {
        var withEvents = {};
        withEvents.beforeKeyEvent = function () { };
        withEvents.afterKeyEvent = function () { };

        var bnLayoutWithEvents = new banglaLayout("basicUsageEvents", withEvents);
        assert.ok(bnLayoutWithEvents != null, "Class initiation failed");

        done();
    });

    it('should throw an error for missing ID', function (done) {
        assert.throws(function(){new banglaLayout();}, Error);
        done();
    });
});

describe('Keyboard Functionality', function () {

    // Get keycodes from: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    it('Should handle vowel and consonants', function (done) {

        var $textarea = $("#checkItOut");
        $textarea.val("");
        var pseudoKeyboard = new Keyboard();

        var event = $.Event("keypress");
        event.keyCode = 65;
        event.which = 65;

        var expectedString = "", msgOnError = "", doAssert = true;

        $textarea.on('keypress', function (keyEvent) {
            var oEvent = window.event || keyEvent;
            var oSource = oEvent.srcElement || oEvent.target;
            pseudoKeyboard.handleKeyboardInput(oEvent, oSource);

            if (doAssert) {
                assert.equal($textarea.val(), expectedString, msgOnError);
            }
        });

        // Regular functionality
        expectedString = 'আ';
        msgOnError = "আ should be inserted initially";
        $textarea.trigger(event);

        expectedString = 'আক';
        msgOnError = "ক should be appended";
        event.keyCode = 75;
        event.which = 75;
        $textarea.trigger(event);

        expectedString = 'আখ';
        msgOnError = "খ should be switched via h";
        event.keyCode = 72;
        event.which = 72;
        $textarea.trigger(event);

        // Special characteristics
        event.keyCode = 73;
        event.which = 73;
        doAssert = false;
        $textarea.trigger(event);
        expectedString = "আখী";        
        msgOnError = "Vowels in car-form can be switched by typing again";
        event.keyCode = 73;
        event.which = 73;
        doAssert = true;
        $textarea.trigger(event);

        expectedString = 'আখী।';
        msgOnError = "। can be inserted";
        event.keyCode = 190;
        event.which = 190;
        $textarea.trigger(event);

        expectedString = 'আখী.';
        msgOnError = "। can be switched by pressing it again";
        event.keyCode = 190;
        event.which = 190;
        $textarea.trigger(event);

        // Language switch
        pseudoKeyboard.global.currentLanguage = "en_US";
        expectedString = 'আখী.';
        msgOnError = "English letters will be ignored when pressed";
        event.keyCode = 89;
        event.which = 89;
        $textarea.trigger(event);
        

        assert.equal($textarea.val(), expectedString);
        done();
    });
});