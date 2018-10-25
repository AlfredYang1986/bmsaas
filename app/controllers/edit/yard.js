import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        saveChanges() {
            this.transitionToRoute('detail.yard')
        }
    }
});
