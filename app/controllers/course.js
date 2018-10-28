import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            debugger
            this.transitionToRoute('detail.course', idx);
        },
        addCourse() {
            this.transitionToRoute('edit.course');
        }
    }
});
