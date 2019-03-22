import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_error_service: service(),
    pagenum: 1,
    refreshFlag: false,

    studs: computed('pagenum', "refreshFlag", function() {
        let result;
        if(this.type == 'searchName') {
            result = this.store.query('student', {'page[number]': this.pagenum, 'page[size]': 20, 'status': 1, 'contact': this.contact});
            result.then(() => {
                // let page = Number.parseInt(localStorage.getItem('students'));
                // this.onRefreshDataComplete(page)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        } else {
            result = this.store.query('student', { 'page[number]': this.pagenum, 'page[size]': 20, 'status': 1, "brand-id": localStorage.getItem("brandid")});
            result.then(() => {
                // let page = Number.parseInt(localStorage.getItem('students'));
                // this.onRefreshDataComplete(page)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        }
        return result;
    }),
    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('students'));
    }),
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.stud', idx);
        },
        addStudClicked() {
            this.transitionToRoute('edit.stud', "stud/push");
        },
        handlePageChange(target_page) {
            this.set('pagenum', target_page)
        },
        searchStud() {
            this.set('type', 'searchName')
            this.toggleProperty('refreshFlag')
        },
    },
});
