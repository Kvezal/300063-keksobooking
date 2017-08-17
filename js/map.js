'use strict';

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

var generateIntegerNumber = function (minNumber, maxNumber) {
  var number = Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;

  return number;
};

var mixRandomLengthArray = function (array, arrayLength) {
  var mixedArray = array.sort(function () {
    return 0.5 - Math.random();
  });

  return mixedArray.slice(0, generateIntegerNumber(1, arrayLength));
};

var generateAdverts = function (amount) {
  var advertsList = [];
  var advertFeatures = ADVERT_FEATURES.slice();
  var advertFeaturesLength = ADVERT_FEATURES.length;

  for (var i = 0; i < amount; i++) {
    var advert = {
      'author': {
        'avatar': 'img/avatars/user{{0' + i + '}}.png'
      },

      'offer': {
        'title': ADVERT_TITLES[i],
        'address': '{{' + location.x + '}}, {{' + location.y + '}}',
        'price': generateIntegerNumber(1000, 1000000),
        'type': ADVERT_TYPE[generateIntegerNumber(0, 2)],
        'rooms': generateIntegerNumber(1, 5),
        'guests': generateIntegerNumber(1, 5),
        'checkin': ADVERT_CHECKIN_OR_CHECKOUT[generateIntegerNumber(0, 2)],
        'checkout': ADVERT_CHECKIN_OR_CHECKOUT[generateIntegerNumber(0, 2)],
        'features': mixRandomLengthArray(advertFeatures, advertFeaturesLength),
        'description': '',
        'photos': []
      },

      'location': {
        'x': generateIntegerNumber(300, 900),
        'y': generateIntegerNumber(100, 500)
      }
    };

    advertsList[i] = advert;
  }

  return advertsList;
};

var adverts = generateAdverts(8);

