import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_login_service: service(),
    bm_token: service(),
    errorInfo: false,
    account: '',
    password: '',
    actions: {
        accountLogin() {
            let that = this
            this.bm_login_service.accountLogin(this.account, this.password).then(res => {
                that.bm_token.resetData(res['token'], res['brand-id'])
                that.set('errorInfo', false);
                // return that.store.find('brands', that.bm_token.brandId) // TODO: 缓存机制
                that.transitionToRoute('inbox');
            }).catch(err => {
                // TODO: 错误处理    
                window.console.log(err);
            })
        }
    },
});
