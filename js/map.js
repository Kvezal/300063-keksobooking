'use strict';

(function () {
  var cityPinMapClickHandler = function (evt) {
    activateDialog(evt);
  };

  var showDialog = function (element) {
    var imgSrc = element.src;
    var imgAddress = imgSrc.slice(imgSrc.indexOf('img'));

    window.data.adverts.some(function (advert) {
      if (advert.author.avatar === imgAddress) {
        window.card.createNewDialogPanel(window.card.dialogPanelTemplate, advert);
      }
    });
  };

  var activateDialog = function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
      window.pin.deletePinActive();
      target.parentNode.classList.add('pin--active');
      showDialog(target);
      window.card.openDialog();
    }
  };

  var cityPinMapEnterPressHandler = function (evt) {
    if (evt.keyCode === 13) {
      activateDialog(evt);
    }
  };

  var cityMap = document.querySelector('.tokyo__pin-map');
  cityMap.appendChild(window.pin.fragmentPinsMap);

  cityMap.addEventListener('click', cityPinMapClickHandler);
  cityMap.addEventListener('keydown', cityPinMapEnterPressHandler);
})();

