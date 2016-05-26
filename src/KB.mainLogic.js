function Keyboard() {
    this.global = new Letter_Information();
}

Keyboard.prototype.handleKeyboardInput = function (oEvent, oSource) {
    this.textInputSource = oSource;
    this.oEvent = oEvent;

    var prev = "", prevPrev = "", nextNext = "", text = !!oSource ? this.textInputSource.value : this.text, prevCharacterType = 0;

    var keyState = this.selectKeyPressed();

    // <summary>Decision; Should script continue or not</summary>
    if (keyState.iShouldDealIt === false) 
		return true;

    if (this.global.currentLanguage === "en_US") {
        return true;
    }

    // set previous and next characters
    if (keyState.placeTo >= 2) {
        prevPrev = text.charAt(keyState.placeTo - 2);
        prev = text.charAt(keyState.placeTo - 1);
        prevCharacterType = this.global.getFollower(prev, 1);
    }
    else if (keyState.placeTo === 1) {
        prev = text.charAt(keyState.placeTo - 1);
        prevCharacterType = this.global.getFollower(prev, 1);
    }
	
    /*if (keyState.placeTo >= 0 && keyState.placeTo <= text - 2) {
        nextNext = text.charAt(keyState.placeTo + 1);
        next = text.charAt(keyState.placeTo + 0);
    }
    else if (keyState.placeTo >= 0 && keyState.placeTo <= text.length - 1)
        next = text.charAt(keyState.placeTo + 0);*/


    /************************************** 
    unicodeKey change if necessary
    ***************************************/
    // consonant+h type input or hasanta pressed twice
    keyState.replaceLastChar = keyState.replaceLastChar || (prev === "\u09CD" && keyState.unicodeKey === "\u09CD");

    if (keyState.replaceLastChar) {
        // if hasanta then +
        if (prev === "\u09CD" && keyState.unicodeKey === "\u09CD") {
            keyState.unicodeKey = "\u002B";
        }
        // if hasanta and h then force end at hasanta
        else if (prev === "\u09CD" && keyState.unicodeKey === "") {
            keyState.unicodeKey = "\u09CD" + this.global.ZWNJ;
        }
        // other
        else if (prevCharacterType === 2)
            keyState.unicodeKey = this.global.getFollower(prev, 2);
        else if (prevCharacterType === 7)
            keyState.unicodeKey = this.global.ZWNJ + this.global.getFollower(prev, 2);
        else
            keyState.unicodeKey = this.global.getFollower(prev, 2);

        // if valid key reduce start position-1 because this will not be inserted
        if (keyState.unicodeKey.length > 0) {
            keyState.placeTo -= 1;
            keyState.position.start -= 1;
        }
    }

    // rab => r za-fola
    if (keyState.unicodeKey === "\u09cd\u09af" && prev === "\u09b0") {
        // grand hotel spelling
        if (keyState.position.start > 0 && this.global.getFollower(prevPrev, 1) === 4)
            keyState.unicodeKey = "\u09cd" + "\u09af";
        else {
            keyState.position.start -= 1;
            keyState.unicodeKey = "\u09b0" + this.global.ZWNJ + "\u09cd" + "\u09af";
        }
    }

    // same vowel pressed twice will cause a switch
    if (prev === keyState.unicodeKey && (prevCharacterType === 2 || prevCharacterType === 7)) {
        var temp = this.global.getSwitchedLetter(keyState.unicodeKey);
        // for "onamika" => no switch character because switching a character with same character insert nothing
        if (temp.length > 0) {
            keyState.position.start -= 1;
            keyState.unicodeKey = temp;
        }
        else
            keyState.unicodeKey = this.global.getFollower(keyState.unicodeKey, 2);
    }
        // change vowel in full-form to kar-form if prevCharacterType is not consonant/fola
    else if (keyState.characterType === 2 && !(prevCharacterType === 1 || prevCharacterType === 3)) {
        keyState.unicodeKey = this.global.getFollower(keyState.unicodeKey, 2);
    }

    // fullstop button pressed twice will cause a dot ..
    if (prev === "\u0964" && keyState.unicodeKey === "\u0964") {
        keyState.unicodeKey = "\u002E";
        keyState.position.start -= 1;
    }

    // <summary>Backspace or Delete</summary>
    // prevPrev is hasanta
    if (keyState.code === 8) {

        // if end==start then selected text so cursor should not move; otherwise should
        keyState.position.start -= +(keyState.position.start === keyState.position.end);

        if (prevPrev === "\u09CD" || prevPrev === this.global.ZWNJ)
            keyState.position.start -= 1;

        if (keyState.position.start < 0)
            keyState.position.start = 0;
    }
    // nextNext is hasanta
    if (keyState.code === 46) {
        // if end==start then selected text so cursor should not move; otherwise should
        keyState.position.end += +(keyState.position.start === keyState.position.end);
        keyState.position.end += nextNext === "\u09CD" ? 1 : 0;
    }

    // <summary>Final data preparation</summary>
    var firstPortion = text.slice(0, keyState.position.start);
    var lastPortion = text.slice(keyState.position.end);
    var finalText = firstPortion + keyState.unicodeKey + lastPortion;
    var caretPosition = keyState.position.start + keyState.unicodeKey.length;

	// <summary>Write final data and update caret</summary>
    this.writeFinalValue(finalText, caretPosition);

    return false;
};