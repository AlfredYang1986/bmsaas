import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_stud_service: service(),
    actions: {
        cardClicked(idx) {
            // this.get('debug').log(idx);
            this.transitionToRoute('detail.stud', idx);
        },
        addStudClicked() {
            this.transitionToRoute('edit.stud', "stud/push");
        },
        handlePageChange (pageNum) {
            this.set('bm_stud_service.page', pageNum - 1)
            this.bm_stud_service.queryMultiObjects();
        },
    },
});
