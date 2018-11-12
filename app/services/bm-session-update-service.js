import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'querySessionInfo');
    },

    sessionid: '',
    refresh_token: '',
    session: null,

    querySessionInfo() {
        if (this.session != null) {
            this.store.unloadRecord(this.session);
            this.store.unloadAll('bm-category');
        }

        if(this.studid != 'course/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmSessionInfo",
            });
            request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: this.sessionid
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(request);
            this.get('logger').log(json)

            async function getRemoteSession(tmp) {
                return await tmp.get('pmController').get('Store').queryObject('/api/v1/findsessioninfo/0', 'bm-session-info', json)
                    .then(data => {
                        tmp.get('logger').log(data);
                        tmp.set('session', data);
                    })
                    .catch(data => {
                        tmp.get('logger').log(data);
                        tmp.transitionToRoute('home');
                    })
            }
            getRemoteSession(this);
        }
    },
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
});
