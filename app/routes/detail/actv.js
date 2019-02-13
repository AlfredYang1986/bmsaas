import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        var tmp = this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(res => {
            return new Promise(function(resolve, reject) {
                if (res.length == 0) {
                    resolve(null)
                } else {
                    resolve(res.firstObject)
                }
            }) 
        })
        let actv = this.store.findRecord('reservableitem', params.actvid);
        return RSVP.hash({
            yard: tmp,
            actv: actv,
            tabs: A(['场次安排', '活动详情']),
            titles: A(["时间段","校区","人数","", "操作"]),
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
        this.controller.set('cur_yard_id', model.yard.get("id"));
        this.controller.set('cur_rooms', this.store.query("room", {"brand-id": localStorage.getItem("brandid")}));
    }
});
