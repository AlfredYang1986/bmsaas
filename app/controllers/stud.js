import Controller from '@ember/controller';
import EmberObject from '@ember/object';

export default Controller.extend({
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.stud', idx);
        },
        addStudClicked() {
            this.transitionToRoute('edit.stud', "stud/push");
        }
    }
});
