import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    sessionArrange: true,
    activityDetail: false,
    actions: {
        addSession() {
            this.transitionToRoute('edit.session', this.model.act.id);
        },
        viewExperDetail() {
            this.transitionToRoute('detail.experience-detail', this.model.act.id);
        },
        sessionArrange() {
            this.set('sessionArrange', true);
            this.set('activityDetail', false);
        },
        activityDetail() {
            this.set('sessionArrange', false);
            this.set('activityDetail', true);
        }
    },
});
