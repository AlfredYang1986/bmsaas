import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        addSession() {
            this.transitionToRoute('edit.session');
        }
    }
});
