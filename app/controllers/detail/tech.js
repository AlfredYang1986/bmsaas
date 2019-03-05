import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    cur_idx: 0,
    urls: null,
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',

    bmOss: service(),

    iconImg: computed('model.tech', function(){
        let client = this.bmOss.get('ossClient');
        if(this.model.tech.icon == undefined || this.model.tech.icon == '') {
            return this.headImg;
        } else {
            return client.signatureUrl(this.model.tech.icon);
        }
    }),
});
