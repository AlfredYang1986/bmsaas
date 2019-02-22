import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    exp: computed(function() {
        return this.store.query('reservableitem', { 'page[number]': 1, 'page[size]': 16, 'status': 1, "brand-id": localStorage.getItem("brandid")});
    }),
    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('reservableitems'));
    }),
    pagenum: 1,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.exp', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        },
        handlePageChange(page_num) {
            let that = this;
            this.set('pagenum', page_num)
            this.store.query('reservableitem', { 'page[number]': page_num, 'page[size]': 16, 'status': 1, "brand-id": localStorage.getItem("brandid")}).then((res) => {
                that.set('exp', res)
            })
        }
    }
});
