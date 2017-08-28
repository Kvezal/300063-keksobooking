'use strict';
(function () {
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

    field.min = minPrice;
    field.value = minPrice;
  };

  var changeFieldCapacity = function (field, value) {
    var options = field.querySelectorAll('option');
    value = +value;

    [].forEach.call(options, (function (item, index) {
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
    }));
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

  var timeoutChangeHandler = function (evt) {
    changeFieldValue(timein, evt.currentTarget.value);
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
  timeout.addEventListener('change', timeoutChangeHandler);

  type.addEventListener('change', typeChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);

  formSubmit.addEventListener('click', formSubmitClickHandler);

  noticeForm.addEventListener('submit', noticeFormSubmitHandler);
})();
