import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    bm_brand_service: service(),
    bmOss: service(),
    logoPath: computed(function(){
        let client = this.bmOss.get('ossClient');

        let url = client.signatureUrl(this.bm_brand_service.brand.logo);
        return url;
    })
});
