// <summary>Select and return which key is pressed in iOS</summary>
Keyboard.prototype.select_iOS_KeyPressed = function () {
    var code = this.oEvent.keyCode || this.oEvent.which;
    var position = this.cursorPosition();
    var unicodeKey = "", iShouldDealIt = false;

    if (code >= 65 && code <= 90) {
        unicodeKey = this.global.letterKeyMap[code - 65][1];
    }
    else if (code >= 97 && code <= 122) {
        unicodeKey = this.global.letterKeyMap[code - 97][0];
    }
    else if (code >= 48 && code <= 57) {
        unicodeKey = this.global.numberKeyMap[code - 48][0];
    }

    var replaceLastChar = (unicodeKey === "" && code === 104);
    return {
        code: code,
        unicodeKey: unicodeKey,
        iShouldDealIt: unicodeKey !== "" || replaceLastChar,
        placeTo: position.start,
        replaceLastChar: replaceLastChar,
        position: position
    };
};

// <summary>Select and return which key is pressed</summary>
Keyboard.prototype.selectKeyPressed = function () {
    var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
    if (iOS)
        return this.select_iOS_KeyPressed();

    var code = this.oEvent.keyCode || this.oEvent.which;
    var codeAsCharacter = String.fromCharCode(this.oEvent.keyCode || this.oEvent.which);
    var position = this.cursorPosition();

    // delete or backspace or dot-button or plus-button key
    if (code === 8 || code === 46) {
        return {
            code: code,
            unicodeKey: "",
            iShouldDealIt: true,
            placeTo: position.start,
            position: position
        };
    }

    // using ctrl+m or F9 button to language switched
    if ((this.oEvent.ctrlKey && code === 77) || code === 120) {
        var _C = this.global.currentLanguage == "bn_BD" ? "en_US" : "bn_BD";
        this.global.currentLanguage = _C;
    }
    //  ctrl, shift, alt, alt-grp, up arrow, down arrow
    if (this.oEvent.ctrlKey || this.oEvent.altKey || code < 32 || (code >= 37 && code <= 40)) {
        return {
            code: code,
            iShouldDealIt: false
        };
    }

    var unicodeKey = "";

    if (code >= 65 && code <= 90) {
        unicodeKey = this.global.letterKeyMap[code - 65][+!!this.oEvent.shiftKey];
    }
    else if (code >= 48 && code <= 57 && this.oEvent.shiftKey === false) {
        unicodeKey = this.global.numberKeyMap[code - 48][0];
    }
        // numpad numbers except opera
    else if (!window.opera && code >= 96 && code <= 105 && this.oEvent.shiftKey === false)
        unicodeKey = this.global.numberKeyMap[code - 96][0];
        // taka symbol
    else if (code == 52 && this.oEvent.shiftKey)
        unicodeKey = "\u09f3";

        // full-stop from keyboard/numpad	
    else if ((code == 190 || code == 110) && !this.oEvent.shiftKey)
        unicodeKey = "\u0964";
        // shift with plus-sign, replace with Q[0] or hasanta
    else if ((code == 107) && this.oEvent.shiftKey)
        unicodeKey = this.global.letterKeyMap[81 - 65][0];
        // shitexplorer tweak for + button
    else if (!!document.selection && !!document.selection.createRange && code == 187 && this.oEvent.shiftKey)
        unicodeKey = this.global.letterKeyMap[81 - 65][0];
        // opera,chrome 24+, firefox16+ tweak for + button
    else if ((code == 187 || code == 61) && this.oEvent.shiftKey)
        unicodeKey = this.global.letterKeyMap[81 - 65][0];
    else return {
        code: code,
        iShouldDealIt: false
    };

    // h || full-Stop || plus-Sign
    var replaceLastChar =
            (code == 72) && !this.oEvent.shiftKey;

    return {
        code: code, // =65
        iShouldDealIt: true, // =false

        unicodeKey: unicodeKey, // ="\u0041"
        shiftKeyPressed: this.oEvent.shiftKey, // =false        
        replaceLastChar: replaceLastChar, // =false
        placeTo: position.start, // =3
        position: position, // { 1,8 }
        characterType: this.global.getFollower(unicodeKey, 1) // 1~7
    };
};