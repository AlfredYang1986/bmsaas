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
                reject()
            })
        })
        return RSVP.hash({
            yard: tmp,
            exp: this.store.find('reservableitem', params.expid),
            tabs: A(['场次安排', '体验课详情']),
            titles: A(["时间段","场地/教室","人数","", "操作"]),
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.controller.set('cur_yard_id', model.yard.get("id"));
        this.controller.set('cur_rooms', this.store.query("room", {"brand-id": localStorage.getItem("brandid")}));
        let urls = A([
            {
                "pageName":"体验课",
                "link":"exp",
                "id":"",
            },
            {
                "pageName": model.exp.sessioninfo.get("title"),
                "link":"",
                "id":"",
            }
        ])
        this.controller.set("urls", urls)
    }
});
