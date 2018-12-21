import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_yard_service: service(),
    openFlag: true,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.yard', idx);
        },
        addYard() {
            this.transitionToRoute('edit.yard')
        }
    }
});
