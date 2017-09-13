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

  var addPhotos = function (reader) {
    window.photosOfHouse.push(fileChooser.files[0]);

    window.photosOfHouse.forEach(function (item, index) {
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

        break;
      }
    }
  };

  window.unloadPhoto(fileChooser, addPhotos);

  var draggedItem;

  photoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', draggedItem);
    }
  });

  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  photoContainer.addEventListener('drop', function (evt) {
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
  });

  photoContainer.addEventListener('dragenter', function (evt) {
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
  });

  photoContainer.addEventListener('dragleave', function (evt) {
    var target = evt.target;

    if (target.tagName === 'IMG') {
      target = target.parentElement;
    }

    target.style.backgroundColor = '';
    target.style.outline = '';
    evt.preventDefault();
  });

  window.photosOfHouse = [];
})();
