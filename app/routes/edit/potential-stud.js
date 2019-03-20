import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        let onSuccess = function() {
            stud.guardians.pushObject(gard)
        }
        let stud = this.store.createRecord('student', {"brandId": localStorage.getItem("brandid")});
        let gard = this.store.createRecord('guardian', {"brandId": localStorage.getItem("brandid")});
        gard.save().then(onSuccess).catch()

        return RSVP.hash({
            stud: stud,
            gards: stud.guardians,
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
    }
});
