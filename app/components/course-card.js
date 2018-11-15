import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['course'],
    bmOss: service(),
    cover: computed('course', function(){
        let client = this.bmOss.get('ossClient');
        
        let url = client.signatureUrl(this.course.get('cover'));
        return url;
    }),
    click() {
        this.onCourseCardClicked(this.course.get('id'));
    }
});
