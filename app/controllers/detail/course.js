import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        editCourse() {
            this.transitionToRoute('edit.course');
        }
    }
});
