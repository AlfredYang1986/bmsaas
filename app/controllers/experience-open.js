import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.experience', idx);
        },
        editExperience() {
            this.transitionToRoute('edit.experience', 'experience/push');
        }
    }
});
