import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    store: service(),
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryActvInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    actvid: '',
    refresh_token: '',
    refresh_all_token: '',
    actv: null,
    actvs: A([]),

    queryActvInfo() {
        this.bmstore.reset();
        this.set('actv', null);

        if (this.actvid.length == 0 || this.sessionid == 'actv/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('actv', result);
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
            url: '/api/v1/findreservable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('actv', result);
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
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findreservablemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('actvs', result);
            },
            error: function(err) {
                console.log('error is : ', err);
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
                            key: "status",
                            val: 1
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
        let now = new Date().getTime();

        return {
                data: {
                    id: this.guid(),
                    type: "BmReservable",
                    attributes: {
                        status: 0,
                        start_date: 0,
                        end_date: 0
                    },
                    relationships: {
                        SessionInfo: {
                            data: {
                                "id": "5bebbc258fb8074f6440dc6f",
                                "type": "BmSessionInfo"
                            }
                        },
                        Yards: {
                            "data": []
                        }
                    }
                },
                included: [
                    {
                        id: "5bebbc258fb8074f6440dc6f",
                        type: "BmSessionInfo",
                        attributes: {
                            brandId: "5be6a00b8fb80736e2ec9ba5",
                            title: '',
                            subtitle: "",
                            alb: 0,
                            aub: 0,
                            level: "",
                            count: 1,
                            length: 45,
                            description: "",
                            harvest: "",
                            acquisition: "",
                            accompany: 0,
                            including: "",
                            carrying: "",
                            notice: "",
                            cover: ""
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

        let ft = this.actv;
        let rd = ft.SessionInfo;

        let arr = [];
        for (let idx = 0; idx < rd.Tagimgs.length; idx++) {
            let tmp = rd.Tagimgs[idx].serialize();
            arr.push(tmp.data);
        }

        let c = session.Cate.serialize();
        arr.push(c.data);

        let rd_tmp = JSON.parse(JSON.stringify(session.serialize()));
        rd_tmp.data.attributes.count = parseInt(rd.count);
        rd_tmp.data.attributes.length = parseInt(rd.length);
        rd_tmp.data.attributes.alb = parseInt(rd.aub);
        rd_tmp.data.attributes.aub = parseInt(rd.alb);

        arr.push(rd_tmp.data)

        let ft_tmp = JSON.parse(JSON.stringify(session.serialize()));
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp); 

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
        return this.exp.title.length > 0;
    }

});
