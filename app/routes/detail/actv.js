import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        let actv = this.store.findRecord('reservableitem', params.actvid);
        return RSVP.hash({
            yard: this.store.findRecord('yard', {"brand-id": localStorage.getItem("brandid")}),
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
});
