import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['exp'],
    bmOss: service(),
    cover: computed('exp', function(){
        let client = this.bmOss.get('ossClient');

        let url = client.signatureUrl(this.exp.SessionInfo.cover);
        // console.log(url);
        return url;
    }),
    click() {
        this.onCourseCardClicked(this.exp.id);
    }
});
