'use strict';

(function () {
  var tokyoFilters = document.querySelector('.tokyo__filters');

  var housesType = tokyoFilters.querySelector('#housing_type');
  var housesPrice = tokyoFilters.querySelector('#housing_price');
  var housesRoomNumber = tokyoFilters.querySelector('#housing_room-number');
  var housesGuestsNumber = tokyoFilters.querySelector('#housing_guests-number');
  var features = tokyoFilters.querySelectorAll('input[name="feature"]');

  var filterHousesElement = function (filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  };

  var filterHousesPrice = function (price) {
    if (housesPrice.value === 'middle') {
      return (price >= 10000) && (price < 50000);
    }

    if (housesPrice.value === 'low') {
      return price < 10000;
    }

    if (housesPrice.value === 'high') {
      return price >= 50000;
    }

    return true;
  };

  var filterHousesFeatures = function (filterFeatures, itemFeatures) {
    return filterFeatures.every(function (item) {
      return itemFeatures.indexOf(item) !== -1;
    });
  };

  var filter = function () {
    var housesFeatures = [].filter.call(features, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.tokyoMap.adverts.filter(function (item) {
      if (!filterHousesElement(housesType.value, item.offer.type)) {
        return false;
      }

      if (!filterHousesPrice(item.offer.price)) {
        return false;
      }

      if (!filterHousesElement(housesRoomNumber.value, item.offer.rooms + '')) {
        return false;
      }

      if (!filterHousesElement(housesGuestsNumber.value, item.offer.guests + '')) {
        return false;
      }

      if (!filterHousesFeatures(housesFeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  };

  window.filter = filter;
})();
