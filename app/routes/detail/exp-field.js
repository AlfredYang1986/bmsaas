import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    params: null,

    model(params) {
        this.set("params", params)
        return RSVP.hash({
                expfieldid: params.expfieldid,
                reexpid: params.reexpid,
                class: this.store.find('class', params.expfieldid),
                exp: this.store.find('reservableitem', params.reexpid),
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        // this.controller.set('cur_yard_id', model.yard.get("id"));
        this.controller.set('cur_rooms', this.store.query("room", {"brand-id": localStorage.getItem("brandid")}));
        let urls = A([
            {
                "pageName":"体验课开放",
                "link":"exp",
                "id":"",
            },
            {
                "pageName":model.exp.sessioninfo.get("title"),
                "link":"detail.exp",
                "id": this.params.reexpid,
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
