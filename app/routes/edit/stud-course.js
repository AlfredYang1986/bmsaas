import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        let onSuccess = function() {
            stud.guardians.pushObject(gard)
        }
        let stud = this.store.createRecord('student', {"brandId": localStorage.getItem("brandid")});
        let gard = this.store.createRecord('guardian', {"brandId": localStorage.getItem("brandid")});
        gard.save().then(onSuccess).catch()
        return RSVP.hash({
            stud: stud,
            gards: stud.guardians,
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
        controller.set('showAddStud', false);
        controller.set('inputVal', false);
        controller.set('studList', false);
        if (model.stud.gender == 0) {
            controller.set("sex_idx", 1);
        } else {
            controller.set("sex_idx", 0);
        }
        if(model.stud.guardians.length > 0) {
            if(model.stud.guardians.firstObject.relationShip == '妈妈') {
                controller.set("rela_idx", 1);
            } else if(model.stud.guardians.firstObject.relationShip == '其他') {
                controller.set("rela_idx", 2);
            } else {
                controller.set("rela_idx", 0);
            }
        } else {
            controller.set("rela_idx", 0);
        }
        if(model.stud.dob == 0) {
            let now = new Date().getTime();
            model.stud.set('dob', now);
        }
        this.get("controller").set('cur_page_idx', 0);
        this.get("controller").set('inputVal', false);
        this.get("controller").set('curItems', null);
        this.get("controller").set('contact', undefined);
        this.get("controller").set('studList', false);
        model.courseList.forEach(item => {
            item.set('state', 0);
        })
        this.get("controller").set('totalpp', 0);
        this.get('controller').set('moneyReceived', undefined);
        this.get('controller').set('teacherId', undefined);
    }
});
