import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    bm_login_service: service(),
    bm_brand_service: service(),
    errorInfo: false,
    actions: {
        accountLogin() {
            let that = this
            let callback = {
                onSuccess: function(res) {
                    if(res.data.attributes.account != '' && res.data.attributes.brandId != '') {
                        localStorage.setItem('brandid', res.data.attributes.brandId);
                        that.bm_brand_service.set('brandid', res.data.attributes.brandId);
                        that.get('cookie').write('token', res.data.attributes.token, { path: '/' });
                        that.set('errorInfo', false);
                        that.transitionToRoute('inbox');
                    } else {
                        that.set('errorInfo', true);
                    }
                },
                onFail: function(err) {
                    debug('error: ' + err);
                }
            }
            this.bm_login_service.accountLogin(callback);
        }
    }
});
