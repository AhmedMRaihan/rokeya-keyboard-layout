
(function ($) {
    QUnit.test("Vowel, Consonants and Switching", function (assert) {

        var $textarea = $("#checkItOut")
        ,pseudoKeyboard = new Keyboard()
        ,event = $.Event("keypress")
        ,$textarea = $("#checkItOut")
        ,expectedString = "", msgOnSuccess = "", doAssert = true;

        $textarea.val("");
        $textarea.on('keypress', function (keyEvent) {
            var oEvent = window.event || keyEvent;
            var oSource = oEvent.srcElement || oEvent.target;
            pseudoKeyboard.handleKeyboardInput(oEvent, oSource);
            
            if(doAssert)
                assert.equal($textarea.val(), expectedString, msgOnSuccess); 
        });

        // Vowel
        event.keyCode = 65;
        event.which = 65;
        expectedString = 'আ';
        msgOnSuccess = "আ can be typed";
        $textarea.trigger(event);

        // Consonant
        expectedString = 'আক';
        msgOnSuccess = "ক can be typed";
        event.keyCode = 75;
        event.which = 75;
        $textarea.trigger(event);
        
        // Consonant > h
        expectedString = 'আকঘ';
        msgOnSuccess = "Consonant(s) can be switched with 'h'";
        event.keyCode = 71;
        event.which = 71;
        doAssert = false;
        $textarea.trigger(event);
        event.keyCode = 72;
        event.which = 72;
        doAssert = true;
        $textarea.trigger(event);
    });

    QUnit.test("Basic usage", function (assert) {
        var bnLayout = new banglaLayout("basicUsage").loadHelpTooltip();
        assert.ok(bnLayout != null, "Textarea invocation is successful");

        var withEvents = {};
        withEvents.beforeKeyEvent = function () { };
        withEvents.afterKeyEvent = function () { };
        var bnLayoutWithEvents = new banglaLayout("basicUsageEvents", withEvents);
        assert.ok(bnLayoutWithEvents != null, "Input[type=text] invocation is successful");
    });
})(jQuery);