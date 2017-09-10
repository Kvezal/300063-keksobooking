'use strict';

(function () {
  var tokyoFilters = document.querySelector('.tokyo__filters');

  var housingType = tokyoFilters.querySelector('#housing_type');
  var housingPrice = tokyoFilters.querySelector('#housing_price');
  var housingRoomNumber = tokyoFilters.querySelector('#housing_room-number');
  var housingGuestsNumber = tokyoFilters.querySelector('#housing_guests-number');
  var features = tokyoFilters.querySelectorAll('input[name="feature"]');

  var filterHousingElement = function (filterValue, itemValue) {
    if (filterValue === 'any') {
      return true;
    } else if (itemValue === filterValue) {
      return true;
    }
    return false;
  };

  var filterHousingPrice = function (price) {
    if (housingPrice.value === 'middle') {
      return (price >= 10000) && (price < 50000);
    } else if (housingPrice.value === 'low') {
      return price < 10000;
    } else if (housingPrice.value === 'high') {
      return price >= 50000;
    } else {
      return true;
    }
  };

  var filterHousingFeatures = function (filterFeatures, itemFeatures) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (itemFeatures.indexOf(filterFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  window.filters = function () {
    var housingFeatures = [].filter.call(features, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.tokyoMap.adverts.filter(function (item) {
      if (!filterHousingElement(housingType.value, item.offer.type)) {
        return false;
      }
      if (!filterHousingPrice(item.offer.price)) {
        return false;
      }
      if (!filterHousingElement(housingRoomNumber.value, item.offer.rooms + '')) {
        return false;
      }
      if (!filterHousingElement(housingGuestsNumber.value, item.offer.guests + '')) {
        return false;
      }
      if (!filterHousingFeatures(housingFeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  };
})();
