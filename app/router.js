import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', function() {});

  this.route('edit', function() {
    this.route('brand');
    this.route('stud');
    this.route('tech');
  });
  this.route('stud');

  this.route('detail', function() {
    this.route('stud');
    this.route('tech');
  });
  this.route('tech');
  this.route('yard');
});

export default Router;
