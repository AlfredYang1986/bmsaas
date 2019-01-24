import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({

    model(params) {
        return RSVP.hash({
                expfieldid: params.expfieldid,
                reexpid: params.reexpid,
                class: this.store.find('class', params.expfieldid),
                exp: this.store.find('reservableitem', params.reexpid),
                urls: A([
                    {
                        "pageName":"体验课开放",
                        "link":"exp",
                        "id":"",
                    },
                    {
                        "pageName":"场次安排",
                        "link":"detail.exp",
                        "id":params.reexpid,
                    },
                    {
                        "pageName":"场次详情",
                        "link":"",
                        "id":"",
                    }
                ]),
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
    },
});
