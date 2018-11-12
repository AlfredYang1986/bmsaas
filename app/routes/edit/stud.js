import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
// import { inject as service } from '@ember/service';

export default Route.extend({
  // mock_data: service(),

  model(params) {
    // this.mock_data.sureStud();
    // let stud = this.store.peekRecord('bmstud', params.studid);
    this.get('logger').log(params);
    let stud = null;
    if (params.studid != 'stud/push') {
        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
        });

        let eqd = this.get('pmController').get('Store').createModel('eqcond', {
            id: this.guid(),
            type: 'eqcond',
            key: 'id',
            val: params.studid
        })
        request.get('eqcond').pushObject(eqd);

        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json);

        async function getStud(tmp) {
            return await tmp.get('pmController').get('Store').queryObject('/api/v1/findattendee/0', 'bm-attendees', json)
                .then(data => {
                    tmp.get('logger').log(data);
                    return data;
                })
                .catch(data => {
                    tmp.get('logger').log(data);
                    this.transitionTo('home')
                })
        }
        stud = getStud(this)
    }

    return RSVP.hash({
        stud: stud
    })
  },

  guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    if (model.stud != null) {
      controller.set('chd_name', model.stud.get('name'));
      controller.set('chd_nickname', model.stud.get('nickname'));
      controller.set('chd_gender', model.stud.get('gender'));
      controller.set('chd_school', model.stud.get('school'));
      controller.set('stud_date', model.stud.get('dob'));

      controller.set('par_name', model.stud.Guardians.firstObject.get('name'));
      this.get('logger').log(model.stud.Guardians.firstObject.get('name'))
      controller.set('par_nickname', model.stud.Guardians.firstObject.get('nickname'));
      controller.set('par_rs', model.stud.Guardians.firstObject.get('relation_ship'));
      controller.set('par_contact', model.stud.Guardians.firstObject.get('contact'));
      controller.set('par_wechat', model.stud.Guardians.firstObject.get('wechat'));
      controller.set('par_address', model.stud.Guardians.firstObject.get('address'));

      controller.set('isPushing', false);
    } else {
      controller.set('chd_name', '');
      controller.set('chd_nickname', '');
      controller.set('chd_gender', '');
      controller.set('chd_school', '');

      controller.set('par_name', '');
      controller.set('par_nickname', '');
      controller.set('par_rs', '');
      controller.set('par_contact', '');
      controller.set('par_wechat', '');
      controller.set('par_address', '');

      controller.set('stud_date');

      controller.set('isPushing', true);
    }
  },
});
