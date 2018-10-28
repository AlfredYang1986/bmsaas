import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        addSession() {
            this.transitionToRoute('edit.session');
        },
        viewExperDetail() {
            console.log(111)
            this.transitionToRoute('detail.experience-detail')
        }
    }
});
