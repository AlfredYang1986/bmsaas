import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            yard: this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}),
            exp: this.store.findRecord('reservableitem', params.expid),
            tabs: A(['场次安排', '体验课详情']),
            titles: A(["时间段","校区","人数","", "操作"]),
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
});
