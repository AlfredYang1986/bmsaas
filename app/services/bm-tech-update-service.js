import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryTech');
    },

    techid: '',
    refresh_token: '',
    tech: null,

    queryTech() {
        if (this.yard != null) {
            this.store.unloadRecord(this.tech);
        }

        if(this.techid != 'tech/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmTeacher",
            });
            request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: this.techid
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(request);
            this.get('logger').log(json)

            async function getRemoteTech(tmp) {
                return await tmp.get('pmController').get('Store').queryObject('/api/v1/findteacher/0', 'bm-teacher', json)
                    .then(data => {
                        tmp.get('logger').log(data);
                        tmp.set('tech', data);
                    })
                    .catch(data => {
                        tmp.get('logger').log(data);
                        tmp.transitionToRoute('home');
                    })
            }
            getRemoteTech(this);
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
