import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({

    init() {
        this._super(...arguments);
        this.bm_yard_service.queryLocalMultiObject();
    },

    bm_actv_service: service(),
    bm_sessionable_service: service(),
    bm_yard_service: service(),

    model(params) {
        this.bm_actv_service.set('actvid', params.actvid);
        this.bm_sessionable_service.set('reservableid', params.actvid);
        return RSVP.hash({
                expid: params.actvid,
                tabs: A(['场次安排', '体验详情']),
                titles: A(["场次号","时间段","校区","", "操作"]),
                urls: A([
                    {
                        "pageName":"活动",
                        "link":"actv",
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
        this.bm_actv_service.set('refresh_token', this.bm_actv_service.guid());
        this.bm_sessionable_service.set('refresh_all_token', this.bm_sessionable_service.guid());
    },
});
