import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.course', idx);
        },
        openReserve() {
            this.transitionToRoute('edit.course-reserve');
        }
    }
});
