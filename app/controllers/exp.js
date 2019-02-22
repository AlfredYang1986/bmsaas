import Controller from '@ember/controller';

export default Controller.extend({
    // exp: computed(function() {
    //     return this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
    // }),
    // page_count: computed(function(){
    //     return Number.parseInt(localStorage.getItem('students'));
    // }),
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.exp', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        },
        handlePageChange() {

        }
    }
});
