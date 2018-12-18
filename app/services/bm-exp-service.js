import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import $ from 'jquery';
import { debug } from '@ember/debug';

export default Service.extend({
    store: service(),
    bm_config: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryExpInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
    },

    expid: '',
    refresh_token: '',
    refresh_all_token: '',
    exp: null,
    exps: A([]),

    queryExpInfo() {
        this.bmstore.reset();
        this.set('exp', null);

        if (this.expid.length == 0 || this.expid == 'exp/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('exp', result);
            return;
        }

        let query_yard_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findreservable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('exp', result);
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

    queryMultiObjects() {
        this.bmmulti.reset();

        let query_yard_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        let brand = rd.Eqcond[1].serialize();
        rd_tmp['included'] = [inc.data];
        rd_tmp.included.push(brand.data);
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findreservablemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('exps', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    genMultiQuery() {
        let eq = this.guid();
        let eq2 = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmReservable"
                    },
                    relationships: {
                        Eqcond: {
                            data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            }, {
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
                            key: "status",
                            val: 1
                        }
                    }, {
                        id: eq2,
                        type: "Eqcond",
                        attributes: {
                            key: "brandId",
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
                        res: "BmReservable"
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
                            val: this.expid
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
        let gid08 = this.guid();
        let gid09 = this.guid();
        let cate = this.guid();
        let sinfo = this.guid();
        // let now = new Date().getTime();

        return {
                data: {
                    id: this.guid(),
                    type: "BmReservable",
                    attributes: {
                        status: 1,
                        start_date: 0,
                        end_date: 0,
                        brandId: localStorage.getItem('brandid'),
                    },
                    relationships: {
                        SessionInfo: {
                            data: {
                                id: sinfo,
                                type: "BmSessionInfo"
                            }
                        },
                        Yards: {
                            data: []
                        }
                    }
                },
                included: [
                    {
                        id: sinfo,
                        type: "BmSessionInfo",
                        attributes: {
                            status: 1,
                            brandId: localStorage.getItem('brandid'),
                            title: '',
                            subtitle: "",
                            alb: 1,
                            aub: 1,
                            level: "",
                            count: 0,
                            length: 0,
                            description: "",
                            harvest: "",
                            acquisition: "",
                            accompany: 0,
                            including: "",
                            carrying: "",
                            notice: "",
                            cover: "",
                            inc: "",
                            play_children: "",
                        },
                        relationships: {
                            Cate: {
                                data: {
                                    id: cate,
                                    type: "BmCategory"
                                }
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
                                    {
                                        id: gid08,
                                        type: "BmTagImg"
                                    },
                                    {
                                        id: gid09,
                                        type: "BmTagImg"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        id: cate,
                        type: "BmCategory",
                        attributes: {
                            title: "",
                            subtitle: ""
                        }
                    },
                    {
                        id: gid01,
                        type: "BmTagImg",
                        attributes: {
                            tag: "主题-能突显课程主题的图片",
                            img: ""
                        }
                    },
                    {
                        id: gid02,
                        type: "BmTagImg",
                        attributes: {
                            tag: "往期回顾-以往体验的真实情况",
                            img: ""
                        }
                    },
                    {
                        id: gid03,
                        type: "BmTagImg",
                        attributes: {
                            tag: "课程特色-课程主打或与众不同的內容",
                            img: ""
                        }
                    },
                    {
                        id: gid04,
                        type: "BmTagImg",
                        attributes: {
                            tag: "教学-与课程、教学有关的精彩画面",
                            img: ""
                        }
                    },
                    {
                        id: gid05,
                        type: "BmTagImg",
                        attributes: {
                            tag: "成果-孩子课程的收获",
                            img: ""
                        }
                    },
                    {
                        id: gid06,
                        type: "BmTagImg",
                        attributes: {
                            tag: "互动-家长老师在课程中与孩子的互动",
                            img: ""
                        }
                    },
                    {
                        id: gid07,
                        type: "BmTagImg",
                        attributes: {
                            tag: "教具-能体现专业的教学用具。如:生物实验需要显微镜",
                            img: ""
                        }
                    },
                    {
                        id: gid08,
                        type: "BmTagImg",
                        attributes: {
                            tag: "其他",
                            img: ""
                        }
                    },
                    {
                        id: gid09,
                        type: "BmTagImg",
                        attributes: {
                            tag: "其他",
                            img: ""
                        }
                    }
                ]
            }
    },

    saveUpdate(callback) {
        if (!this.isValidate) {
            return ;
        }

        let ft = this.exp;
        let rd = ft.SessionInfo;

        let arr = [];
        for (let idx = 0; idx < rd.Tagimgs.length; idx++) {
            let tmp = rd.Tagimgs[idx].serialize();
            arr.push(tmp.data);
        }

        let c = rd.Cate.serialize();
        arr.push(c.data);

        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        rd_tmp.data.attributes.count = parseInt(rd.count);
        rd_tmp.data.attributes.length = parseInt(rd.length);
        rd_tmp.data.attributes.alb = parseInt(rd.alb);
        rd_tmp.data.attributes.aub = parseInt(rd.aub);

        arr.push(rd_tmp.data)

        let ft_tmp = JSON.parse(JSON.stringify(ft.serialize()));
        ft_tmp.data.attributes.start_date = ft.start_date
        ft_tmp.data.attributes.end_date = ft.end_date
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/pushreservable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                callback.onSuccess(res);
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },

    deleteReservable(callback) {
        let delete_reservable_payload = this.genIdQuery();
        let rd = this.bmstore.sync(delete_reservable_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/deletereservable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
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
        return this.exp.title.length > 0;
    },

    queryLocalMultiObject() {
        if (this.exps.length == 0) {
            this.queryMultiObjects()
        }
    }
});
