// mimic jQuery to export modules
if ("object" === typeof module && "object" === typeof module.exports) {
  module.exports = {
    banglaLayout: banglaLayout,
    Keyboard: Keyboard,
    Letter_Information: Letter_Information
  };
}