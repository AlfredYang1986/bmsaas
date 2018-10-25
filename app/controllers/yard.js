import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.yard');
        },
        addYard() {
            this.transitionToRoute('edit.yard')
        }
    }
});
