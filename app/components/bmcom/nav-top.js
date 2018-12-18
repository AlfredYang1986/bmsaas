import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
    bm_brand_service: service(),
    bmOss: service(),
    brandlogo: computed(function(){
        let client = this.bmOss.get('ossClient');
        return  client.signatureUrl(this.bm_brand_service.brand.logo);
    }),
    // didInsertElement() {
    //     // this._super(...arguments);
    //     this.onExitSystem(this);
    // },
    actions: {
        exitSystem() {
            this.sendAction('onExitSystem');
        },
    }
});
