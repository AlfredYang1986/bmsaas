import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            stud: this.store.find('student', params.studid),
            tabs: A(['学生详情']),
            urls: A([
                {
                    "pageName":"学生管理",
                    "link":"stud",
                    "id":"",
                },
                {
                    "pageName":"学生详情",
                    "link":"",
                    "id":"",
                }
            ]),
        })
    },
    setupController(controller, model) {
        this._super(controller, model);

        let urls = A([
            {
                "pageName":"学生管理",
                "link":"stud",
                "id":"",
            },
            {
                "pageName":model.stud.get("name"),
                "link":"",
                "id":"",
            }
        ])
        this.controller.set("urls", urls)
    },
});
