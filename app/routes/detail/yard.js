import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        var tmp = this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(res => {
            // return new Promise(function(resolve, reject) {
            //     if (res.length == 0) {
            //         resolve(null)
            //     } else {
            //         resolve(res.firstObject)
            //     }
            // })
            if(res.length > 0) {
                return res.firstObject;
            } else {
                return null;
            }
        })
        return RSVP.hash({
            yard: tmp,
            tabs: A(['校区信息', '教室/场地']),
            titles: A(["教室名称","使用类型",""]),
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('tempYardImgs', model.yard.images.filter(async item => {return item.flag === 0}));
        controller.set('tempCertImgs', model.yard.images.filter((item) => {return item.flag === 2}));
    },
});
