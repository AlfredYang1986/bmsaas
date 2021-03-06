'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
// var nodeSass = require('node-sass');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    },
    sassOptions: {
      includePaths: [
        'bower_components/foundation/scss',
      ],
      // nodeSass: nodeSass
    },
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import('bower_components/jsonapi-datastore/dist/jsonapi-datastore.js');
  app.import('vendor/shims/jsonapi-datastore.js');
  app.import('bower_components/ali-oss/dist/aliyun-oss-sdk.js');
  app.import('vendor/shims/ali-oss.js');

    app.import("vendor/laydate/theme/default/font/iconfont.eot", {
    destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/font/iconfont.svg", {
    destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/font/iconfont.ttf", {
    destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/font/iconfont.woff", {
    destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/laydate.css")
    app.import("vendor/laydate/laydate.js")

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
