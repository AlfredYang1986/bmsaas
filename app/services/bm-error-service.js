import Service from '@ember/service';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import CustomError from '../adapters/error';

export default Service.extend({
    bm_token: service(),
    router: service(),
    toast: service(),

    error: null,
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    
    handleError(error, errorHint) {
        if (!(error instanceof CustomError)) {
            window.console.log(error);
            return;
        }
        this.set("error", null);
        this.logError(error);

        let status = Number(this.get("error.status"))
        if (400 <= status && 500 > status) {
            let tempHint = "";
            if(status == 401) {
                tempHint = ": 授权失败,请重新登录!";
                this.redirectToIndex()
            } else if(status == 404) {
                tempHint = ": 资源未找到!";
                this.redirectTo404()
            } else {
                this.redirectTo404()
            }
            
            if(errorHint != undefined) {
                this.toast.error('', errorHint, this.toastOptions);
            } else {
                this.toast.error('', '请求失败' + tempHint, this.toastOptions);
            }
            window.console.log(this.error);
        } else if (500 <= status && 600 >= status) {
            this.toast.error('', '服务器错误', this.toastOptions);
            window.console.log(this.error);
            this.redirectTo404()
        } else {
            this.toast.error('', '未知错误', this.toastOptions);
            window.console.log(this.error);
            this.redirectTo404()
        }
    },

    logError(error) {
        // if(error.length == 1) {
        this.set("error", error.errors.objectAt(0));
        window.console.log(this.error)
        // }
    },

    redirectToIndex() {
        this.bm_token.clearAllCache();
        this.get('router').transitionTo('index');
    },

    redirectTo404() {
        this.get('router').transitionTo('not-found');
    }

});
