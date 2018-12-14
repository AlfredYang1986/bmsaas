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
        this.addObserver('refresh_token', this, 'queryStud');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.addObserver('refresh_all_token', this, 'queryStudCount');
    },

    page: 0,
    steps: 20,
    totalCount: 0,
    totalPageCount: 0,
    studid: '',
    refresh_token: '',
    stud: null,
    studs: A([]),

    queryStudCount() {
        this.bmstore.reset();

        let query_preCount_payload = this.genCountQuery();
        let rd = this.bmstore.sync(query_preCount_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [eq.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('totalCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('totalPageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },
    queryStud() {
        this.bmstore.reset();
        this.set('stud', null);

        if (this.studid.length == 0 || this.studid == 'stud/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('stud', result);
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
            url: '/api/v1/findattendee/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('stud', result);
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

    queryMultiObjects() {

        this.bmmulti.reset();
        let query_yard_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let fm = rd.Fmcond.serialize();
        let eq = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [eq.data, fm.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findattendeemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                // let studs = [];
                // result.forEach((stud,index) => {
                //     if(stud.status == 'stud') {
                //         studs.push(stud)
                //     }
                // })
                that.set('studs', result);
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    genCountQuery() {
        let eq = this.guid();
        return {
            data: {
                id: this.guid(),
                type: "Request",
                attributes: {
                    res: "BmAttendee"
                },
                relationships: {
                    Eqcond: {
                        data: [
                        {
                            id: eq,
                            type: "Eqcond"
                        },
                        ]
                    }
                }
            },
            included: [
                {
                    id: eq,
                    type: "Eqcond",
                    attributes: {
                        key: "status",
                        val: "stud"
                    }
                },
            ]
        }
    },

    genMultiQuery() {
        let eq = this.guid();
        let fm = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmAttendee"
                    },
                    relationships: {
                        Fmcond: {
                            data: 
                            {
                                id: fm,
                                type: "Fmcond"
                            }
                        },
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
                        id: fm,
                        type: "Fmcond",
                        attributes: {
                            take: this.steps,
                            page: this.page
                        }
                    },
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "status",
                            val: "stud"
                        }
                    },
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
                        res: "BmAttendee"
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
                            val: this.studid
                        }
                    }
                ]
            }
    },

    genPushQuery() {
        let gid01 = this.guid();
        let gid02 = this.guid();
        let now = new Date().getTime();
        return {
            data: {
                id: this.guid(),
                type: "BmAttendee",
                attributes: {
                    name: "",
                    nickname: "",
                    icon: "",
                    dob: now,
                    gender: 0,
                    reg_date: now,
                    contact: "",
                    intro: "",
                    status: "stud",
                    lesson_count: 0,
                    address: '',
                    school: '',
                    applyId: '',
                    teacherId: '',
                    teacherName: '',
                    idCardNo: '',
                    sourceWay: '',
                    wechat: '',
                    brandId: '',
                    kidId: '',
                },
                relationships: {
                    Guardians: {
                        data: [
                            {
                                id: gid01,
                                type: "BmGuardian"
                            }
                        ]
                    },
                    Applyees: {
                        data: [
                            {
                                id: gid02,
                                type: "BmApplyee"
                            }
                        ]
                    },
                }
            },
            included: [
                {
                    id: gid01,
                    type: "BmGuardian",
                    attributes: {
                        relation_ship: "",
                        contact: "",
                        name: "",
                        nickname: "",
                        icon: "",
                        dob: now,
                        gender: 0,
                        reg_date: now,
                        address: '',
                        idCardNo: '',
                        wechat: '',
                        brandId: '',
                    }
                },
                {
                    id: gid02,
                    type: "BmApplyee",
                    attributes: {
                        gender: 0,
                        name: '',
                        pic: '',
                        regi_phone: '',
                        wechat_bind_phone: '',
                        wechat_openid: '',
                    }
                }
            ]
        }
    },
    genPushQueryApply() {
        let gid01 = this.guid();
        let gid02 = this.guid();
        let now = new Date().getTime();
        return {
            data: {
                id: this.guid(),
                type: "BmAttendee",
                attributes: {
                    name: "",
                    nickname: "",
                    icon: "",
                    dob: now,
                    gender: 0,
                    reg_date: now,
                    contact: "",
                    intro: "",
                    status: "candidate",
                    lesson_count: 0,
                    school: '',
                    address: '',
                    applyId: '',
                    teacherId: '',
                    teacherName: '',
                    idCardNo: '',
                    sourceWay: '',
                    wechat: '',
                },
                relationships: {
                    Guardians: {
                        data: [
                            {
                                id: gid01,
                                type: "BmGuardian"
                            }
                        ]
                    },
                    Applyees: {
                        data: [
                            {
                                id: gid02,
                                type: "BmApplyee"
                            }
                        ]
                    },
                }
            },
            included: [
                {
                    id: gid01,
                    type: "BmGuardian",
                    attributes: {
                        relation_ship: "",
                        contact: "",
                        name: "",
                        nickname: "",
                        icon: "",
                        dob: now,
                        gender: 0,
                        reg_date: now,
                        address: '',
                        idCardNo: '',
                    },
                },
                {
                    id: gid02,
                    type: "BmApplyee",
                    attributes: {
                        gender: 0,
                        name: '',
                        pic: '',
                        regi_phone: '',
                        wechat_bind_phone: '',
                        wechat_openid: '',
                    }
                }
            ]
        }
    },

    saveUpdate(callback) {


        if (!this.isValidate) {
            return ;
        }

        let rd = this.stud;
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Guardians[0].serialize();
        if(rd.Applyees != null) {
            let apl = rd.Applyees[0].serialize();
            rd_tmp['included'] = [inc.data];
            rd_tmp.included.push(apl.data)
        } else {
            rd_tmp['included'] = [inc.data];
        }

        let dt = JSON.stringify(rd_tmp);

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/insertattendee/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {

                that.bmstore.reset();
                that.set('stud', null);
                let result = that.bmstore.sync(res);
                that.set('stud', result);
                callback.onSuccess(res);
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },

    isValidate() {
        return this.stud.name.length > 0 && this.stud.icon.length > 0 && this.stud.contact.length > 0;
    }

});
