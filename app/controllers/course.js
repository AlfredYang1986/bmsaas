import Controller from '@ember/controller';

export default Controller.extend({
    openFlag: true,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.course', idx);
        },
        addCourse() {
            this.transitionToRoute('edit.course');
        }
    }
});
