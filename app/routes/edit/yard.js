import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    bm_yard_service: service(),

    model(params) {
        this.mock_data.regionSource();
        this.bm_yard_service.set('yardid', params.yardid);
        return RSVP.hash({
                yardid: params.yardid,
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        controller.set('yard_provinces', this.store.peekAll('bmprovinces'));
        controller.set('yard_citys', this.store.peekAll('bmcitys'));
        controller.set('yard_government_areas', this.store.peekAll('bmgovernment-areas'));

        if (model.yardid == 'yard/push') {
            controller.set('isPushing', true);
        } else {
            controller.set('isPushing', false);
        }
        this.controller.set('current_idx', 0);
        this.bm_yard_service.set('refresh_token', this.bm_yard_service.guid());
    },
});
