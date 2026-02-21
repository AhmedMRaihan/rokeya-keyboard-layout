import { BanglaLayout } from "./dist/BanglaLayout";

window.rokeyaLayoutKeyboard = null;
var sourceLabel = document.getElementById("activeLanguageIndicator");

function modifySourceLabel(text, backgroundColor) {
  sourceLabel.innerHTML = text;
  sourceLabel.style.backgroundColor = backgroundColor;
}

window.rokeyaLayoutKeyboard = new BanglaLayout("checkItOut", {
  afterKeyEvent: function () {
    var isBNActive =
      window.rokeyaLayoutKeyboard.keyboard.letterInformation.currentLanguage ===
      "bn_BD";
    if (isBNActive === true) {
      modifySourceLabel("বাংলা", "green");
    } else {
      modifySourceLabel("ইংরেজী", "#47a6f0");
    }
  },
});

function switchLanguage() {
  if (rokeyaLayoutKeyboard == null) {
    return;
  }

  var wasBNActive = sourceLabel.innerHTML === "বাংলা";
  if (wasBNActive == false) {
    rokeyaLayoutKeyboard.keyboard.letterInformation.currentLanguage = "bn_BD";
    modifySourceLabel("বাংলা", "green");
  } else {
    rokeyaLayoutKeyboard.keyboard.letterInformation.currentLanguage = "en_US";
    modifySourceLabel("ইংরেজী", "#47a6f0");
  }
}
document.getElementById("activeLanguageIndicator").addEventListener("click", switchLanguage);