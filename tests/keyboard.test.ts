// JSDOM setup
/*declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}
*/

import { JSDOM } from 'jsdom';
declare var global:any;

const { window } = new JSDOM(`<!DOCTYPE html><html><head></head><body><textarea style="display:block" id="checkItOut" name="checkItOut"></textarea><input type="text" id="basicUsageEvents" /></body></html>`);

global.document = window.document;
global.window = document.defaultView;
// Object.keys(global.document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = global.document.defaultView[property];
//   }
// });

global.navigator = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
};
import * as $ from 'jquery';
global.$ = $;
global.jQuery = $;

import { assert } from 'chai';
import {BanglaLayout} from '../src/BanglaLayout';
import { KeyboardHandler } from '../src/KeyboardHandler';

// https://stackoverflow.com/a/62912768




//const { window } = new JSDOM(`<!DOCTYPE html><html><head></head><body><textarea style="display:block" id="checkItOut" name="checkItOut"></textarea><input type="text" id="basicUsageEvents" /></body></html>`);
//global.document = window.document;

// Import jquery since windows is established now.
//const $ = require('jquery')(window);

/***** Tests start here */
describe('Installation', function () {

    it('should initiate for textarea', function (done) {
        var bnLayout = new BanglaLayout("checkItOut");
        assert.ok(bnLayout != null, "Class initiation failed");
        done();
    });

    it('should initiate for input[type=text]', function (done) {
        var withEvents:any = {};
        withEvents.beforeKeyEvent = function () { };
        withEvents.afterKeyEvent = function () { };

        var bnLayoutWithEvents = new BanglaLayout("basicUsageEvents", withEvents);
        assert.ok(bnLayoutWithEvents != null, "Class initiation failed");

        done();
    });

    it('should throw an error for missing ID', function (done) {
        assert.throws(function(){new BanglaLayout("");}, Error);
        done();
    });
});

describe('Keyboard Functionality', function () {

    // Get keycodes from: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    it('Should handle vowel and consonants', function (done) {

        var $textarea = $("#checkItOut");
        $textarea.val("");
        var pseudoKeyboard = new KeyboardHandler();

        var event = $.Event("keypress");
        event.keyCode = 65;
        event.which = 65;

        var expectedString = "", msgOnError = "", doAssert = true;

        $textarea.on('keypress', function (keyEvent:any) {
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
        pseudoKeyboard.letterInformation.currentLanguage = "en_US";
        expectedString = 'আখী.';
        msgOnError = "English letters will be ignored when pressed";
        event.keyCode = 89;
        event.which = 89;
        $textarea.trigger(event);
        

        assert.equal($textarea.val(), expectedString);
        done();
    });
});