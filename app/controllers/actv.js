import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.actv', idx);
        },
        addCourse() {
            // this.transitionToRoute('edit.course');
        }
    }
});
