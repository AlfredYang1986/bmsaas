import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['course'],
    hasSetCourse: computed(function(){
        return this.course != null;
    }),
    click() {
        this.onCourseCardClicked(this.course.id);
    }
});
