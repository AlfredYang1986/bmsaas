import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import $ from 'jquery';
import { debug } from '@ember/debug';

export default Service.extend({
    bm_config: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'querySessionInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
    },

    sessionid: '',
    refresh_token: '',
    refresh_all_token: '',
    session: null,
    sessions: A([]),

    querySessionInfo() {
        this.bmstore.reset();
        this.set('session', null);
        if (this.sessionid.length == 0 || this.sessionid == 'course/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('session', result);
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
            url: '/api/v1/findsessioninfo/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)

                let tempArr1 = [];
                if (result.acquisition != null) {
                    for (let idx = 0;idx < result.acquisition.length;idx++) {
                        let item = {};
                        item.id = idx + 1;
                        item.text = result.acquisition[idx];
                        tempArr1.push(item);
                    }
                }
                result.acquisition = tempArr1;

                let tempArr2 = [];
                if (result.carrying != null) {
                    for (let idx = 0;idx < result.carrying.length;idx++) {
                        let item = {};
                        item.id = idx + 1;
                        item.text = result.carrying[idx];
                        tempArr2.push(item);
                    }
                }
                result.carrying = tempArr2;

                let tempArr3 = [];
                if (result.inc != null) {
                    for (let idx = 0;idx < result.inc.length;idx++) {
                        let item = {};
                        item.id = idx + 1;
                        item.text = result.inc[idx];
                        tempArr3.push(item);
                    }
                }
                result.inc = tempArr3;

                that.set('session', result);
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
        if (rd.Eqcond != undefined) {

            let eq = rd.Eqcond[0].serialize();
            // let fm = rd.Fmcond.serialize();
            rd_tmp['included'] = [eq.data];

        }
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findsessioninfomulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('sessions', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    genMultiQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmSessionInfo"
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
                            val: localStorage.getItem('brandid'),
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
                        res: "BmSessionInfo"
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
                            val: this.sessionid
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
        // let now = new Date().getTime();

        return {
            data: {
                id: this.guid(),
                type: "BmSessionInfo",
                attributes: {
                    title: "",
                    subtitle: "",
                    alb: 1,
                    aub: 1,
                    level: "",
                    count: 0,
                    length: 0,
                    description: "",
                    harvest: "",
                    acquisition: [{"id": 0,"item":""}],
                    accompany: 0,
                    inc: [{"id": 0,"item":""}],
                    carrying: [{"id": 0,"item":""}],
                    notice: "",
                    cover: "",
                    brandId: localStorage.getItem('brandid'),
                    status: 1,
                },
                relationships: {
                    Cate: {
                        data: {
                            "id": cate,
                            "type": "BmCategory"
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
                        ]
                    }
                }
            },
            included: [
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
                        img: "",
                        tag: "主题-能突显课程主题的图片",
                    },
                },
                {
                    id: gid02,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "往期回顾-以往体验的真实情况",
                    },
                },
                {
                    id: gid03,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "课程特色-课程主打或与众不同的內容",
                    },
                },
                {
                    id: gid04,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "教学-与课程、教学有关的精彩画面",
                    },
                },
                {
                    id: gid05,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "成果-孩子课程的收获",
                    },
                },
                {
                    id: gid06,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "互动-家长老师在课程中与孩子的互动",
                    },
                },
                {
                    id: gid07,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "教具-能体现专业的教学用具。如:生物实验需要显微镜",
                    },
                },
                {
                    id: gid08,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "其他",
                    },
                },
                {
                    id: gid09,
                    type: "BmTagImg",
                    attributes: {
                        img: "",
                        tag: "其他",
                    },
                },
            ]
        }
    },

    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let rd = this.session;

        let arr = [];
        for (let idx = 0; idx < rd.Tagimgs.length; idx++) {
            let tmp = rd.Tagimgs[idx].serialize();
            arr.push(tmp.data);
        }
        
        let c = rd.Cate.serialize();
        arr.push(c.data);
        
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        let tempArr1 = [];
        for (let idx = 0;idx < rd_tmp.data.attributes.acquisition.length;idx++) {
            tempArr1.push(rd_tmp.data.attributes.acquisition[idx].text);
        }
        rd_tmp.data.attributes.acquisition = tempArr1;
        let tempArr2 = [];
        for (let idx = 0;idx < rd_tmp.data.attributes.carrying.length;idx++) {
            tempArr2.push(rd_tmp.data.attributes.carrying[idx].text);
        }
        rd_tmp.data.attributes.carrying = tempArr2;
        let tempArr3 = [];
        for (let idx = 0;idx < rd_tmp.data.attributes.inc.length;idx++) {
            tempArr3.push(rd_tmp.data.attributes.inc[idx].text);
        }
        rd_tmp.data.attributes.inc = tempArr3;

        rd_tmp.data.attributes.count = parseInt(rd.count);
        rd_tmp.data.attributes.length = parseInt(rd.length);
        rd_tmp.data.attributes.alb = parseInt(rd.alb);
        rd_tmp.data.attributes.aub = parseInt(rd.aub);
        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/pushsessioninfo/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
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
        return this.session.title.length > 0;
    }
});
