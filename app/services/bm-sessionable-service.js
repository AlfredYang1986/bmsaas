import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    bm_config: service(),
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),
    // bmupdate: new JsonApiDataStore(),

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

    querySessionable(callback) {
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
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('sessionable', result);
                that.set('sessionable.tmp_date', result.start_date);
                console.log(that.sessionable)
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    querySessionable2(callback) {
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
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('sessionable', result);
                if (callback) {
                    callback.onSuccess();
                }
            },
            error: function(err) {
                console.log('error is : ', err);
                if (callback) {
                    callback.onFail();
                }
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
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                if(result !== undefined){
                    for(let idx = 0;idx < result.length;idx++){
                        result[idx].tmp_date = result[idx].start_date;
                    }
                }
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
                            val: this.sessionableid
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
                    tmp_date: now,
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
        let yd = this.bmstore.find('BmYard', yardid);
        let bs = this.bmstore.find('BmSessionInfo', sinfoid);
        if(bs != null){
            this.bmstore.destroy(bs);
        }
        if(yd != null){
            this.bmstore.destroy(yd);
        }

        // this.sessionable.SessionInfo = this.bmstore.sync(sinfo);
        // this.sessionable.Yard = this.bmstore.sync(yard);
        this.set("sessionable.SessionInfo",this.bmstore.sync(sinfo))
        this.set("sessionable.Yard",this.bmstore.sync(yard))
    },

    resetTechs(techs) {
        let arr = []
        if(techs != null){
            for (let idx = 0; idx < techs.length; idx++) {
                let tech = {
                    data: {
                        id: techs[idx].id,
                        type: "BmTeacher",
                        attributes: {
                            a:0
                        }
                    }
                }
                let tc = this.bmstore.find('BmAttendee', techs[idx].id)
                if(tc != null){
                    this.bmstore.destroy(tc);
                }
                arr.push(this.bmstore.sync(tech))
            }
        }
        // this.sessionable.Teachers = arr;
        this.set("sessionable.Teachers",arr)
    },

    resetAttendee(studs) {
        let arr = []
        if(studs != null){
            for (let idx = 0; idx < studs.length; idx++) {
                let stud = {
                    data: {
                        id: studs[idx].id,
                        type: "BmAttendee",
                        attributes: {
                            a:0
                        }
                    }
                }
                let st = this.bmstore.find('BmAttendee', studs[idx].id)
                if(st != null){
                    this.bmstore.destroy(st);
                }
                arr.push(this.bmstore.sync(stud))
            }
        }
        // this.sessionable.Attendees = arr;
        this.set("sessionable.Attendees",arr)
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

    handleDate(date,time) {
        let tmpDate = new Date(date)
        let tmpTime = new Date(time)
        let result = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate(), tmpTime.getHours(), tmpTime.getMinutes(), tmpTime.getSeconds())
        return result.getTime();
    },

    saveUpdate(callback,params) {
        if (!this.isValidate) {
            return ;
        }

        let ft = this.sessionable;
        if(params){
            ft.id = params.id;
            ft.tmp_date = params.tmp_date
            ft.start_date = params.start_date
            ft.end_date = params.end_date
        }
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
        if(params){
            ft_tmp.data.attributes.start_date = this.handleDate(ft.tmp_date, ft.start_date)
            ft_tmp.data.attributes.end_date = this.handleDate(ft.tmp_date, ft.end_date)
        }
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp);

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushsessionable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                // let result = null;
                // this.set("result", that.bmstore.sync(res));
                // console.log('result is: ' + result);
                callback.onSuccess(res);
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },

    deleteSessionable(callback,params) {
        let delete_sessionable_payload = this.genIdQuery();
        let rd = this.bmstore.sync(delete_sessionable_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        if(params){
            rd_tmp['included'][0].attributes.val = params.id
        }
        let dt = JSON.stringify(rd_tmp);

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/deletesessionable/0',
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
        return this.sessionable.title.length > 0;
    },
});
