import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            studs: this.store.query('student', { 'page[number]': 1, 'page[size]': 10, 'status': 0, "brand-id": localStorage.getItem("brandid")}),
            studTitle: ['姓名', '联系电话', '性别', '年龄', '家长称呼', '创建时间', '操作'],
        })
    },
    activate() {
        if(this.get("controller") != undefined) {
            this.get("controller").toggleProperty("refreshFlag")
        }
    }
});
