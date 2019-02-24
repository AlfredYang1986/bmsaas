import Controller from '@ember/controller';

export default Controller.extend({
    pagenum: 1,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.exp', idx);
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
