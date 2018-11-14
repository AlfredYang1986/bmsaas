import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_actv_service: service(),
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.actv', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        }
    }
});
