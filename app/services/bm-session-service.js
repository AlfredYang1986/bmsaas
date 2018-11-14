import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    store: service(),
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'querySessionInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
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
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findsessioninfo/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('session', result);
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
        this.store.unloadAll('bm-session-info');
        this.store.unloadAll('bm-category');
        this.store.unloadAll('bm-tag-img');

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmSessionInfo',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0,
            })
        })
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)

        async function getRemoteSessions(tmp){
            return await tmp.get('pmController').get('Store').queryMultipleObject('/api/v1/findsessioninfomulti/0', 'bm-session-info', json)
                .then(data => {
                    tmp.get('logger').log(data);
                    tmp.set('sessions', tmp.store.peekAll('bm-session-info'));
                })
                .catch(data => {
                    tmp.get('logger').log(data);
                })
        }
        getRemoteSessions(this);
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
        let now = new Date().getTime();

        return {
            data: {
                id: this.guid(),
                type: "BmSessionInfo",
                attributes: {
                    title: "",
                    subtitle: "",
                    alb: 0,
                    aub: 0,
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
                    brandId: "5be6a00b8fb80736e2ec9ba5",
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
        rd_tmp.data.attributes.count = parseInt(rd.count);
        rd_tmp.data.attributes.length = parseInt(rd.length);
        rd_tmp.data.attributes.alb = parseInt(rd.aub);
        rd_tmp.data.attributes.aub = parseInt(rd.alb);
        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp); 

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushsessioninfo/0',
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
        return this.session.title.length > 0;
    }
});
