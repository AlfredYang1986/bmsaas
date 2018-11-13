import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryBrand');
    },

    brandid: '',
    refresh_token: '',
    brand: null,

    queryBrand() {
        if (this.brand != null) {
            this.store.unloadRecord(this.brand);
            this.store.unloadAll('bm-category');
            this.store.unloadAll('bm-certification');
        }

        if(this.brandid != 'brand/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmBrand",
            });
            request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                // val: '5be6a00b8fb80736e2ec9ba5',
                val: this.brandid
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(request);
            this.get('logger').log(json)

            async function getRemoteBrand(tmp) {
                return await tmp.get('pmController').get('Store').queryObject('/api/v1/findbrand/0', 'bm-brand', json)
                    .then(data => {
                        tmp.get('logger').log(data);
                        tmp.set('brand', data);
                    })
                    .catch(data => {
                        tmp.get('logger').log(data);
                        tmp.transitionToRoute('home');
                    })
            }
            getRemoteBrand(this);
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
