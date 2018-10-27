import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['stud'],
    isFemale: computed('stud', function(){
        return this.stud.me.get('gender') == 0;
    }),
    isMale: computed('stud', function(){
        return this.stud.me.get('gender') == 1;
    }),
    click() {
        this.onStudCardClicked(this.stud.get('id'));
    }
});
