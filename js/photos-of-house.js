'use strict';

(function () {
  var photoContainer = document.querySelector('.form__photo-container');
  var fileChooser = photoContainer.querySelector('input[type="file"]');
  var formPhotos = photoContainer.querySelectorAll('.form__photo');

  var checkUniquenessPhoto = function (imgSrc) {
    var images = photoContainer.querySelectorAll('img');

    for (var i = 0, imagesLength = images.length; i < imagesLength; i++) {
      if (images[i].src === imgSrc) {
        return false;
      }
    }

    return true;
  };

  var photosOfHouse = [];

  var addPhotoHouse = function (reader) {
    photosOfHouse.push(fileChooser.files[0]);

    photosOfHouse.forEach(function (item, index) {
      fileChooser.files[index] = item;
    });

    for (var i = 0, formPhotosLength = formPhotos.length; i < formPhotosLength; i++) {
      if (!formPhotos[i].firstChild) {
        var img = document.createElement('img');
        img.src = reader.result;

        if (!checkUniquenessPhoto(img.src)) {
          return;
        }

        formPhotos[i].appendChild(img);

        return;
      }
    }
  };

  window.uploadPhoto(fileChooser, addPhotoHouse);

  var draggedItem;

  var photoContainerDragStartHandler = function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', draggedItem);
    }
  };

  var photoContainerDragOverHandler = function (evt) {
    evt.preventDefault();
  };

  var photoContainerDropHandler = function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      var imageSrc = target.src;

      target.src = draggedItem.src;
      draggedItem.src = imageSrc;

      target = target.parentElement;
    }

    target.style.backgroundColor = '';
    target.style.outline = '';

    if (!target.firstChild && evt.target.classList.contains('form__photo')) {
      target.appendChild(draggedItem);
    }

    evt.preventDefault();
  };

  var photoContainerDragEnterHandler = function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      target = target.parentElement;
      target.style.outline = '2px solid red';
    }

    if (!target.firstChild && evt.target.classList.contains('form__photo')) {
      target.style.backgroundColor = 'yellow';
      target.style.outline = '2px solid red';
    }

    evt.preventDefault();
  };

  var photoContainerDragLeaveHandler = function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      target = target.parentElement;
    }

    target.style.backgroundColor = '';
    target.style.outline = '';
    evt.preventDefault();
  };

  photoContainer.addEventListener('dragstart', photoContainerDragStartHandler);
  photoContainer.addEventListener('dragover', photoContainerDragOverHandler);
  photoContainer.addEventListener('drop', photoContainerDropHandler);
  photoContainer.addEventListener('dragenter', photoContainerDragEnterHandler);
  photoContainer.addEventListener('dragleave', photoContainerDragLeaveHandler);

  window.photosOfHouse = photosOfHouse;
})();
