import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    pagenum: 1,
    store: service(),
    studs: computed("refreshFlag", 'type', function() {
        let result;
        if(this.type == 'searchName') {
            result = this.store.query('student', {'page[number]': 1, 'page[size]': 20, 'contact': this.searchContent});
            result.then(() => {
                let page = Number.parseInt(localStorage.getItem('students'));
    			this.onRefreshDataComplete(page)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        } else {
            result = this.store.query('student', { 'page[number]': 1, 'page[size]': 20, 'status': 0, "brand-id": localStorage.getItem("brandid")});
            result.then(() => {
    			let page = Number.parseInt(localStorage.getItem('students'));
    			this.onRefreshDataComplete(page)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        }
        return result;
    }),
    actions: {
        handlePageChange(target_page) {
            this.set('pagenum', target_page)
            this.store.query('student', { 'page[number]': target_page, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")}).then((res) => {
                this.set('studs', res)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        }
    }
});
