import Controller from '@ember/controller';
import rsvp from 'rsvp';

export default Controller.extend({
    // cookies: inject(),
    actions: {
        exitSystem() {
            // let that = this;
            new rsvp.Promise((resolve) => {
                // this.get('cookies').clear('token', {path: '/'});
                this.deleteCookie("token");
                localStorage.clear();
                return resolve(true);
            }).then(() => {
                // window.location.reload();
                this.transitionToRoute('index');
            });
        },
    },
    deleteCookie(name) {
        this.setCookie(name,"",-1);
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
