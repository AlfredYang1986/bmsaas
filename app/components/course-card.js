import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['course'],
    hasSetCourse: computed(function(){
        return this.course != null;
    }),
    cover: computed(function(){
        let tmp = this.course.get('imgs');
        if (tmp.length > 0) {
            return tmp.objectAt(0).get('img_src');
        } else {
            return '/images/cover_pic_2.jpeg';
        }
    }),
    click() {
        this.onCourseCardClicked(this.course.get('id'));
    }
});
