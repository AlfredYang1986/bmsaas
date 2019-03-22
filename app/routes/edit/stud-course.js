import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            courseTitle: [' ', '课程名称', '课程类型', '适应年龄', '标准课时数', '课程定价'],
            courseList: this.store.query('reservableitem', { 'status': 2, "brand-id": localStorage.getItem("brandid")})
        })
    },
    setupController(controller, model) {
        this._super(controller, model);

        controller.set('cur_page_idx', 0);
        controller.set('inputVal', false);
    }
});
