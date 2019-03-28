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
        let total_discount = 0;
        model.trans.attachables.forEach(elem => {
            total_discount += elem.preferentialPrice;
        });
        this.controller.set('total_discount', total_discount);
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
        let attTitle = ['购买项目', '定价', '数量', '优惠金额', '签约价格'];
        this.controller.set("attTitle", attTitle)
    }
});
