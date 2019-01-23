import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        debugger
        if (params.studid == "stud/push") {
            let onSuccess = function() {
                stud.guardians.pushObject(gard)
            }
            let stud = this.store.createRecord('student', {"brandId": localStorage.getItem("brandid")});
            let gard = this.store.createRecord('guardian', {"brandId": localStorage.getItem("brandid")});
            gard.save().then(onSuccess).catch()
            // stud.guardians.pushObject(gard);

            let techs = this.store.query('teacher', {"brand-id": localStorage.getItem("brandid")});
            return RSVP.hash({
                isPushing: true,
                stud: stud,
                gards: stud.guardians,
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
            let stud = this.store.find('student', params.studid);
            let techs = this.store.query('teacher', {"brand-id": localStorage.getItem("brandid")});
            return RSVP.hash({
                isPushing: false,
                stud: stud,
                gards: stud.guardians,
                techs: techs,
                // tech: tech,
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
        } else if (model.stud.gender == 1) {
            controller.set("sex_idx", 0);
        } else {
            controller.set("sex_idx", 2);
        }
    }
});
