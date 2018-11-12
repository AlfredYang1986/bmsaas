import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    bm_yard_update_service: service(),

    model(params) {
        // this.mock_data.sureYard();
        // let yard = this.store.peekRecord('bmyard', params.yardid);
        // if (yard == null) {
        //     this.transitionTo('home');
        // }
        //
        this.bm_yard_update_service.set('yardid', params.yardid);
  
        return RSVP.hash({
            yardid: params.yardid,
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
        controller.set('yard_provinces', this.store.peekAll('bmprovinces'));
        controller.set('yard_citys', this.store.peekAll('bmcitys'));
        controller.set('yard_government_areas', this.store.peekAll('bmgovernment-areas'));

        if (model.yard != null) {
            controller.set('isPushing', false);
        } else {
            controller.set('isPushing', true);
        }
        // this.controller.set('current_idx', 0);
        this.bm_yard_update_service.set('refresh_token', this.bm_yard_update_service.guid());
    },
});
