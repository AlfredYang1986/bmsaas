import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryStud');
    },

    studid: '',
    refresh_token: '',
    stud: null,

    queryStud() {
        if (this.stud != null) {
            this.store.unloadRecord(this.stud);
            this.store.unloadAll('bm-guardian');
        }

        if(this.studid != 'stud/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmAttendee",
            });
            request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: this.studid
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(request);
            this.get('logger').log(json)

            async function getRemoteStud(tmp) {
                return await tmp.get('pmController').get('Store').queryObject('/api/v1/findattendee/0', 'bm-attendee', json)
                    .then(data => {
                        tmp.get('logger').log(data);
                        tmp.set('stud', data);
                    })
                    .catch(data => {
                        tmp.get('logger').log(data);
                        tmp.transitionToRoute('home');
                    })
            }
            getRemoteStud(this);
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
