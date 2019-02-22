import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    openFlag: true,
    course: computed(function() {
        return this.store.query('sessioninfo', { 'page[number]': 1, 'page[size]': 16, 'status': 2, "brand-id": localStorage.getItem("brandid")});
    }),
    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('reservableitems'));
    }),
    pagenum: 1,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.course', idx);
        },
        addCourse() {
            this.transitionToRoute('edit.course');
        },
        handlePageChange(page_num) {
            let that = this;
            this.set('pagenum', page_num)
            this.store.query('sessioninfo', { 'page[number]': page_num, 'page[size]': 16, 'status': 2,  "brand-id": localStorage.getItem("brandid")}).then((res) => {
                that.set('course', res)
            })
        }
    }
});
