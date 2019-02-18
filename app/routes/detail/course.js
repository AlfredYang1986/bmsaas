import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            course: this.store.findRecord('sessioninfo', params.courseid),
            urls: A([
                {
                    "pageName":"课程",
                    "link":"exp",
                    "id":"",
                },
                {
                    "pageName":"课程详情",
                    "link":"",
                    "id":"",
                }
            ]),
        })
    },
});
