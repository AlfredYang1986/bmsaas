import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            studTitle: ['学生姓名', '手机号', '状态', '操作'],
        })
    },

    activate() {
        if(this.get("controller") != undefined) {
            this.get("controller").toggleProperty("refreshFlag")
        }
    }
});
