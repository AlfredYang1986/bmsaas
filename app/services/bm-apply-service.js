import Service from '@ember/service';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { debug } from '@ember/debug';

export default Service.extend({
    bm_config: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryApplyInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.addObserver('refresh_all_token', this, 'queryApplyCount');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
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

    todayBookCount: 0,
    todayPreCount: 0,
    todayBookPageCount: 0,
    todayPrePageCount: 0,

    curTabIdx: 0,

    queryApplyCount() {
        this.bmstore.reset();
        this.set('bookCount', 0);
        this.set('preCount', 0);
        this.set('todayBookCount', 0);
        this.set('todayPreCount', 0);

        let query_preCount_payload = this.genCountQuery();
        let rd = this.bmstore.sync(query_preCount_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        let ne = rd.Necond[0].serialize();
        // // let fm = rd.Fmcond[0].serialize();
        rd_tmp['included'] = [eq.data, ne.data];
        // rd_tmp['included'].push(ne.data)
        let dt = JSON.stringify(rd_tmp);

        let query_bookCount_payload = this.genCountQuery("pre");
        let preRd = this.bmstore.sync(query_bookCount_payload);
        let preRd_tmp = JSON.parse(JSON.stringify(preRd.serialize()));
        let preEq = preRd.Eqcond[0].serialize();
        let preEq2 = preRd.Eqcond[1].serialize();
        preRd_tmp['included'] = [preEq.data, preEq2.data];
        // rd_tmp2['included'].push(eq22.data)
        let preDt = JSON.stringify(preRd_tmp);

        let query_todayBookCount_payload = this.genCountQuery("todayBook");
        let todayBookRd = this.bmstore.sync(query_todayBookCount_payload);
        let todayBookRd_tmp = JSON.parse(JSON.stringify(todayBookRd.serialize()));
        let todayBookGte = todayBookRd.Gtecond[0].serialize();
        let todayBookEq = todayBookRd.Eqcond[0].serialize();
        let todayBookNe = todayBookRd.Necond[0].serialize();
        todayBookRd_tmp['included'] = [todayBookGte.data, todayBookEq.data, todayBookNe.data];
        // rd_tmp2['included'].push(eq22.data)
        let todayBookDt = JSON.stringify(todayBookRd_tmp);

        let query_todayPreCount_payload = this.genCountQuery("todayPre");
        let todayPreRd = this.bmstore.sync(query_todayPreCount_payload);
        let todayPreRd_tmp = JSON.parse(JSON.stringify(todayPreRd.serialize()));
        let todayPreGte = todayPreRd.Gtecond[0].serialize();
        let todayPreEq = todayPreRd.Eqcond[0].serialize();
        let todayPreEq2 = todayPreRd.Eqcond[1].serialize();
        todayPreRd_tmp['included'] = [todayPreGte.data, todayPreEq.data, todayPreEq2.data];
        // rd_tmp2['included'].push(eq22.data)
        let todayPreDt = JSON.stringify(todayPreRd_tmp);

        let that = this;
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('bookCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('bookPageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: preDt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('preCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('prePageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: todayBookDt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('todayBookCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('todayBookPageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: todayPreDt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('todayPreCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('todayPrePageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                debug('error is : ', err);
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
        $.ajax({
            method: 'POST',
            url: '/api/v1/findapply/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('apply', result);
            },
            error: function(err) {
                debug('error is : ', err);
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
        let gte = this.guid();
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        today = today.getTime();
        if(param == "pre") {
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
                            val: localStorage.getItem('brandid')
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
        } else if(param == "todayBook") {
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Gtecond: {
                            data: [
                            {
                                id: gte,
                                type: "Gtecond"
                            }
                            ]
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
                                    type: "Necond"
                                }
                            ]
                        }
                    }
                },
                included: [
                    {
                        id: gte,
                        type: "Gtecond",
                        attributes: {
                            key: "apply_time",
                            val: today
                        }
                    },
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
                            val: localStorage.getItem('brandid')
                        }
                    }
                ]
            }
        } else if (param == "todayPre") {
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Gtecond: {
                            data: [
                            {
                                id: gte,
                                type: "Gtecond"
                            }
                            ]
                        },
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
                        id: gte,
                        type: "Gtecond",
                        attributes: {
                            key: "apply_time",
                            val: today
                        }
                    },
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "brandId",
                            val: localStorage.getItem('brandid')
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
                            val: localStorage.getItem('brandid')
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
        let gte = this.guid();
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        today = today.getTime();
        if (param == "pre") {
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
                            val: localStorage.getItem('brandid')
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
        } else if (param == "todayBook"){
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Gtecond: {
                            data: [
                            {
                                id: gte,
                                type: "Gtecond"
                            }
                            ]
                        },
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
                        id: gte,
                        type: "Gtecond",
                        attributes: {
                            key: "apply_time",
                            val: today
                        }
                    },
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
                            val: localStorage.getItem('brandid')
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
        } else if (param == "todayPre"){
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Gtecond: {
                            data: [
                            {
                                id: gte,
                                type: "Gtecond"
                            }
                            ]
                        },
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
                        id: gte,
                        type: "Gtecond",
                        attributes: {
                            key: "apply_time",
                            val: today
                        }
                    },
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
                            val: localStorage.getItem('brandid')
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
                                val: localStorage.getItem('brandid')
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

    queryMultiObjects(param,callback) {
        this.bmmulti.reset();
        let query_yard_payload = this.genMultiQuery(param);
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let fm = rd.Fmcond.serialize();
        let eq = rd.Eqcond[0].serialize();
        if (param == "pre"){
            let preEq = rd.Eqcond[1].serialize();
            rd_tmp['included'] = [eq.data, preEq.data, fm.data];
        } else if (param == "todayBook"){
            let gte = rd.Gtecond[0].serialize();
            let reserveEq = rd.Necond[0].serialize();
            rd_tmp['included'] = [gte.data, eq.data, reserveEq.data, fm.data];
        } else if (param == "todayPre"){
            let gte = rd.Gtecond[0].serialize();
            let preEq = rd.Eqcond[1].serialize();
            rd_tmp['included'] = [gte.data, eq.data, preEq.data, fm.data];
        } else {
            let reserveEq = rd.Necond[0].serialize();
            rd_tmp['included'] = [eq.data, reserveEq.data, fm.data];
        }
        let dt = JSON.stringify(rd_tmp);
        this.queryApplyCount(param)

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findapplies/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('applies', result);
                let date = new Date();
                debug(typeof(date))
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

								let today = Y+M+D;
                let reserveType = [];
                let preRegister = [];
                let reserveTypeToday = [];
                let preRegisterToday = [];

                result.forEach((item) => {
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
                reserveType.forEach((item) => {
                    let applyTime = new Date(item.apply_time);
                    debug(typeof(applyTime))
                    var Y = applyTime.getFullYear() + '-';
                    var M = (applyTime.getMonth()+1 < 10 ? '0'+(applyTime.getMonth()+1) : applyTime.getMonth()+1) + '-';
                    var D = (applyTime.getDate() < 10 ? '0' + (applyTime.getDate()) : applyTime.getDate());
                    let apply_time = Y+M+D;
                    if(apply_time == today) {
                        reserveTypeToday.push(item);
                        return reserveTypeToday;
                    }
                })
                preRegister.forEach((item) => {
                    let applyTime = new Date(item.apply_time);
                    debug(typeof(applyTime))
                    var Y = applyTime.getFullYear() + '-';
                    var M = (applyTime.getMonth()+1 < 10 ? '0'+(applyTime.getMonth()+1) : applyTime.getMonth()+1) + '-';
                    var D = (applyTime.getDate() < 10 ? '0' + (applyTime.getDate()) : applyTime.getDate());
                    let apply_time = Y+M+D;
                    if(apply_time == today) {
                        preRegisterToday.push(item);
                        return preRegisterToday;
                    }
                })
                // let date = new Date();
                // console.log(typeof(date))
                // var Y = date.getFullYear() + '-';
                // var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                // var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                // let today = Y+M+D;
                // reserveType.forEach((item, index) => {
                //     let applyTime = new Date(item.apply_time);
                //     console.log(typeof(applyTime))
                //     var Y = applyTime.getFullYear() + '-';
                //     var M = (applyTime.getMonth()+1 < 10 ? '0'+(applyTime.getMonth()+1) : applyTime.getMonth()+1) + '-';
                //     var D = (applyTime.getDate() < 10 ? '0' + (applyTime.getDate()) : applyTime.getDate());
                //     let apply_time = Y+M+D;
                //     if(apply_time == today) {
                //         reserveTypeToday.push(item);
                //         return reserveTypeToday;
                //     }
                // })
                // preRegister.forEach((item, index) => {
                //     let applyTime = new Date(item.apply_time);
                //     console.log(typeof(applyTime))
                //     var Y = applyTime.getFullYear() + '-';
                //     var M = (applyTime.getMonth()+1 < 10 ? '0'+(applyTime.getMonth()+1) : applyTime.getMonth()+1) + '-';
                //     var D = (applyTime.getDate() < 10 ? '0' + (applyTime.getDate()) : applyTime.getDate());
                //     let apply_time = Y+M+D;
                //     if(apply_time == today) {
                //         preRegisterToday.push(item);
                //         return preRegisterToday;
                //     }
                // })
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
                if (typeof(callback) == "object") {
                    callback.onSuccess();
                }
            },
            error: function(err) {
                debug('error is : ', err);
                if (typeof(callback) == "object") {
                    callback.onFail();
                }
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

        $.ajax({
            method: 'POST',
            url: '/api/v1/pushapply/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(/*res*/) {
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
