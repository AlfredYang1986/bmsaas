import Controller from '@ember/controller';

export default Controller.extend({
    sessionArrange: true,
    activityDetail: false,
    actions: {
        addSession() {
            this.transitionToRoute('edit.session');
        },
        viewExperDetail() {
            this.transitionToRoute('detail.experience-detail')
        },
        sessionArrange() {
            this.set('sessionArrange', true);
            this.set('activityDetail', false);
        },
        activityDetail() {
            this.set('sessionArrange', false);
            this.set('activityDetail', true);
        }
    }
});
