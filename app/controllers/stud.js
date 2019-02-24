import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    pagenum: 1,
    refreshFlag: false,

    studs: computed("refreshFlag", function() {
        return this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
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
            let that = this;
            this.set('pagenum', target_page)
            this.store.query('student', { 'page[number]': target_page, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")}).then((res) => {
                that.set('studs', res)
            })
        },
    },
});
