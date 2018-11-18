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
    this.route('session', { path: '/:actid'});

    this.route('actv', function() {
      this.route('info', { path: '/:sessionid' });
      this.route('rsb');
    });

    this.route('exp', function() {
      this.route('info', { path: '/:sessionid' });
      this.route('rsb');
    });
  });

  this.route('detail', function() {
    this.route('stud', { path: '/:studid' });
    this.route('tech', { path: '/:techid' });
    this.route('yard', { path: '/:yardid' });
    this.route('course', { path: '/:courseid' });
    this.route('classes', { path: '/:clsid'} );
    this.route('course-reserve', { path: '/:reid' });
    this.route('actarrangement', { path: '/:actactid/:perid' });
    this.route('exp', { path: '/:expid' });
    this.route('exp-field', { path: '/:expfieldid' });
    this.route('actv', { path: '/:actvid' });
    this.route('expsession', { path: '/:eid/:sid' });
    this.route('actv-field', { path: '/:actvfieldid' });
  });

  this.route('stud');
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
  this.route('demo');
  this.route('exp');
  this.route('actv');

});

export default Router;
