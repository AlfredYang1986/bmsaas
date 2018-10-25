import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.tech');
        },
        addTech() {
            this.transitionToRoute('edit.tech')
        }
    }
});
