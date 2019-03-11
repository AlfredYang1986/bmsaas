import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    bm_login_service: service(),
    bm_token: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
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
                that.toast.success('', '登陆成功', that.toastOptions);
                that.transitionToRoute('inbox');
            }).catch(err => {
                // TODO: 错误处理  
                that.toast.error('', err, that.toastOptions);
            })
        }
    },
});
