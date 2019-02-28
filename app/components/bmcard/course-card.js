import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['course'],
    bmOss: service(),
    cover: computed('course', function(){
        let client = this.bmOss.get('ossClient');
        
        let c = this.course.sessioninfo.get('cover')
        if (c !== undefined && c != '') {
            let url = client.signatureUrl(c)
            return url;
        } else {
            return '';
        }
    }),
    click() {
        this.onCourseCardClicked(this.course.id);
    }
});
