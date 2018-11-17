import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),

    bm_yard_service: service(),
    bm_session_service: service(),
    bm_tech_service: service(),
    bm_stud_service: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'querySessionable');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    sessionableid: '',
    reservableid: '',
    refresh_token: '',
    refresh_all_token: '',
    sessionable: null,
    sessionables: A([]),

    querySessionable() {
        this.bmstore.reset();
        this.set('sessionable', null);

        if (this.sessionableid.length == 0 || this.sessionableid == 'sessionable/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('sessionable', result);
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
            url: '/api/v1/findsessionable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('sessionable', result);
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
            url: '/api/v1/findsessionablemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('sessionables', result);
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    genIdQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmSessionable"
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

    genPushQuery(yardid, sinfoid) {
        // TODO: generate more stud
        let now = new Date().getTime();

        let sessionable = {
            data: {
                id: this.guid(),
                type: "BmSessionable",
                attributes: {
                    status: 0,
                    start_date: now,
                    end_date: now,
                    reservableId: this.reservableid,
                },
                relationships: {
                    Teachers: {
                        data: []
                    },
                    Attendees: {
                        data: []
                    },
                    Yard: {
                        data: {}
                    },
                    SessionInfo: {
                        data: {}
                    }
                }
            },
            included: []
        } 
            
        return sessionable;
    },

    resetInfoAndYard(yardid, sinfoid) {
        let yard = {
            data: {
                id: yardid,
                type: "BmYard",
                attributes: {
                    a:0
                }
            }
        }
        let sinfo = {
            data: {
                id: sinfoid,
                type: "BmSessionInfo",
                attributes: {
                    a:0
                }
            }
        }
        this.sessionable.SessionInfo = this.bmstore.sync(sinfo);
        this.sessionable.Yard = this.bmstore.sync(yard);
    },

    resetTechs(techs) {
        let arr = []
        for (let idx = 0; idx < techs.length; idx++) {
            let tech = {
                data: {
                    id: techs[idx],
                    type: "BmTeacher",
                    attributes: {

                    }
                }
            }
            arr.push(this.bmstore.sync(tech))
        }
        return arr;
    },

    resetAttendee(studs) {
        let arr = []
        for (let idx = 0; idx < studs.length; idx++) {
            let stud = {
                data: {
                    id: studs[idx],
                    type: "BmAttendee",
                    attributes: {

                    }
                }
            }
            arr.push(this.bmstore.sync(stud))
        }
        return arr;
    },

    genMultiQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmSessionable"
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
                            key: "reservableId",
                            val: this.reservableid
                        }
                    }
                ]
            } 
    },

    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let ft = this.sessionable;

        let arr = [];
        let s = ft.SessionInfo.serialize();
        arr.push(s.data);
        
        let y = ft.Yard.serialize();
        arr.push(y.data);

        let ts = ft.Teachers
        for (let idx = 0; idx < ts.length; idx++) {
            let tmp = ts[idx].serialize();
            arr.push(tmp.data);
        }

        let ss = ft.Attendees
        for (let idx = 0; idx < ss.length; idx++) {
            let tmp = ss[idx].serialize();
            arr.push(tmp.data);
        }

        let ft_tmp = JSON.parse(JSON.stringify(ft.serialize()));
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp); 

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushsessionable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res);
                console.log('result is: ' + result);
                callback.onSuccess(result);
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },
    isValidate() {
        return this.sessionable.title.length > 0;
    },
});
