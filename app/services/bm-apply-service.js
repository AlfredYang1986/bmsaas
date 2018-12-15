import Service from '@ember/service';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Service.extend({
    bm_config: service(),
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryApplyInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.addObserver('refresh_all_token', this, 'queryApplyCount');
    },

    page: 0,
    steps: 20,
    applyid: '',
    refresh_token: '',
    refresh_all_token: '',
    apply: null,
    applies: A([]),
    bookCount: 0,
    preCount: 0,
    bookPageCount: 0,
    prePageCount: 0,

    queryApplyCount() {
        this.bmstore.reset();
        this.set('bookCount', 0);
        this.set('preCount', 0);

        let query_preCount_payload = this.genCountQuery();
        let rd = this.bmstore.sync(query_preCount_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        let ne = rd.Necond[0].serialize();
        // // let fm = rd.Fmcond[0].serialize();
        rd_tmp['included'] = [eq.data, ne.data];
        // rd_tmp['included'].push(ne.data)
        let dt = JSON.stringify(rd_tmp);

        let query_bookCount_payload = this.genCountQuery("preRegister");
        let rd2 = this.bmstore.sync(query_bookCount_payload);
        let rd_tmp2 = JSON.parse(JSON.stringify(rd2.serialize()));
        let eq2 = rd2.Eqcond[0].serialize();
        let eq22 = rd2.Eqcond[1].serialize();
        rd_tmp2['included'] = [eq2.data, eq22.data];
        // rd_tmp2['included'].push(eq22.data)
        let dt2 = JSON.stringify(rd_tmp2);

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
                that.set('bookCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('bookPageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt2,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('preCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('prePageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },
    queryApplyInfo() {
        this.bmstore.reset();
        this.set('apply', null);

        if (this.applyid.length == 0) {
            return;
        }

        let query_app_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_app_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        // let fm = rd.Fmcond[0].serialize();
        rd_tmp['included'] = [eq.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findapply/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('apply', result);
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

    genCountQuery(param) {
        let eq = this.guid();
        let eq2 = this.guid();
        let ne = this.guid();
        if(param == "preRegister") {
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Eqcond: {
                            data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            },
                            {
                                id: eq2,
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
                            key: "brandId",
                            val: "5be6a00b8fb80736e2ec9ba5"
                        }
                    },
                    {
                        id: eq2,
                        type: "Eqcond",
                        attributes: {
                            key: "courseType",
                            val: -1
                        }
                    }
                ]
            }
        } else {
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Eqcond: {
                            data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            }
                        ]
                        },
                        Necond: {
                            data: [
                                {
                                    id: ne,
                                    type: "Necond"
                                }
                            ]
                        }
                    }
                },
                included: [
                    {
                        id: ne,
                        type: "Necond",
                        attributes: {
                            key: "courseType",
                            val: -1
                        }
                    },
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "brandId",
                            val: "5be6a00b8fb80736e2ec9ba5"
                        }
                    }
                ]
            }
        }
    },

    genIdQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
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
                            val: this.applyid
                        }
                    },

                ]
            }
    },

    genMultiQuery(param) {
        let fm = this.guid();
        let eq = this.guid();
        let eq2 = this.guid();
        let ne = this.guid();
        if (param == 1) {
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Fmcond: {
                            data: {
                                id: fm,
                                type: "Fmcond",
                            }
                        },
                        Eqcond: {
                            data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            },{
                                id: eq2,
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
                            key: "brandId",
                            val: "5be6a00b8fb80736e2ec9ba5"
                        }
                    },
                    {
                        id: eq2,
                        type: "Eqcond",
                        attributes: {
                            key: "courseType",
                            val: -1
                        }
                    }
                ]
            }
        } else {
            return {
                    data: {
                        id: this.guid(),
                        type: "Request",
                        attributes: {
                            res: "BmApply"
                        },
                        relationships: {
                            Fmcond: {
                                data: {
                                    id: fm,
                                    type: "Fmcond",
                                }
                            },
                            Eqcond: {
                                data: [
                                {
                                    id: eq,
                                    type: "Eqcond"
                                }
                                ]
                            },
                            Necond: {
                                data: [
                                {
                                    id: ne,
                                    type: "Necond",
                                }
                            ]
                            },
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
                                key: "brandId",
                                val: "5be6a00b8fb80736e2ec9ba5"
                            }
                        },
                        {
                            id: ne,
                            type: "Necond",
                            attributes: {
                                key: "courseType",
                                val: -1
                            }
                        }
                    ]
                }

        }
    },

    queryMultiObjects(param) {
        this.bmmulti.reset();

        let query_yard_payload = this.genMultiQuery(param);
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let fm = rd.Fmcond.serialize();
        let eq = rd.Eqcond[0].serialize();
        if (param == 1) {
            let preEq = rd.Eqcond[1].serialize();
            rd_tmp['included'] = [eq.data, preEq.data, fm.data];
        } else {
            let reserveEq = rd.Necond[0].serialize();
            rd_tmp['included'] = [eq.data, reserveEq.data, fm.data];
        }
        let dt = JSON.stringify(rd_tmp);

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findapplies/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('applies', result);
                let date = new Date();
                console.log(typeof(date))
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                let today = Y+M+D;
                let reserveType = [];
                let preRegister = [];
                let reserveTypeToday = [];
                let preRegisterToday = [];
                result.forEach((item, index) => {
                    if(item.courseType != -1) {
                        item.kid = item.Kids[0];
                        reserveType.push(item);
                        return reserveType;
                    } else {
                        item.kid = item.Kids[0];
                        preRegister.push(item);
                        return preRegister;
                    }
                })
                reserveType.forEach((item, index) => {
                    let applyTime = new Date(item.apply_time);
                    console.log(typeof(applyTime))
                    var Y = applyTime.getFullYear() + '-';
                    var M = (applyTime.getMonth()+1 < 10 ? '0'+(applyTime.getMonth()+1) : applyTime.getMonth()+1) + '-';
                    var D = (applyTime.getDate() < 10 ? '0' + (applyTime.getDate()) : applyTime.getDate());
                    let apply_time = Y+M+D;
                    if(apply_time == today) {
                        reserveTypeToday.push(item);
                        return reserveTypeToday;
                    }
                })
                preRegister.forEach((item, index) => {
                    let applyTime = new Date(item.apply_time);
                    console.log(typeof(applyTime))
                    var Y = applyTime.getFullYear() + '-';
                    var M = (applyTime.getMonth()+1 < 10 ? '0'+(applyTime.getMonth()+1) : applyTime.getMonth()+1) + '-';
                    var D = (applyTime.getDate() < 10 ? '0' + (applyTime.getDate()) : applyTime.getDate());
                    let apply_time = Y+M+D;
                    if(apply_time == today) {
                        preRegisterToday.push(item);
                        return preRegisterToday;
                    }
                })
                that.set('reserveType', reserveType);
                that.set('reserveTypeToday', reserveTypeToday);
                that.set('reserveTypeAmount', reserveType.length);
                that.set('reserveTypeTodayAmount', reserveTypeToday.length);

                that.set('amount', reserveType.length);
                that.set('reserved', reserveType)
                that.set('preAmount', preRegister.length);
                that.set('preRegistered', preRegister)

                that.set('preRegister', preRegister);
                that.set('preRegisterToday', preRegisterToday);
                that.set('preRegisterAmount', preRegister.length);
                that.set('preRegisterTodayAmount', preRegisterToday.length)
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    saveUpdate(callback) {
        if (!this.isValidate) {
            return ;
        }
        // this.set('apply',  this.reserveType[0]);
        this.set('apply.status', 1);
        let ft = this.apply;
        let rd = ft.Applyee;

        let arr = [];
        for (let idx = 0; idx < ft.Kids.length; idx++) {
            let tmp = ft.Kids[idx].serialize();
            arr.push(tmp.data);
        }

        let c = rd.serialize();
        arr.push(c.data);

        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        arr.push(rd_tmp.data)

        let ft_tmp = JSON.parse(JSON.stringify(ft.serialize()));
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp);

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushapply/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
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
        return this.apply.id.length > 0;
    }
});
