'use strict';

(function () {
  var ADVERT_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var ADVERT_TYPE = [
    'flat',
    'house',
    'bungalo'
  ];
  var ADVERT_CHECKIN_OR_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var ADVERT_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var mixRandomLengthArray = function (array, arrayLength) {
    var mixedArray = array.sort(function () {
      return 0.5 - Math.random();
    });

    return mixedArray.slice(0, window.utils.generateIntegerNumber(1, arrayLength));
  };

  var generateAdverts = function (amount) {
    var advertsList = [];
    var advertFeatures = ADVERT_FEATURES.slice();
    var advertFeaturesLength = ADVERT_FEATURES.length;

    var minLocationPositionX = 300 + PIN_WIDTH / 2;
    var maxLocationPositionX = 900 + PIN_WIDTH / 2;
    var minLocationPositionY = 100 + PIN_HEIGHT;
    var maxLocationPositionY = 500 + PIN_HEIGHT;

    for (var i = 0; i < amount; i++) {
      var advert = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': ADVERT_TITLES[i],
          'price': window.utils.generateIntegerNumber(1000, 1000000),
          'type': ADVERT_TYPE[window.utils.generateIntegerNumber(0, 2)],
          'rooms': window.utils.generateIntegerNumber(1, 5),
          'guests': window.utils.generateIntegerNumber(1, 5),
          'checkin': ADVERT_CHECKIN_OR_CHECKOUT[window.utils.generateIntegerNumber(0, 2)],
          'checkout': ADVERT_CHECKIN_OR_CHECKOUT[window.utils.generateIntegerNumber(0, 2)],
          'features': mixRandomLengthArray(advertFeatures, advertFeaturesLength),
          'description': '',
          'photos': []
        },

        'location': {
          'x': window.utils.generateIntegerNumber(minLocationPositionX, maxLocationPositionX),
          'y': window.utils.generateIntegerNumber(minLocationPositionY, maxLocationPositionY)
        }
      };

      advert.offer.address = advert.location.x + ', ' + advert.location.y;

      advertsList[i] = advert;
    }

    return advertsList;
  };

  window.data = {
    adverts: generateAdverts(8).sort(function () {
      return 0.5 - Math.random();
    })
  };
})();
