import Controller from '@ember/controller';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export default Controller.extend({
    // cookies: inject(),
    actions: {
        exitSystem() {
            new rsvp.Promise((resolve) => {
                // this.get('cookies').clear('token', {path: '/'});
                localStorage.clear();
                return resolve(true);
            }
            ).then(() => {
                // window.location.reload();
                this.transitionToRoute('index');
            }
            );
        }
    }
});
