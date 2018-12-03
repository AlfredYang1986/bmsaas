import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['stud', 'canChecked'],
	canChecked: false,
	checked: false,
	isFemale: computed('stud', function() {
		return this.stud.gentder == 0
	}),
	click() {
		if (this.canChecked) {
			if (this.checked) {
				this.set('checked', false);
			} else {
				this.set('checked', true);
			}

			this.onStudCardClicked(this.stud.id, this.checked);
		} else {
			this.onStudCardClicked(this.stud.id);
		}
	},
	classNameBindings: [
		'checked:selected_tech',
	],
});
