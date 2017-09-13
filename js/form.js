'use strict';
(function () {
  var ADVERT_TYPE = [
    'flat',
    'house',
    'bungalo',
    'palace'
  ];
  var ADVERT_CHECKIN_OR_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var ADVERT_MIN_PRICE = [
    '1000',
    '5000',
    '0',
    '10000'
  ];
  var ROOMS_NUMBERS = [
    '100',
    '1',
    '2',
    '3'
  ];
  var CAPACITY_LIST = [
    [0],
    [1],
    [1, 2],
    [1, 2, 3]
  ];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;

    syncValues(element, value);
  };

  var syncValueWithOptions = function (element, list) {
    var elementOptions = [].slice.apply(element.querySelectorAll('option'));
    var listLength = list.length;

    elementOptions.forEach(function (item, index) {
      if (list[0] === 0 && index === 0) {
        item.disabled = false;
        item.selected = true;
        listLength = 0;
        return;
      }

      if (index > 0 && index <= listLength) {
        item.disabled = false;
        item.selected = true;
        return;
      }

      item.disabled = true;
    });
  };

  var resetFormPhotos = function () {
    var formPhotos = document.querySelectorAll('.form__photo');

    for (var i = formPhotos.length - 1; i >= 0; i--) {
      if (formPhotos[i].firstChild) {
        formPhotos[i].removeChild(formPhotos[i].firstChild);
      }
    }

    window.photosOfHouse = [];

    var userAvatar = document.querySelector('img[alt="User Avatar"]');
    userAvatar.src = 'img/muffin.png';

    var mainPin = document.querySelector('img[alt="Main Pin"]');
    mainPin.src = 'img/main-pin-image.png';
  };

  var resetForm = function () {
    setTimeout(function () {
      noticeForm.reset();
      resetFormPhotos();
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
    window.synchronizeFields(evt.target, timeout, ADVERT_CHECKIN_OR_CHECKOUT, ADVERT_CHECKIN_OR_CHECKOUT, syncValues);
  };

  var timeoutChangeHandler = function (evt) {
    window.synchronizeFields(evt.target, timein, ADVERT_CHECKIN_OR_CHECKOUT, ADVERT_CHECKIN_OR_CHECKOUT, syncValues);
  };

  var typeChangeHandler = function (evt) {
    window.synchronizeFields(evt.target, price, ADVERT_TYPE, ADVERT_MIN_PRICE, syncValueWithMin);
  };

  var roomNumberChangeHandler = function (evt) {
    window.synchronizeFields(evt.target, capacity, ROOMS_NUMBERS, CAPACITY_LIST, syncValueWithOptions);
  };

  var noticeFormSubmitHandler = function (evt) {
    window.backend.save(new FormData(noticeForm), resetForm, window.backend.displayError);
    evt.preventDefault();
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
  timeout.addEventListener('change', timeoutChangeHandler);

  type.addEventListener('change', typeChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);

  formSubmit.addEventListener('click', formSubmitClickHandler);

  noticeForm.addEventListener('submit', noticeFormSubmitHandler);
})();
