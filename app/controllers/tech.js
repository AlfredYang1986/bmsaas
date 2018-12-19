import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_tech_service: service(),
    openFlag: true,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.tech', idx);
        },
        addTech() {
            this.transitionToRoute('edit.tech',"tech/push")
        }
    },
});
