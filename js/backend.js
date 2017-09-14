'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';

  var setupBackend = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    var xhrLoadHandler = function () {
      var errorMessage;

      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
          break;
        case 400:
          errorMessage = 'Неправильный запрос';
          break;
        case 401:
          errorMessage = 'Пользователь не авторизован';
          break;
        case 404:
          errorMessage = 'Ничего не найдено';
          break;

        default:
          errorMessage = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorMessage) {
        errorHandler(errorMessage);
      }
    };

    var xhrErrorHandler = function () {
      errorHandler('Произошла ошибка соединения');
    };

    var xhrTimeoutHandler = function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', xhrErrorHandler);
    xhr.addEventListener('timeout', xhrTimeoutHandler);

    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = setupBackend(loadHandler, errorHandler);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = setupBackend(loadHandler, errorHandler);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var displayError = function (errorMessage) {
    var closeButtonClickHandler = function () {
      document.body.removeChild(errorDiv);

      closeButton.removeEventListener('click', closeButtonClickHandler);
    };

    var closeButtonKeydownHandler = function (evt) {
      if (evt.keyCode === window.utils.ENTER_KEYCODE) {
        document.body.removeChild(errorDiv);

        closeButton.removeEventListener('keydown', closeButtonClickHandler);
      }
    };

    var errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = errorMessage;

    var closeButton = document.createElement('button');
    closeButton.classList.add('error-message__button');

    closeButton.addEventListener('click', closeButtonClickHandler);
    closeButton.addEventListener('keydown', closeButtonKeydownHandler);

    errorDiv.appendChild(closeButton);
    document.body.appendChild(errorDiv);
  };

  window.backend = {
    load: load,
    save: save,
    displayError: displayError
  };
})();
