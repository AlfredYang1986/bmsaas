import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({

    model(params) {
        return RSVP.hash({
            trans: this.store.find('transaction', params.orderid),
        })
    },
    
    setupController(controller, model) {
        this._super(controller, model);
        let urls = A([
            {
                "pageName":"订单管理",
                "link":"order",
                "id":"",
            },
            {
                "pageName":"订单详情",
                "link":"",
                "id":"",
            }
        ])
        this.controller.set("urls", urls)
    }
});
