'use strict';
(function () {
  window.unloadPhoto = function (field, callback) {
    var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

    field.addEventListener('change', function () {
      var file = field.files[0];
      var fileName = file.name.toLowerCase();
      var fileFormat = fileName.slice(fileName.lastIndexOf('.') + 1);

      var matches = FILE_TYPES.some(function (item) {
        return fileFormat === item;
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          callback(reader);
        });

        reader.readAsDataURL(file);
      }
    });
  };
})();
