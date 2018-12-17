import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed} from '@ember/object';

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
                        that.transitionToRoute('home');
                    } else {
                        that.set('errorInfo', true);
                    }
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_login_service.accountLogin(callback);
        }
    }
});
