'use strict';

(function () {
  var PIN_PARAMETERS = {
    width: 56,
    height: 75,
    imageWidth: 40,
    imageHeight: 40
  };

  window.pin = {
    PIN_PARAMETERS: PIN_PARAMETERS,

    createPinsMap: function (adverts) {
      var blockPinsMap = document.createDocumentFragment();

      adverts.forEach(function (advert) {
        var pinMap = document.createElement('div');

        pinMap.classList.add('pin');

        pinMap.style.left = advert.location.x - PIN_PARAMETERS.width / 2 + 'px';
        pinMap.style.top = advert.location.y - PIN_PARAMETERS.height + 'px';

        var pinMapImage = document.createElement('img');
        pinMapImage.src = advert.author.avatar + '';
        pinMapImage.className = 'rounded';
        pinMapImage.width = PIN_PARAMETERS.imageWidth;
        pinMapImage.height = PIN_PARAMETERS.imageHeight;
        pinMapImage.tabIndex = '0';

        pinMap.appendChild(pinMapImage);

        blockPinsMap.appendChild(pinMap);
      });

      return blockPinsMap;
    },

    deletePinActive: function () {
      var pinActive = document.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
    }
  };
})();
