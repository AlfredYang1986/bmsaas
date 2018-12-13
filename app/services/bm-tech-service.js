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
        this.addObserver('refresh_token', this, 'queryTech');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    techid: '',
    refresh_token: '',
    refresh_all_token: '',
    tech: null,
    techs: A([]),

    queryTech() {
        this.bmstore.reset();
        this.set('tech', null);
        debugger
        if (this.techid.length == 0 || this.techid == 'tech/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('tech', result);
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
            url: '/api/v1/findteacher/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('tech', result);
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
            url: '/api/v1/findteachermulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                console.log(res)
                let result = that.bmmulti.sync(res)
                that.set('techs', result);
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
                        res: "BmTeacher"
                    },
                    relationships: {
                        Eqcond: {}
                    }
                },
                included: []
            }
    },

    genIdQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmTeacher"
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
                            val: this.techid
                        }
                    }
                ]
            }
    },
    genPushQuery() {
        let gid01 = this.guid();
        let now = new Date().getTime();
        return {
            data: {
                id: this.guid(),
                type: "BmTeacher",
                attributes: {
                    intro: '',
                    brandId: '5be6a00b8fb80736e2ec9ba5',
                    name: '',
                    nickname: '',
                    icon: '',
                    dob: now,
                    gender: 0,
                    reg_date: now,
                    contact: '',
                    wechat: '',
                    address: '',
                    nativePlace: '',
                },
            }
        }
    },
    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let rd = this.tech;
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        // let inc = rd.Guardians[0].serialize();
        rd_tmp['included'] = [];
        let dt = JSON.stringify(rd_tmp);

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushteacher/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken()
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
        return this.tech.name.length > 0 && this.tech.icon.length > 0 && this.tech.contact.length > 0;
    },

    queryLocalMultiObject() {
        if (this.techs.length == 0) {
            this.queryMultiObjects()
        }
    }
});
