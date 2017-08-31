'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, fieldData1, fieldData2, synchronizeData) {
    var indexValue = fieldData1.indexOf(field1.value);

    synchronizeData(field2, fieldData2[indexValue]);
  };
})();

