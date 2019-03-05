import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    bm_error_service: service(),
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
        let onFail = function(error) {
            that.bm_error_service.handleError(error)
        }
        
        let tempBrand = this.store.peekRecord('brand', localStorage.getItem("brandid"));
        if(tempBrand == null) {
            this.store.findRecord('brand', localStorage.getItem("brandid")).then(onSuccess, onFail);
        } else {
            let logoImage = client.signatureUrl(tempBrand.get('logo'));
            that.set('logo', logoImage);
            that.set('title', tempBrand.get('title'));
        }
    },

    actions: {
        exitSystem() {
            this.onExitSystem();
        },
    }
});
