import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        // var si = this.store.findRecord('sessioninfo', params.courseid)
        return RSVP.hash({
            course: this.store.findRecord('reservableitem', params.courseid),
            // urls: A([
            //     {
            //         "pageName":"课程",
            //         "link":"course",
            //         "id":"",
            //     },
            //     {
            //         "pageName":"课程详情",
            //         "link":"",
            //         "id":"",
            //     }
            // ]),
        })
    },

    // afterModel(model, transition) {
        
    // },

    setupController(controller, model) {
        this._super(controller, model);

        let urls = A([
            {
                "pageName":"课程",
                "link":"course",
                "id":"",
            },
            {
                "pageName": model.course.sessioninfo.get("title"),
                "link":"",
                "id":"",
            }
        ])
        this.controller.set("urls", urls)
    },
});
