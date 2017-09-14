'use strict';

(function () {
  var PIN_MAIN = {
    width: 75,
    height: 94
  };

  var MAP_PARAMETERS = {
    borderTop: 80,
    borderRight: 1200 - PIN_MAIN.width / 2,
    borderBottom: 568,
    borderLeft: -Math.floor(PIN_MAIN.width / 2)
  };

  var activateDialog = function (evt, data) {
    var target = evt.target;

    if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
      window.pin.deletePinActive();
      target.parentNode.classList.add('pin--active');
      window.showCard(target, data);
      window.card.openDialog(data);
    }
  };

  var setPinPosition = function (elem, position) {
    elem.style.top = position.y + 'px';
    elem.style.left = position.x + 'px';

    if (elem.offsetTop <= MAP_PARAMETERS.borderTop) {
      elem.style.top = MAP_PARAMETERS.borderTop + 'px';
    }

    if (elem.offsetTop >= MAP_PARAMETERS.borderBottom) {
      elem.style.top = MAP_PARAMETERS.borderBottom + 'px';
    }

    if (elem.offsetLeft <= MAP_PARAMETERS.borderLeft) {
      elem.style.left = MAP_PARAMETERS.borderLeft + 'px';
    }

    if (elem.offsetLeft >= MAP_PARAMETERS.borderRight) {
      elem.style.left = MAP_PARAMETERS.borderRight + 'px';
    }
  };

  var setFieldAddress = function (elem) {
    address.value = (elem.offsetLeft + Math.floor(PIN_MAIN.width / 2)) + ', '
    + (elem.offsetTop + PIN_MAIN.height);
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

  var showPins = function (adverts, amount) {
    cityMap.appendChild(window.pin.createPinsMap(adverts, amount));
  };

  var loadPinsAndCards = function (data) {
    window.tokyoMap.adverts = data;

    var cityPinMapClickHandler = function (evt) {
      activateDialog(evt, data);
    };

    var cityPinMapEnterPressHandler = function (evt) {
      if (evt.keyCode === window.utils.ENTER_KEYCODE) {
        activateDialog(evt, data);
      }
    };

    showPins(data, 3);

    cityMap.addEventListener('click', cityPinMapClickHandler);
    cityMap.addEventListener('keydown', cityPinMapEnterPressHandler);
  };

  window.backend.load(loadPinsAndCards, window.backend.displayError);

  var pinCurrentUser = cityMap.querySelector('.pin__main');
  pinCurrentUser.addEventListener('mousedown', pinCurrentUserMouseDownHandler);

  var address = document.querySelector('#address');
  address.addEventListener('change', addressChangeHandler);

  var renderPins = function () {
    window.card.closeDialog();
    window.pin.deletePinActive();

    while (cityMap.children.length !== 1) {
      cityMap.removeChild(cityMap.children[1]);
    }

    showPins(window.filter());
  };

  var tokyoFiltersFormChangeHandler = function (evt) {
    if (!evt.target.classList.contains('tokyo__filter') && evt.target.name !== 'feature') {
      return;
    }

    window.debounce(renderPins);
  };

  var tokyoFiltersForm = document.querySelector('.tokyo__filters');
  tokyoFiltersForm.addEventListener('change', tokyoFiltersFormChangeHandler);

  window.tokyoMap = {
    adverts: []
  };
})();

