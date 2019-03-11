import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
                tech: this.store.find('teacher', params.techid),
                tabs: A(['教师信息']),
                urls: A([
                    {
                        "pageName":"教师",
                        "link":"tech",
                        "id":"",
                    },
                    {
                        "pageName":"教师信息",
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
                "pageName":"教师",
                "link":"tech",
                "id":"",
            },
            {
                "pageName":model.tech.get("name"),
                "link":"",
                "id":"",
            }
        ])
        this.controller.set("urls", urls)
    },
});
