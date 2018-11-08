import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureTech();
        debugger
        this.get('logger').log(params.techid);
        let tech = this.store.peekRecord('bmtech', params.techid);
        if (tech == null && params.techid != 'tech/push') {
            this.transitionTo('home');
        } 



        return RSVP.hash({
                tech : tech
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.tech != null) {
            controller.set('tech_name', model.tech.me.get('name'));
            controller.set('tech_nickname', model.tech.me.get('nickname'));
            controller.set('tech_gender', model.tech.me.get('gender'));
            controller.set('tech_homeland', model.tech.get('homeland'));
            controller.set('tech_contact', model.tech.me.get('contact'));
            controller.set('tech_wechat', model.tech.me.get('wechat'));
            controller.set('tech_address', model.tech.get('address'));
            
            controller.set('isPushing', false);
        } else {
            controller.set('tech_name', '');
            controller.set('tech_nickname', '');
            controller.set('tech_gender', '');
            controller.set('tech_homeland', '');
            controller.set('tech_contact', '');
            controller.set('tech_wechat', '');
            controller.set('tech_address', '');
          
            controller.set('isPushing', true);
        }
    }
});
