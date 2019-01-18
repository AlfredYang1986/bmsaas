import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['exp'],
    bmOss: service(),
    cover: computed('exp', function(){
        let client = this.bmOss.get('ossClient');

        let c = this.exp.sessioninfo.get('cover')
        if (c !== undefined && c != '') {
            let url = client.signatureUrl(c)
            return url;
        } else {
            return '';
        }
    }),
    click() {
        this.onCourseCardClicked(this.exp.id);
    }
});
