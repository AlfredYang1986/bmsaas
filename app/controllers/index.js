import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    bm_login_service: service(),
    // bm_brand_service: service(),
    errorInfo: false,
    actions: {
        accountLogin() {
            let that = this
            let callback = {
                onSuccess: function(res) {
                    if(res.status == "ok") {
                        localStorage.setItem('brandid', res.result["brand-id"]);
                        // that.bm_brand_service.set('brandid', res.data.attributes.brandId);
                        // document.cookie.write('token', res.token, { path: '/' });
                        document.cookie="token="+res.result.token;
                        that.setCookie("token",res.result.token,365*24)
                        // that.bm_brand_service.set('refresh_token', that.bm_brand_service.guid());
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
    },
    setCookie(name,value,hours) {
        let expires = "";
        if (hours) {
            let date = new Date();
            date.setTime(date.getTime()+(hours*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }else{
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }
});
