(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['jsonapi-datastore'],
      __esModule: true,
    };
  }

  define('jsonapi-datastore', [], vendorModule);
})();
