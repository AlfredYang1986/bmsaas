import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    params: null,

    model(params) {
        this.set("params", params)
        return RSVP.hash({
                actvfieldid: params.actvfieldid,
                reactvid: params.reactvid,
                class: this.store.find('class', params.actvfieldid),
                actv: this.store.find('reservableitem', params.reactvid),
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        // this.controller.set('cur_yard_id', model.yard.get("id"));
        this.controller.set('cur_rooms', this.store.query("room", {"brand-id": localStorage.getItem("brandid")}));
        let urls = A([
            {
                "pageName":"活动",
                "link":"actv",
                "id":"",
            },
            {
                "pageName":model.actv.sessioninfo.get("title"),
                "link":"detail.actv",
                "id": this.params.reactvid,
            },
            {
                "pageName":"场次详情",
                "link":"",
                "id":"",
            }
        ])
        this.controller.set("urls", urls)
    }
});
