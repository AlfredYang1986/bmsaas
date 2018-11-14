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
        let now = new Date().getTime();
        return {
            data: {
                id: this.guid(),
                type: "BmSessionInfo",
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
                    school: ''
                },
                relationships: {
                    Guardians: {
                        data: [
                            {
                                id: gid01,
                                type: "BmGuardian"
                            }
                        ]
                    }
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
                        addr: ''
                    },
                }
            ]
        }
    },
});
