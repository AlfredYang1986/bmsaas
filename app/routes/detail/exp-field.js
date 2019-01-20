import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    // bm_sessionable_service: service(),

    model(params) {
        // this.bm_sessionable_service.set('reservableid', params.reexpid);
        // this.bm_sessionable_service.set('sessionableid', params.expfieldid);
        return RSVP.hash({
                expfieldid: params.expfieldid,
                reexpid: params.reexpid,
                class: this.store.find('class', params.expfieldid),
                exp: this.store.find('reservableitem', params.reexpid),
                // studs: this.store.query('student', {"classId" : params.expfieldid}),
                // tabs: A(['场次安排', '体验详情']),
                urls: A([
                    {
                        "pageName":"体验课开放",
                        "link":"exp",
                        "id":"",
                    },
                    {
                        "pageName":"场次安排",
                        "link":"detail.exp",
                        "id":params.reexpid,
                    },
                    {
                        "pageName":"场次详情",
                        "link":"",
                        "id":"",
                    }
                ]),
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        // this.bm_sessionable_service.set('refresh_token', this.bm_sessionable_service.guid());
    },
});
