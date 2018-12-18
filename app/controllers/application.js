import Controller from '@ember/controller';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export default Controller.extend({
    cookies: inject(),
    init() {
        this._super(...arguments);
        // this.get('cookie').write('token', 'ce6af788112b26331e9789b0b2606cce', { path: '/' });
    },
    actions: {
        exitSystem() {
            new rsvp.Promise((resolve) => {
    			this.get('cookies').clear('token', {
    				path: '/'
    			});
    			localStorage.clear();
    			return resolve(true);
    		}
    		).then(() => {
    			window.location.reload();
    		}
    		);
        }
    }

});
