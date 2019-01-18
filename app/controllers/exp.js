import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.exp', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        }
    }
});
