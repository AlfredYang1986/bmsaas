import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        editExperience() {
            this.transitionToRoute('edit.experience')
        }
    }
});
