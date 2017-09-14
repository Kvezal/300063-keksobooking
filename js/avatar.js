'use strict';

(function () {

  var fileChooser = document.querySelector('.notice__photo input[type="file"]');
  var previewImage = document.querySelector('.notice__preview img');
  var pinMainImage = document.querySelector('.pin__main img');

  var addAvatarPhoto = function (reader) {
    previewImage.src = reader.result;
    pinMainImage.src = reader.result;
  };

  window.uploadPhoto(fileChooser, addAvatarPhoto);
})();
