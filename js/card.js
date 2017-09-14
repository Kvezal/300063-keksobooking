'use strict';

(function () {
  var TYPE_HOUSE = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var ADVERTS_PHOTOS_PARAMETERS = {
    width: 52,
    height: 42
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

  var getPhotosFragment = function (photos) {
    var photosFragment = document.createDocumentFragment();

    photos.forEach(function (item) {
      var img = document.createElement('img');
      img.width = ADVERTS_PHOTOS_PARAMETERS.width;
      img.height = ADVERTS_PHOTOS_PARAMETERS.height;
      img.src = item;

      photosFragment.appendChild(img);
    });

    return photosFragment;
  };

  var clearList = function (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  };

  var closeDialog = function () {
    dialog.classList.add('hidden');

    window.pin.deletePinActive();

    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var openDialog = function () {
    dialog.classList.remove('hidden');

    document.addEventListener('keydown', popupEscPressHandler);
  };

  var popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeDialog);
  };

  var dialogCloseClickHandler = function (evt) {
    evt.preventDefault();

    closeDialog();
  };

  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');

  var dialogClose = dialog.querySelector('.dialog__close');
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  document.addEventListener('keydown', popupEscPressHandler);

  var createNewDialogPanel = function (template, advert) {
    var information = advert.offer;

    var avatar = dialogTitle.querySelector('img');
    avatar.src = advert.author.avatar;

    template.querySelector('.lodge__title').textContent = information.title;
    template.querySelector('.lodge__address').textContent = information.address;
    template.querySelector('.lodge__price').textContent = information.price +
      '₽/ночь';

    template.querySelector('.lodge__type').textContent =
      TYPE_HOUSE[information.type];

    template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' +
      information.guests + ' гостей в ' + information.rooms + ' комнатах';

    template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' +
      information.checkin + ', выезд до ' + information.checkout;

    template.querySelector('.lodge__description').textContent =
      information.description;

    var featuresFragment = getFeaturesFragment(information.features);
    var lodgeFeatures = template.querySelector('.lodge__features');

    clearList(lodgeFeatures);

    lodgeFeatures.appendChild(featuresFragment);

    var photosFragment = getPhotosFragment(information.photos);
    var lodgePhotos = template.querySelector('.lodge__photos');

    clearList(lodgePhotos);

    lodgePhotos.appendChild(photosFragment);

    return template;
  };

  window.card = {
    createNewDialogPanel: createNewDialogPanel,
    closeDialog: closeDialog,
    openDialog: openDialog
  };
})();
