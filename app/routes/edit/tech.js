import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        if (params.techid == "tech/push") {
            return RSVP.hash({
                isPushing: true,
                tech: this.store.createRecord('teacher', {"brandId": localStorage.getItem("brandid")}),
            })
        } else {
            return RSVP.hash({
                isPushing: false,
                tech: this.store.find('teacher', params.techid),
            })
        }
    },
    setupController(controller, model) {
        this._super(controller, model);
        if(model.isPushing) {
            controller.set("sex_idx", 0);
            controller.set('jobTypeIdx', 0);
        } else {
            if (model.tech.gender == 0) {
                controller.set("sex_idx", 1);
            } else {
                controller.set("sex_idx", 0);
            }
            if (model.tech.jobType == 0) {
                controller.set('jobTypeIdx', 1)
            } else {
                controller.set('jobTypeIdx', 0)
            }
        }
    }
});
