'use strict';

(function () {
  window.showCard = function (element) {
    var imgSrc = element.src;
    var imgAddress = imgSrc.slice(imgSrc.indexOf('img'));

    window.data.adverts.some(function (advert) {
      if (advert.author.avatar === imgAddress) {
        window.card.createNewDialogPanel(window.card.dialogPanelTemplate, advert);
      }
    });
  };
})();
