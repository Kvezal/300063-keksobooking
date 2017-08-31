'use strict';

(function () {
  var PIN_MAIN = {
    width: 75,
    height: 94
  };

  var cityPinMapClickHandler = function (evt) {
    activateDialog(evt);
  };

  var activateDialog = function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
      window.pin.deletePinActive();
      target.parentNode.classList.add('pin--active');
      window.showCard(target);
      window.card.openDialog();
    }
  };

  var setPinPosition = function (elem, position) {
    elem.style.top = position.y + 'px';
    elem.style.left = position.x + 'px';

    var minlocationPositionX = Math.floor(PIN_MAIN.width / 2);
    var maxLocationPositionX = 1200 - PIN_MAIN.width / 2;
    var minLocationPositionY = 80;
    var maxLocationPositionY = 568;

    if (elem.offsetTop <= minLocationPositionY) {
      elem.style.top = '80px';
    }

    if (elem.offsetTop >= maxLocationPositionY) {
      elem.style.top = '568px';
    }

    if (elem.offsetLeft <= -minlocationPositionX) {
      elem.style.left = -PIN_MAIN.width / 2 + 'px';
    }

    if (elem.offsetLeft >= maxLocationPositionX) {
      elem.style.left = (1200 - PIN_MAIN.width / 2) + 'px';
    }
  };

  var setFieldAddress = function (elem) {
    address.value = (elem.offsetLeft + Math.floor(PIN_MAIN.width / 2)) + ', ' + (elem.offsetTop + PIN_MAIN.height);
  };

  var cityPinMapEnterPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateDialog(evt);
    }
  };

  var pinCurrentUserMouseDownHandler = function (evt) {
    evt.preventDefault();
    var pinWrapper = evt.target.parentElement;
    pinWrapper.style.zIndex = 1;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        y: (pinCurrentUser.offsetTop - shift.y),
        x: (pinCurrentUser.offsetLeft - shift.x)
      };

      setPinPosition(pinCurrentUser, pinPosition);
      setFieldAddress(pinCurrentUser);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      pinWrapper.style.zIndex = '';

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var addressChangeHandler = function () {
    var positions = address.value.split(', ');

    var shift = {
      x: positions[0] - Math.floor(PIN_MAIN.width / 2),
      y: positions[1] - PIN_MAIN.height
    };

    setPinPosition(pinCurrentUser, shift);
    setFieldAddress(pinCurrentUser);
  };

  var cityMap = document.querySelector('.tokyo__pin-map');
  cityMap.appendChild(window.pin.fragmentPinsMap);

  cityMap.addEventListener('click', cityPinMapClickHandler);
  cityMap.addEventListener('keydown', cityPinMapEnterPressHandler);

  var pinCurrentUser = cityMap.querySelector('.pin__main');
  pinCurrentUser.addEventListener('mousedown', pinCurrentUserMouseDownHandler);

  var address = document.querySelector('#address');
  address.addEventListener('change', addressChangeHandler);
  setFieldAddress(pinCurrentUser);
})();

