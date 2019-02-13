import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    // bm_sessionable_service: service(),

    model(params) {
        // this.bm_sessionable_service.set('reservableid', params.reactvid);
        // this.bm_sessionable_service.set('sessionableid', params.actvfieldid);
        return RSVP.hash({
                actvfieldid: params.actvfieldid,
                reactvid: params.reactvid,
                class: this.store.find('class', params.actvfieldid),
                actv: this.store.find('reservableitem', params.reactvid),
                // tabs: A(['场次安排', '体验详情']),
                urls: A([
                    {
                        "pageName":"活动",
                        "link":"actv",
                        "id":"",
                    },
                    {
                        "pageName":"场次安排",
                        "link":"detail.actv",
                        "id":params.reactvid,
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
        // this.controller.set('cur_yard_id', model.yard.get("id"));
        this.controller.set('cur_rooms', this.store.query("room", {"brand-id": localStorage.getItem("brandid")}));
    }
});
