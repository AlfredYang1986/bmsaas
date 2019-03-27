import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_error_service: service(),
    pagenum: 1,
    refreshFlag: false,

    trans: computed('pagenum', "refreshFlag", function() {
        let result;
        result = this.store.query('transaction', { 'page[number]': this.pagenum, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")});
        result.then(() => {
        }, error => {
            this.bm_error_service.handleError(error)
        })
        return result;
    }),

    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('transactions'));
    }),

    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.order', idx);
        },
        handlePageChange(target_page) {
            this.set('pagenum', target_page)
        },
    },
});
