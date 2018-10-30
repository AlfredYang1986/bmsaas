import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureActivity();
        let cats = this.store.peekAll('bmcat');
        let act = this.store.peekRecord('bmactivityinfo', params.epid);
        if (act == null && params.epid != 'experience/push') {
            this.transitionTo('home');
        } 

        return RSVP.hash({
                act: act,
                cats
            })
    },

    setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        if (model.stud != null) {

            controller.set('act_cat', this.model.act.get('cat'));
            controller.set('act_name', this.model.act.get('name'));
            controller.set('act_alb', this.model.act.get('alb'));
            controller.set('act_aub', this.model.act.get('aub'));
            controller.set('act_length', this.model.act.get('length'));
            controller.set('act_des', this.model.act.get('description'));
            controller.set('act_planning', this.model.act.get('planning'));
            controller.set('act_content', this.model.act.get('content'));
            controller.set('act_gains', this.model.act.get('gains'));
            controller.set('act_cover', this.model.act.get('cover'));
            controller.set('act_imgs', this.model.act.get('imgs'));
            controller.set('act_offered', this.model.act.get('offered'));
            controller.set('act_needed', this.model.act.get('needed'));
            controller.set('act_notice', this.model.act.get('notice'));

            controller.set('isPushing', false);
        } else {
            controller.set('act_cat', '');
            controller.set('act_name', '');
            controller.set('act_alb', 0);
            controller.set('act_aub', 0);
            controller.set('act_length', 0);
            controller.set('act_des', '');
            controller.set('act_planning', '');
            controller.set('act_content', '');
            controller.set('act_gains', []);
            controller.set('act_cover', '');
            controller.set('act_imgs', []);
            controller.set('act_offered', []);
            controller.set('act_needed', []);
            controller.set('act_notice', '');

            controller.set('isPushing', true);
        }
    }

});
