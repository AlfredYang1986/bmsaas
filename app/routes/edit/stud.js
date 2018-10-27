import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureStud();
        let stud = this.store.peekRecord('bmstud', params.studid);
        if (stud == null) {
            this.transitionTo('home');
        }

        return RSVP.hash({
                stud: stud
            })
    },

    setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        controller.set('chd_name', model.stud.me.get('name'));
        controller.set('chd_nickname', model.stud.me.get('nickname'));
        controller.set('chd_gender', model.stud.me.get('gender'));
        controller.set('chd_school', model.stud.get('school'));

        controller.set('par_name', model.stud.guardian.get('me').get('name'));
        controller.set('par_nickname', model.stud.guardian.get('me').get('nickname'));
        controller.set('par_rs', model.stud.guardian.get('rs'));
        controller.set('par_contact', model.stud.guardian.get('me').get('contact'));
        controller.set('par_wechat', model.stud.guardian.get('me').get('wechat'));
        controller.set('par_address', model.stud.guardian.get('address'));

        controller.set('urg_name', model.stud.urgent.get('me').get('name'));
        controller.set('urg_nickname', model.stud.urgent.get('me').get('nickname'));
        controller.set('urg_rs', model.stud.urgent.get('rs'));
        controller.set('urg_contact', model.stud.urgent.get('me').get('contact'));
    },
});
