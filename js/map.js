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

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

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
        'x': generateIntegerNumber(minLocationPositionX, maxLocationPositionX),
        'y': generateIntegerNumber(minLocationPositionY, maxLocationPositionY)
      }
    };

    advert.offer.address = advert.location.x + ', ' + advert.location.y;

    advertsList[i] = advert;
  }

  return advertsList;
};

var createPinsMap = function (adverts, width, height) {
  var blockPinsMap = document.createDocumentFragment();

  adverts.forEach(function (advert) {
    var pinMap = document.createElement('div');
    pinMap.className = 'pin';
    pinMap.style.left = advert.location.x - width / 2 + 'px';
    pinMap.style.top = advert.location.y - height + 'px';

    var pinMapImage = document.createElement('img');
    pinMapImage.src = advert.author.avatar + '';
    pinMapImage.className = 'rounded';
    pinMapImage.width = width;
    pinMapImage.height = height;

    pinMap.appendChild(pinMapImage);

    blockPinsMap.appendChild(pinMap);
  });

  return blockPinsMap;
};

var createNewDialogPanel = function (template, advert) {
  var information = advert.offer;

  var avatar = dialogTitle.querySelector('img');
  avatar.src = advert.author.avatar;

  template.querySelector('.lodge__title').textContent = information.title;
  template.querySelector('.lodge__address').textContent = information.address;
  template.querySelector('.lodge__price').textContent = information.price + '₽/ночь';
    template.querySelector('.lodge__type').textContent = information.type;
  template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + information.guests + ' гостей в ' + information.rooms + ' комнатах';
  template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + information.checkin + ', выезд до ' + information.checkout;
    template.querySelector('.lodge__features').textContent = '';
  template.querySelector('.lodge__description').textContent = information.description;

  return template;
};

// функция сортировки задана временно, для отображения разных аватарок
// в элементе dialog__title
var adverts = generateAdverts(8).sort(function () {
  return 0.5 - Math.random();
});

var fragmentPinsMap = createPinsMap(adverts, PIN_WIDTH, PIN_HEIGHT);

var tokioPinMap = document.querySelector('.tokyo__pin-map');
tokioPinMap.appendChild(fragmentPinsMap);


var dialog = document.querySelector('.dialog');
var dialogTitle = dialog.querySelector('.dialog__title');
var dialogPanel = dialog.querySelector('.dialog__panel');

var lodgeTemplate = document.querySelector('#lodge-template').content;
var dialogPanelTemplate = lodgeTemplate.querySelector('.dialog__panel');
var newDialogPanel = createNewDialogPanel(dialogPanelTemplate, adverts[0]);
dialog.replaceChild(newDialogPanel, dialogPanel);
