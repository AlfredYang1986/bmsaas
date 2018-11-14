import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_exp_service: service(),
    actions: {
        cardClicked(idx) {
            // this.transitionToRoute('detail.course', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        }
    }
});
