import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        saveCourse() {
            this.transitionToRoute('course');
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        }
    }
});
