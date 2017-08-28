'use strict';

(function () {
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

  var showDialog = function (element) {
    var imgSrc = element.src;
    var imgAddress = imgSrc.slice(imgSrc.indexOf('img'));

    window.data.adverts.some(function (advert) {
      if (advert.author.avatar === imgAddress) {
        window.card.createNewDialogPanel(window.card.dialogPanelTemplate, advert);
      }
    });
  };

  var dialogCloseClickHandler = function () {
    window.card.closeDialog();
  };

  var popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, window.card.closeDialog());
  };

  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');
  var dialogPanel = dialog.querySelector('.dialog__panel');

  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var dialogPanelTemplate = lodgeTemplate.querySelector('.dialog__panel');
  var newDialogPanel = createNewDialogPanel(dialogPanelTemplate, window.data.adverts[0]);

  dialog.replaceChild(newDialogPanel, dialogPanel);

  var dialogClose = dialog.querySelector('.dialog__close');
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  document.addEventListener('keydown', popupEscPressHandler);

  window.card = {
    dialog: dialog,
    createNewDialogPanel: createNewDialogPanel,
    dialogPanelTemplate: dialogPanelTemplate,

    closeDialog: function () {
      dialog.classList.add('hidden');

      window.pin.deletePinActive();

      document.removeEventListener('keydown', popupEscPressHandler);
    },

    openDialog: function () {
      window.card.dialog.classList.remove('hidden');

      document.addEventListener('keydown', popupEscPressHandler);
    },

    activateDialog: function (evt) {
      var target = evt.target;

      if (target.tagName === 'IMG' && !target.parentNode.classList.contains('pin__main')) {
        window.pin.deletePinActive();
        target.parentNode.classList.add('pin--active');
        showDialog(target);
        window.card.openDialog();
      }
    }
  };
})();
