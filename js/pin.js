'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var createPinsMap = function (adverts, width, height) {
    var blockPinsMap = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      var pinMap = document.createElement('div');

      pinMap.classList.add('pin');

      pinMap.style.left = advert.location.x - width / 2 + 'px';
      pinMap.style.top = advert.location.y - height + 'px';

      var pinMapImage = document.createElement('img');
      pinMapImage.src = advert.author.avatar + '';
      pinMapImage.className = 'rounded';
      pinMapImage.width = width;
      pinMapImage.height = height;
      pinMapImage.tabIndex = '0';

      pinMap.appendChild(pinMapImage);

      blockPinsMap.appendChild(pinMap);
    });

    return blockPinsMap;
  };

  var fragmentPinsMap = createPinsMap(window.data.adverts, PIN_WIDTH, PIN_HEIGHT);

  window.pin = {
    fragmentPinsMap: fragmentPinsMap,
    deletePinActive: function () {
      var pinActive = document.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
    }
  };
})();
