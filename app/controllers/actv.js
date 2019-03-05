import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_error_service: service(),
    actv: computed(function() {
        let result;
        result = this.store.query('reservableitem', { 'page[number]': 1, 'page[size]': 16, 'status': 0, "brand-id": localStorage.getItem("brandid")})
        result.then(() => {
        }, error => {
            this.bm_error_service.handleError(error)
        })
        return result;
    }),
    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('reservableitems'));
    }),
    pagenum: 1,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.actv', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        },
        handlePageChange(page_num) {
            this.set('pagenum', page_num)
        },
        refreshDataComplete(page_Count) {
            this.set('page_count', page_Count)
        }
    }
});
