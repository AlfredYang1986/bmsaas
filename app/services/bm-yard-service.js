import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    store: service(),
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryYard');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    yardid: '',
    refresh_all_token: '',
    refresh_token: '',

    yard: null,
    yards: A([]),

    queryYard() {

        this.bmstore.reset();
        this.set('yard', null);

        if (this.yardid.length == 0 || this.yardid == 'yard/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('yard', result);
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
    },

    genPushQuery() {
        let gid01 = this.guid();
        let gid02 = this.guid();
        let gid03 = this.guid();
        let gid04 = this.guid();
        let gid05 = this.guid();
        let gid06 = this.guid();
        let gid07 = this.guid();
        let now = new Date().getTime();

        return {
            data: {
                id: this.guid(),
                type: "BmYard",
                attributes: {
                    title: '',
                    cover: '',
                    description: '',
                    around: '',
                    facilities: A([]),
                    province: '',
                    city: '',
                    district: '',
                    address: '',
                    traffic_info: '',
                    attribute: '',
                    scenario: '',
                    brandId: "5be6a00b8fb80736e2ec9ba5",
                },
                relationships: {
                    Rooms: {
                        data: []
                    },
                    Tagimgs: {
                        data: [
                            {
                                id: gid01,
                                type: "BmTagImg"
                            },
                            {
                                id: gid02,
                                type: "BmTagImg"
                            },
                            {
                                id: gid03,
                                type: "BmTagImg"
                            },
                            {
                                id: gid04,
                                type: "BmTagImg"
                            },
                            {
                                id: gid05,
                                type: "BmTagImg"
                            },
                            {
                                id: gid06,
                                type: "BmTagImg"
                            },
                            {
                                id: gid07,
                                type: "BmTagImg"
                            },
                        ]
                    }
                }
            },
            included: [
                {
                    id: gid01,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "阅读区",
                    },
                },
                {
                    id: gid02,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "教学区",
                    },
                },
                {
                    id: gid03,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "家长休息区",
                    },
                },
                {
                    id: gid04,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "生活区",
                    },
                },
                {
                    id: gid05,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "寄存区",
                    },
                },
                {
                    id: gid06,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "户外活动区",
                    },
                },
                {
                    id: gid07,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "室内活动区",
                    },
                },
            ]
        }
    },

    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        debugger
        let rd = this.yard;
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        let arr = [];
        for (let idx = 0; idx < rd.Tagimgs.length; idx++) {
            let tmp = rd.Tagimgs[idx].serialize();
            arr.push(tmp.data);
        }
        // let inc = rd.Guardians[0].serialize();
        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp); 

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushyard/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                callback.onSuccess();
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },
    isValidate() {
        return this.yard.name.length > 0 && this.yard.cover.length > 0;
    }
});
