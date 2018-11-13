import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryYard');
    },

    yardid: '',
    refresh_token: '',
    yard: null,

    queryYard() {
        if (this.yard != null) {
            this.store.unloadRecord(this.yard);
            this.store.unloadAll('bm-tag-img');
        }

        if(this.yardid != 'yard/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmYard",
            });
            request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: this.yardid
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(request);
            this.get('logger').log(json)

            async function getRemoteYard(tmp) {
                return await tmp.get('pmController').get('Store').queryObject('/api/v1/findyard/0', 'bm-yard', json)
                    .then(data => {
                        tmp.get('logger').log(data);
                        tmp.set('yard', data);
                    })
                    .catch(data => {
                        tmp.get('logger').log(data);
                        tmp.transitionToRoute('home');
                    })
            }
            getRemoteYard(this);
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
