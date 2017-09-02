'use strict';

(function () {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var dialogPanelTemplate = lodgeTemplate.querySelector('.dialog__panel');

  window.showCard = function (element, adverts) {
    var pinParameters = {
      x: element.parentElement.offsetLeft + window.pin.PIN_PARAMETERS.width / 2,
      y: element.parentElement.offsetTop + window.pin.PIN_PARAMETERS.height
    };

    var dialog = document.querySelector('.dialog');
    var dialogPanel = dialog.querySelector('.dialog__panel');

    adverts.some(function (advert) {
      if (advert.location.x === pinParameters.x && advert.location.y === pinParameters.y) {
        var newDialogPanel = window.card.createNewDialogPanel(dialogPanelTemplate, advert);

        dialog.replaceChild(newDialogPanel, dialogPanel);
      }
    });
  };
})();
