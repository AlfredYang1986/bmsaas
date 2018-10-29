import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.classes', idx);
        },
        createClass() {
            this.transitionToRoute('edit.classes')
        }
    }
});
