import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import rsvp from 'rsvp';
// import CustomError from './error';

export default Controller.extend({
    bm_token: service(),
    // bm_error_service: service(),
    
    actions: {
        exitSystem() {
            // let that = this;
            new rsvp.Promise((resolve) => {
                // this.get('cookies').clear('token', {path: '/'});
                // this.deleteCookie("token");
                // localStorage.clear();
                this.bm_token.clearAllCache();
                return resolve(true);
            }).then(() => {
                // window.location.reload();
                this.transitionToRoute('index');
            });
        },

        // error(error, transition) {
        //     debugger
        //     console.log(error)
            // debugger
            // if (error instanceof CustomError) {
            //     debugger
            //     window.console.log(error, transition);
            //     this.bm_error_service.handleError(error)
            //     this.bm_error_service.toastError()
            //     return;
            // }
      
            // ...other error handling logic
        // },
    },


    // deleteCookie(name) {
    //     this.setCookie(name,"",-1);
    // },
    // setCookie(name,value,hours) {
    //     let expires = "";
    //     if (hours) {
    //         let date = new Date();
    //         date.setTime(date.getTime()+(hours*60*60*1000));
    //         expires = "; expires="+date.toGMTString();
    //     }else{
    //         expires = "";
    //     }
    //     document.cookie = name+"="+value+expires+"; path=/";
    // }
});
