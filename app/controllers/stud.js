import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_stud_service: service(),
    actions: {
        cardClicked(idx) {
            this.get('logger').log(idx);
            this.transitionToRoute('detail.stud', idx);
        },
        addStudClicked() {
            this.transitionToRoute('edit.stud', "stud/push");
        }
    },
});
