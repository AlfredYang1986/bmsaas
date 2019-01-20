import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        if (params.studid == "stud/push") {
            let stud = this.store.createRecord('student');
            let gard = this.store.createRecord('guardian');
            gard.save().then(stud.guardians.pushObject(gard)).catch()
            stud.guardians.pushObject(gard);

            let techs = this.store.findAll('teacher');
            return RSVP.hash({
                isPushing: true,
                stud: stud,
                gard: gard,
                techs: techs,
            })
        } else {
            let stud = this.store.find('student', params.studid);
            let techs = this.store.findAll('teacher');
            return RSVP.hash({
                isPushing: false,
                stud: stud,
                gards: stud.guardians,
                techs: techs,
            })
        }
    },
    setupController(controller, model) {
        this._super(controller, model);
        if (model.stud.gender == 0) {
            controller.set("sex_idx", 1);
        } else if (model.stud.gender == 1) {
            controller.set("sex_idx", 0);
        } else {
            controller.set("sex_idx", 2);
        }
    }
});
