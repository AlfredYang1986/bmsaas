import Controller from '@ember/controller';

export default Controller.extend({
    bm_session_service: service(),
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
