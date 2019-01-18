import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        let yardid = "5c4191588fb807574ac84659";
        return RSVP.hash({
            yard: this.store.findRecord('yard', yardid),
            tabs: A(['校区信息', '教室/场地']),
            titles: A(["教室名称","使用类型",""]),
        })
    },
});
