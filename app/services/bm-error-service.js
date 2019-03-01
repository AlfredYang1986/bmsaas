import Service from '@ember/service';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

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

    handleError(errors) {
        debugger
        this.set("error", null)
        if(errors.length == 1) {
            this.set("error", errors.objectAt(0));
            window.console.log(this.error)
        }
    },
    toastError() {
        debugger
        if(this.error.status == 401) {
            this.toast.error('', '授权失败，请重新登录', this.toastOptions);
            this.bm_token.clearAllCache();
            this.get('router').transitionTo('index');
        }
    },
});
