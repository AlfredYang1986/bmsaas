import EmberRouter from '@ember/routing/router';
import Route from '@ember/routing/route'
import config from './config/environment';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Route.reopen({
    withLayout: true,
    setupController() {
        this._super(...arguments);
        this.controllerFor('application').set('showNavbar', this.get('withLayout'));
    }
})

Router.map(function() {
  this.route('home', function() {});

  this.route('edit', function() {
    this.route('brand');
    this.route('stud', { path: '/stud/:studid' });
    this.route('tech', { path: '/tech/:techid' });
    this.route('yard', { path: '/yard/:yardid' });
    this.route('classes');
    this.route('course', { path: '/course/:courseid/:resid' });
    this.route('session', { path: '/session/:actid'});

    this.route('actv', function() {
      this.route('info', { path: '/info/:sessionid/:resid' });
      this.route('rsb');
    });

    this.route('exp', function() {
      this.route('info', { path: '/info/:sessionid/:resid' });
      this.route('rsb');
    });
    this.route('potential-stud');
    this.route('stud-course');
  });

  this.route('detail', function() {
    this.route('stud', { path: '/stud/:studid' });
    this.route('tech', { path: '/tech/:techid' });
    this.route('yard', { path: '/yard/:yardid' });
    this.route('yard', { path: '/yard' });
    this.route('course', { path: '/course/:courseid' });
    this.route('classes', { path: '/cls/:clsid'} );
    this.route('course-reserve', { path: '/course-reserve/:reid' });
    this.route('actarrangement', { path: '/actarrangement/:actactid/:perid' });
    this.route('exp', { path: '/exp/:expid' });
    this.route('exp-field', { path: '/exp-field/:expfieldid/:reexpid' });
    this.route('actv', { path: '/actv/:actvid' });
    this.route('actv-field', { path: '/actv-field/:actvfieldid/:reactvid' });
    this.route('order', { path: '/order/:orderid' });
  });

  this.route('stud');
  this.route('tech');
  this.route('yard');
  this.route('phrtest');
  this.route('course');
  this.route('inbox');
  this.route('classes');
  this.route('arrange-class');
  this.route('exp');
  this.route('actv');
  this.route('not-found');
  this.route('potential-stud');
  this.route('order');
});

export default Router;
