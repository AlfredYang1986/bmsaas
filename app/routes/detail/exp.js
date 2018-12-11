import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({

    init() {
        this._super(...arguments);
        this.bm_yard_service.queryLocalMultiObject();
    },

    bm_exp_service: service(),
    bm_sessionable_service: service(),
    bm_yard_service: service(),

    model(params) {
        this.bm_exp_service.set('expid', params.expid);
        this.bm_sessionable_service.set('reservableid', params.expid);
        return RSVP.hash({
                expid: params.expid,
                tabs: A(['场次安排', '体验详情']),
                titles: A(["场次号","时间段","校区","人数","", "操作"]),
                urls: A([
                    {
                        "pageName":"体验课开放",
                        "link":"exp",
                        "id":"",
                    },
                    {
                        "pageName":"场次安排",
                        "link":"",
                        "id":"",
                    }
                ]),
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_exp_service.set('refresh_token', this.bm_exp_service.guid());
        this.bm_sessionable_service.set('refresh_all_token', this.bm_sessionable_service.guid());
    },
});
