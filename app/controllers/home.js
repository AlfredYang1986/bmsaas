import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
// import { A } from '@ember/array'

export default Controller.extend({
    cur_idx: 0,
    // tempHonorImgs: A(),
    // tempCertImgs: A(),
    bmOss: service(),
    logoPath: computed(function(){
        let client = this.bmOss.get('ossClient');

        let url = client.signatureUrl(this.model.brand.logo);
        return url;
    })
});
