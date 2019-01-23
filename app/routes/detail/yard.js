import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        return RSVP.hash({
            // yardid: yardid,
            yard: this.store.query('yard', {"brand-id": localStorage.getItem("brandid")}).then(data => {
                return data.objectAt(0)
            }),
            tabs: A(['校区信息', '教室/场地']),
            titles: A(["教室名称","使用类型",""]),
        })
    },
});
