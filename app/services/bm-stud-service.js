import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    store: service(),
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryStud');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    studid: '',
    refresh_token: '',
    stud: null,
    studs: A([]),

    queryStud() {

        this.bmstore.reset();
        this.set('tech', null);

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
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
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
        this.store.unloadAll('bm-attendee');

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0,
            })
        })
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)

        async function getRemoteAttendees(tmp){
            return await tmp.get('pmController').get('Store').queryMultipleObject('/api/v1/findattendeemulti/0', 'bm-attendee', json)
                .then(data => {
                    tmp.get('logger').log(data);
                    tmp.set('studs', tmp.store.peekAll('bm-attendee'));
                })
                .catch(data => {
                    tmp.get('logger').log(data);
                })
        }
        getRemoteAttendees(this);
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
    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let rd = this.stud;
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Guardians[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp); 

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/insertattendee/0',
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
        return this.stud.name.length > 0 && this.stud.icon.length > 0 && this.stud.contact.length > 0;
    }

});
