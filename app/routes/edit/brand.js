import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        // let brand = null;
        var tmp = this.store.find('brand', localStorage.getItem("brandid")).then(data => {
            return new Promise(function(resolve, reject) {
                resolve(data)
            }) 
        })
        return RSVP.hash({
            brand: tmp
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('cur_idx', 0);
        controller.set('tempHonorImgs', model.brand.images.filter((item) => {return item.flag === 1}));
        controller.set('tempCertImgs', model.brand.images.filter((item) => {return item.flag === 2}));
    },
});
