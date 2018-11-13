import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    store: service(),
    bmstore: new JsonApiDataStore(),
    // bmupstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryYard');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        // this.addObserver('refresh_up_token', this, 'queryUpYard');
    },

    yardid: '',
    refresh_all_token: '',
    refresh_token: '',
    // refresh_up_token: '',
    // upyard: null,
    yard: null,
    yards: A([]),

    queryUpYard() {
        // this.bmupstore.reset();
        // this.set('upyard', null);
        this.bmstore.reset();
        this.set('yard', null);

        if (this.yardid.length == 0) {
            return;
        }

        let query_yard_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);
       
        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findyard/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmupstore.sync(res)
                that.set('yard', result);
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    queryYard() {

        this.bmstore.reset();
        this.set('yard', null);

        if (this.yardid.length == 0) {
            return;
        }

        let query_yard_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);
       
        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findyard/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('yard', result);
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    queryMultiObjects() {
        this.store.unloadAll('bm-yard');
        this.store.unloadAll('bm-tag-img');

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmYard',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0,
            })
        })
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)

        async function getRemoteYards(tmp){
            return await tmp.get('pmController').get('Store').queryMultipleObject('/api/v1/findyardmulti/0', 'bm-yard', json)
                .then(data => {
                    tmp.get('logger').log(data);
                    tmp.set('yards', tmp.store.peekAll('bm-yard'));
                })
                .catch(data => {
                    tmp.get('logger').log(data);
                })
        }
        getRemoteYards(this);
    },

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    genIdQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmYard"
                    },
                    relationships: {
                        Eqcond: {
                            data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            }
                            ]
                        }
                    }
                },
                included: [
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "id",
                            val: this.yardid
                        }
                    }
                ]
            }
    }

});
