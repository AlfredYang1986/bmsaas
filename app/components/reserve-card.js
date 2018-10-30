import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['reserve'],
    hasSetCourse: computed(function(){
        return this.reserve != null;
    }),
    click() {
        this.onCourseCardClicked(this.reserve.get('id'));
    }
});
