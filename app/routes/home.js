import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        return RSVP.hash({
            tabs: A(['品牌信息']),
            brand: this.store.findRecord('brand', localStorage.getItem("brandid"))
        })
    },
    // setupController(controller, model) {
    //     this._super(controller, model);
    //     controller.set('tempHonorImgs', model.brand.images.filter((item) => {return item.flag === 1}));
    //     controller.set('tempCertImgs', model.brand.images.filter((item) => {return item.flag === 2}));
    // },
});
