import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.yard', idx);
        },
        addYard() {
            this.transitionToRoute('edit.yard')
        }
    }
});
