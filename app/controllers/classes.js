import Controller from '@ember/controller';

export default Controller.extend({
    openFlag: false,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.classes', idx);
        },
        createClass() {
            this.transitionToRoute('edit.classes')
        }
    }
});
