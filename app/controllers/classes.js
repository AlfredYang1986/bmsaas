import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            // this.transitionToRoute('edit.stud');
            this.transitionToRoute('detail.classes');
        },
        createClass() {
            this.transitionToRoute('edit.classes')
        }
    }
});
