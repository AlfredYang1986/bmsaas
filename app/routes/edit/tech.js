import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        // this.mock_data.sureTech();
        // this.get('logger').log(params.techid);
        // let tech = this.store.peekRecord('bmtech', params.techid);
        // if (tech == null && params.techid != 'tech/push') {
        //     this.transitionTo('home');
        // }

        let tech = null;
        if(params.techid != 'tech/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: 'BmTeacher',
            });
            let eqd = this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: params.techid
            })
            request.get('eqcond').pushObject(eqd);

            let json = this.get('pmController').get('Store').object2JsonApi(request);

            async function getTeacher(that) {
                return await that.get('pmController').get('Store').queryObject('/api/v1/findteacher/0', 'bm-teacher', json)
                    .then(data => {
                        that.get('logger').log(data);
                        return data;
                    })
                    .catch(data => {
                        that.get('logger').log(data);
                    })
            }
            tech = getTeacher(this)
        }

        return RSVP.hash({
                tech : tech
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
        this._super(controller, model);
        if (model.tech != null) {
            controller.set('tech_name', model.tech.get('name'));
            controller.set('tech_nickname', model.tech.get('nickname'));
            controller.set('tech_gender', model.tech.get('gender'));
            // controller.set('tech_homeland', model.tech.get('homeland'));
            controller.set('tech_dob', model.tech.get('dob'));
            controller.set('tech_contact', model.tech.get('contact'));
            controller.set('tech_wechat', model.tech.get('wechat'));
            controller.set('tech_address', model.tech.get('address'));
            controller.set('tech_nativePlace', model.tech.get('nativePlace'));
            controller.set('tech_date', model.tech.get('dob'));

            controller.set('isPushing', false);
        } else {
            controller.set('tech_name', '');
            controller.set('tech_nickname', '');
            controller.set('tech_gender', '');
            // controller.set('tech_homeland', '');
            controller.set('tech_dob', '');
            controller.set('tech_contact', '');
            controller.set('tech_wechat', '');
            controller.set('tech_address', '');
            controller.set('tech_nativePlace', '');
            controller.set('tech_date');

            controller.set('isPushing', true);
        }
    }
});
