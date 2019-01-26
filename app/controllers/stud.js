import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    // studs: computed(function() {
    //     debugger
    //     return this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
    // }),
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
            this.set("studs", this.store.query('student', { 'page[number]': target_page, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")}))
        },
    },
});
