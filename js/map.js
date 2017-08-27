'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
  return Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;
};

var mixRandomLengthArray = function (array, arrayLength) {
  var mixedArray = array.sort(function () {
    return 0.5 - Math.random();
  });

  return mixedArray.slice(0, generateIntegerNumber(1, arrayLength));
};

var getTypeHouse = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  }

  return 'Бунгало';
};

var getFeaturesFragment = function (features) {
  var featuresFragment = document.createDocumentFragment();

  features.forEach(function (item) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + item;

    featuresFragment.appendChild(span);
  });

  return featuresFragment;
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

var createNewDialogPanel = function (template, advert) {
  var information = advert.offer;

  var avatar = dialogTitle.querySelector('img');
  avatar.src = advert.author.avatar;

  template.querySelector('.lodge__title').textContent = information.title;
  template.querySelector('.lodge__address').textContent = information.address;
  template.querySelector('.lodge__price').textContent = information.price + '₽/ночь';
  template.querySelector('.lodge__type').textContent = getTypeHouse(information.type);
  template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + information.guests + ' гостей в ' + information.rooms + ' комнатах';
  template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + information.checkin + ', выезд до ' + information.checkout;
  template.querySelector('.lodge__description').textContent = information.description;

  var featuresFragment = getFeaturesFragment(information.features);
  var lodgeFeatures = document.createElement('div');
  lodgeFeatures.classList.add('lodge__features');
  lodgeFeatures.appendChild(featuresFragment);

  template.replaceChild(lodgeFeatures, template.querySelector('.lodge__features'));

  return template;
};

var deletePinActive = function () {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
};

var showDialog = function (element) {
  var imgSrc = element.src;
  var imgAddress = imgSrc.slice(imgSrc.indexOf('img'));

  adverts.some(function (advert) {
    if (advert.author.avatar === imgAddress) {
      createNewDialogPanel(dialogPanelTemplate, advert);
    }
  });
};

var closeDialog = function () {
  dialog.classList.add('hidden');

  deletePinActive();

  document.removeEventListener('keydown', popupEscPressHandler);
};

var openDialog = function () {
  dialog.classList.remove('hidden');

  document.addEventListener('keydown', popupEscPressHandler);
};

var activateDialog = function (evt) {
  var target = evt.target;

  if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
    deletePinActive();
    target.parentNode.classList.add('pin--active');
    showDialog(target);
    openDialog();
  }
};

var cityPinMapClickHandler = function (evt) {
  activateDialog(evt);
};

var cityPinMapEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateDialog(evt);
  }
};

var dialogCloseClickHandler = function () {
  closeDialog();
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
};

// функция сортировки задана временно, для отображения разных аватарок
// в элементе dialog__title
var adverts = generateAdverts(8).sort(function () {
  return 0.5 - Math.random();
});

var fragmentPinsMap = createPinsMap(adverts, PIN_WIDTH, PIN_HEIGHT);

var cityMap = document.querySelector('.tokyo__pin-map');
cityMap.appendChild(fragmentPinsMap);

cityMap.addEventListener('click', cityPinMapClickHandler);
cityMap.addEventListener('keydown', cityPinMapEnterPressHandler);

var dialog = document.querySelector('.dialog');
var dialogTitle = dialog.querySelector('.dialog__title');
var dialogPanel = dialog.querySelector('.dialog__panel');

var lodgeTemplate = document.querySelector('#lodge-template').content;
var dialogPanelTemplate = lodgeTemplate.querySelector('.dialog__panel');
var newDialogPanel = createNewDialogPanel(dialogPanelTemplate, adverts[0]);

dialog.replaceChild(newDialogPanel, dialogPanel);

var dialogClose = dialog.querySelector('.dialog__close');

dialogClose.addEventListener('click', dialogCloseClickHandler);

document.addEventListener('keydown', popupEscPressHandler);


var changeFieldValue = function (field, value) {
  field.value = value;
};

var changeFieldPrice = function (field, value) {
  var minPrice = 0;

  if (value === 'flat') {
    minPrice = 1000;
  } else if (value === 'house') {
    minPrice = 5000;
  } else if (value === 'palace') {
    minPrice = 10000;
  }

  field.value = minPrice;
};

var changeFieldCapacity = function (field, value) {
  var options = field.querySelectorAll('option');
  value = +value;

  options.forEach(function (item, index) {
    item.disabled = true;

    if (value === 100) {
      if (index !== 0) {
        return;
      }

      item.disabled = false;
      item.selected = true;
    } else if (index !== 0 && index <= value) {
      item.disabled = false;
      item.selected = true;
    }
  });
};

var resetForm = function (form) {
  setTimeout(function () {
    form.reset();
  }, 100);
};

var checkValidField = function (field) {
  field.style.borderColor = '';

  if (!field.validity.valid) {
    field.style.borderColor = '#ff0000';
  }
};

var checkNoticeForm = function () {
  checkValidField(title);
  checkValidField(address);
  checkValidField(price);
};

var timeinChangeHandler = function (evt) {
  changeFieldValue(timeout, evt.currentTarget.value);
};

var typeChangeHandler = function (evt) {
  var currentValue = evt.currentTarget.value;

  changeFieldPrice(price, currentValue);
};

var roomNumberChangeHandler = function (evt) {
  var currentRoomNumber = evt.currentTarget.value;

  changeFieldCapacity(capacity, currentRoomNumber);
};

var noticeFormSubmitHandler = function () {
  resetForm(noticeForm);
};

var formSubmitClickHandler = function () {
  checkNoticeForm();
};

var noticeForm = document.querySelector('.notice__form');
var formSubmit = noticeForm.querySelector('.form__submit');

var title = noticeForm.querySelector('#title');
var address = noticeForm.querySelector('#address');

var timein = noticeForm.querySelector('#timein');
var timeout = document.querySelector('#timeout');

var type = noticeForm.querySelector('#type');
var price = noticeForm.querySelector('#price');

var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

timein.addEventListener('change', timeinChangeHandler);
type.addEventListener('change', typeChangeHandler);
roomNumber.addEventListener('change', roomNumberChangeHandler);

formSubmit.addEventListener('click', formSubmitClickHandler);

noticeForm.addEventListener('submit', noticeFormSubmitHandler);
