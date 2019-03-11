import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_error_service: service(),
    pagenum: 1,
    refreshFlag: false,

    studs: computed("refreshFlag", function() {
        // return this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
        let result;
        result = this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")});
        result.then(() => {
        }, error => {
            this.bm_error_service.handleError(error)
        })
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
            // let that = this;
            this.set('pagenum', target_page)
            this.store.query('student', { 'page[number]': target_page, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")}).then((res) => {
                this.set('studs', res)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        },
    },
});
