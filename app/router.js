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
    this.route('stud', { path: '/:studid' });
    this.route('tech', { path: '/:techid' });
    this.route('yard', { path: '/:yardid' });
    this.route('classes');
    this.route('course', { path: '/:courseid' });
    this.route('course-reserve');
    this.route('experience', { path: '/:epid' });
    this.route('session', { path: '/:actid'});
  });
  this.route('stud');

  this.route('detail', function() {
    this.route('stud', { path: '/:studid' });
    this.route('tech', { path: '/:techid' });
    this.route('yard', { path: '/:yardid' });
    this.route('course', { path: '/:courseid' });
    this.route('classes', { path: '/:clsid'} );
    this.route('course-reserve', { path: '/:reid' });
    this.route('experience', { path: '/:actid' });
    this.route('actarrangement', { path: '/:actactid/:perid' });
  });
  this.route('tech');
  this.route('yard');
  this.route('phrtest');
  this.route('course');
  this.route('inbox');
  this.route('workBench');
  this.route('experienceOpen');
  this.route('courseReserve');
  this.route('classes');
  this.route('arrange-class');
});

export default Router;
