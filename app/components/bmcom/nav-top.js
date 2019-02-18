import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
    // bm_brand_service: service(),
    bmOss: service(),
    store: service(),
    logo: '',
    title: '',
    didRender() {
        let that = this;
        let client = this.bmOss.get('ossClient');
        let onSuccess = function(res) {
            let logoImage = client.signatureUrl(res.get('logo'));
            that.set('logo', logoImage);
            that.set('title', res.get('title'));
        }
        let onFail = function() {}
        let tmp = this.store.findRecord('brand', localStorage.getItem("brandid")).then(onSuccess, onFail);
    },

    actions: {
        exitSystem() {
            this.sendAction('onExitSystem');
        },
    }
});
