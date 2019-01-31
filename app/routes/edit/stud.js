import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        if (params.studid == "stud/push") {
            let stud = this.store.createRecord('student', {"brandId": localStorage.getItem("brandid")});
            let gards = this.store.createRecord('guardian', {"brandId": localStorage.getItem("brandid")});
            let techs = this.store.query('teacher', {"brand-id": localStorage.getItem("brandid")});
            stud.save().then((result) => {
                gards.save().then((res) => {
                    stud.guardians.pushObject(gards)
                })
            })
            return RSVP.hash({
                isPushing: true,
                stud: stud,
                gards: gards,
                techs: techs,
            })
        } else {
            // let that = this;
            // let tech = null;
            // let onSuccess = function() {
            //     if(stud.teacher) {
            //         tech = that.store.find('teacher', stud.teacher.id)
            //     } else {
            //         tech = that.store.createRecord('teacher')
            //     }
            // }
            let str = params.studid;
            let paramsArr = str.split(' ');
            let studid = paramsArr[0];
            let applyid = paramsArr[1];
            let stud = this.store.find('student', studid);
            let techs = this.store.query('teacher', {"brand-id": localStorage.getItem("brandid")});
            return RSVP.hash({
                isPushing: false,
                stud: stud,
                techs: techs,
                applyid: applyid
            })
        }
    },
    setupController(controller, model) {
        this._super(controller, model);
        if(model.stud.teacher) {
            controller.set("cur_tech_id", model.stud.teacher.get("id"));
        } else {
            controller.set("cur_tech_id", "");
        }
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
    }
});
