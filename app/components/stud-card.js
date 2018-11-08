import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  positionalParams: ['stud', 'canChecked'],
  canChecked: false,
  checked: false,
  isFemale: computed('stud', function() {
    return this.stud.Person.get('gender') == 0;
  }),
  click() {
    if (this.canChecked) {
      if (this.checked) {
        this.set('checked', false);
      } else {
        this.set('checked', true);
      }

      this.onStudCardClicked(this.stud.Person.get('id'), this.checked);
    } else {
      this.onStudCardClicked(this.stud.Person.get('id'));
    }
    // this.onStudCardClicked(this.stud.get('id'));
  },
  classNameBindings: [
    'checked:selected_tech',
  ],
});
