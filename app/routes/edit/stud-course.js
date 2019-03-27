import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        return RSVP.hash({
            courseTitle: [' ', '课程名称', '课程类型', '适应年龄', '标准课时数', '课程定价'],
            courseTItlePage: ['课程名称', '适应年龄', '标准课时数', '课程定价', '操作'],
            courseList: this.store.query('reservableitem', { 'status': 2, "brand-id": localStorage.getItem("brandid")}),
            courseTitleOrder: ['课程名称', '适应年龄', '标准课时数', '课程定价', '优惠价格', '签约价格'],
            payment: A([{name: '微信支付'}, {name: '支付宝'}, {name: '现金'}]),
            techs: this.store.query('teacher', { "brand-id": localStorage.getItem("brandid")}),
            attachable: this.store.createRecord('attachable'),
            transaction: this.store.createRecord('transaction')
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        debugger
        controller.set('cur_page_idx', 0);
        controller.set('inputVal', false);
        controller.set('curItems', null);
    }
});
