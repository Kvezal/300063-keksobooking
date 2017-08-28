'use strict';

(function () {
  var cityPinMapClickHandler = function (evt) {
    window.card.activateDialog(evt);
  };

  var cityPinMapEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, window.card.activateDialog(evt));
  };

  var cityMap = document.querySelector('.tokyo__pin-map');
  cityMap.appendChild(window.pin.fragmentPinsMap);

  cityMap.addEventListener('click', cityPinMapClickHandler);
  cityMap.addEventListener('keydown', cityPinMapEnterPressHandler);
})();

