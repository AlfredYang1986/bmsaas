import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    store: service(),
    bm_config: service(),
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),

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
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
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
        this.bmmulti.reset();

        let query_yard_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        // let eq = rd.Eqcond[0].serialize();
        // let fm = rd.Fmcond.serialize();
        // rd_tmp['included'] = [eq.data, fm.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findyardmulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                console.log(res)
                let result = that.bmmulti.sync(res)
                that.set('yards', result);
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    genMultiQuery() {
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
                            id: eq,
                            type: "Eqcond"
                        }
                    }
                },
                included: [
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: 'brandId',
                            val: localStorage.getItem('brandid')
                        }
                    }
                ]
            }
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
                    brandId: localStorage.getItem('brandid'),
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

        let rd = this.yard;
        rd.cover = "";

        let arr = [];
        for (let idx = 0; idx < rd.Tagimgs.length; idx++) {
            let tmp = rd.Tagimgs[idx].serialize();
            if (rd.cover.length == 0 && rd.Tagimgs[idx].img.length > 0) {
                rd.cover = rd.Tagimgs[idx].img;
            }
            arr.push(tmp.data);
        }

        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp);

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushyard/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
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
        return this.yard.title.length > 0;
    },

    queryLocalMultiObject() {
        if (this.yards.length == 0) {
            this.queryMultiObjects()
        }
    }
});
