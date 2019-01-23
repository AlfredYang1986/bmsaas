import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        var tmp = this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(res => {
            return new Promise(function(resolve, reject) {
                if (res.length == 0) {
                    resolve(null)
                } else {
                    resolve(res.firstObject)
                }
            }) 
        })
        return RSVP.hash({
            yard: tmp,
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('tempYardImgs', model.yard.images.filter((item) => {return item.flag === 0}));
        controller.set('tempCertImgs', model.yard.images.filter((item) => {return item.flag === 2}));
    },
});
