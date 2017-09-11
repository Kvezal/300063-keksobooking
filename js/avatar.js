'use strict';

(function () {

  var fileChooser = document.querySelector('.notice__photo input[type="file"]');
  var preview = document.querySelector('.notice__preview img');
  var pinMainImage = document.querySelector('.pin__main img');

  var func = function (reader) {
    preview.src = reader.result;
    pinMainImage.src = reader.result;
  };

  window.unloadPhoto(fileChooser, func);
})();
