import Controller from '@ember/controller';
import EmberObject from '@ember/object';

export default Controller.extend({
    init() {
        this._super(...arguments);

    },
    actions: {
        cardClicked(idx) {
            this.get('logger').log(idx);
            this.transitionToRoute('detail.stud', idx);
        },
        addStudClicked() {
            this.transitionToRoute('edit.stud', "stud/push");
        }
    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
