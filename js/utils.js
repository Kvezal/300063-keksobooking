'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var generateIntegerNumber = function (minNumber, maxNumber) {
    return Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      action();
    }
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    generateIntegerNumber: generateIntegerNumber,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
