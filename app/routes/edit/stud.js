import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        if (params.studid == "stud/push") {
            return RSVP.hash({
                isPushing: true,
                stud: this.store.createRecord('student'),
            })
        } else {
            return RSVP.hash({
                isPushing: false,
                stud: this.store.find('student', params.studid),
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
