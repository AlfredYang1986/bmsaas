import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';
import $ from 'jquery';

export default Service.extend({
    bm_config: service(),
    bm_yard_service: service(),
    bm_session_service: service(),
    
    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryClass');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
    },

    refresh_token: '',
    refresh_all_token: '',

    // page: 0,
    // steps: 10,
    curTabIdx: 0,

    classId: '',
    class: null,
    classes: A([]),
    allCls: A([]),
    preCls: A([]),
    goingCls: A([]),
    finishCls: A([]),
    
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    genPushQuery() {
        return {
            data: {
                id: this.guid(),
                type: "BmSessionable",
                attributes: {
                    status: 2,
                    courseExpireCount: 0,
                    courseTotalCount: 0,
                    classTitle: '',
                    brandId: localStorage.getItem('brandid'),
                    start_date: 0,
                    end_date: 0,
                    reservableId: '',
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
                },
            },
            included: []
        }
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
                        val: this.classId
                    }
                }
            ]
        }
    },

    genMultiQuery() {
        let eq = this.guid();
        let eq2 = this.guid();
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
                        key: 'brandId',
                        val: localStorage.getItem('brandid')
                    }
                },
                {
                    id: eq2,
                    type: "Eqcond",
                    attributes: {
                        key: 'status',
                        val: 2
                    }
                }
            ]
        }
    },

    queryClass() {
        this.bmstore.reset();
        this.set('class', null);

        if (this.classId.length == 0 || this.classId == 'class/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('class', result);
            return;
        }

        let query_class_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_class_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findsessionable/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('class', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    queryMultiObjects() {
        this.bmmulti.reset();

        let query_classes_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_classes_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        let eq2 = rd.Eqcond[1].serialize();
        rd_tmp['included'] = [eq.data, eq2.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findsessionablemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                if (res != null) {
                    let tempArrPre = [];
                    let tempArrGoing = [];
                    let tempArrFinish = [];
                    result.forEach((item) => {
                        if (item.courseTotalCount == 0) {
                            tempArrPre.push(item);
                        } else {
                            if(item.courseTotalCount == item.courseExpireCount) {
                                tempArrFinish.push(item);
                            } else {
                                tempArrGoing.push(item);
                            }
                        }
                    })
                    that.set('classes', result);
                    that.set('allCls', result);
                    that.set('preCls', tempArrPre);
                    that.set('goingCls', tempArrGoing);
                    that.set('finishCls', tempArrFinish);
                } else {
                    that.set('classes', []);
                    that.set('allCls', []);
                    that.set('preCls', []);
                    that.set('goingCls', []);
                    that.set('finishCls', []);
                }
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    saveUpdate(callback) {

        // if (!this.isValidate) {
        //     return ;
        // }

        let rd = this.class;
        
        let arr = [];
        let s = rd.SessionInfo.serialize();
        arr.push(s.data);

        let y = rd.Yard.serialize();
        arr.push(y.data);

        let ts = rd.Teachers
        for (let idx = 0; idx < ts.length; idx++) {
            let tmp = ts[idx].serialize();
            arr.push(tmp.data);
        }

        let ss = rd.Attendees
        for (let idx = 0; idx < ss.length; idx++) {
            let tmp = ss[idx].serialize();
            arr.push(tmp.data);
        }
        
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/pushsessionable/0',
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
    
    delete(callback) {
        let delete_sessionable_payload = this.genIdQuery();
        let rd = this.bmstore.sync(delete_sessionable_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        // if(params){
        //     rd_tmp['included'][0].attributes.val = params.id
        // }
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/deletesessionable/0',
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

    filterMultiObjects(param) {
        if (param == "all") {
            this.set("classes", this.allCls);
        } else if(param == "pre") {
            this.set("classes", this.preCls);
        } else if(param == "going") {
            this.set("classes", this.goingCls);
        } else if(param == "finish") {
            this.set("classes", this.finishCls);
        }
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

        this.set("class.SessionInfo",this.bmstore.sync(sinfo))
        this.set("class.Yard",this.bmstore.sync(yard))
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
        this.set("class.Teachers",arr)
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
        this.set("class.Attendees",arr)
    },

});
