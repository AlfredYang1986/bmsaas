import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';
import $ from 'jquery';

export default Service.extend({
    bm_config: service(),
    bm_session_service: service(),
    bm_class_service: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryUnit');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
    },

    refresh_token: '',
    refresh_all_token: '',

    // page: 0,
    // steps: 10,
    curTabIdx: 0,

    sessionableId: '',
    unitId: '',
    unit: null,
    units: A([]),
    // allCls: A([]),
    // preCls: A([]),
    // goingCls: A([]),
    // finishCls: A([]),

        
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
                type: "BmCourseUnit",
                attributes: {
                    // status: 2,
                    // courseExpireCount: 0,
                    // courseTotalCount: 0,
                    // unitTitle: '',
                    // brandId: localStorage.getItem('brandid'),
                    // start_date: 0,
                    // end_date: 0,
                    // reservableId: '',
                },
                relationships: {
                    // Teachers: {
                    //     data: []
                    // },
                    // Attendees: {
                    //     data: []
                    // },
                    // Yard: {
                    //     data: {}
                    // },
                    // SessionInfo: {
                    //     data: {}
                    // }
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
                    res: "BmCourseUnit"
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
                        val: this.unitId
                    }
                }
            ]
        }
    },

    genMultiQuery() {
        let eq = this.guid();
        // let eq2 = this.guid();
        return {
            data: {
                id: this.guid(),
                type: "Request",
                attributes: {
                    res: "BmCourseUnit"
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
                        key: 'sessionableId',
                        // val: this.sessionableId
                        val: this.bm_class_service.sessionableId
                    }
                },
            ]
        }
    },

    queryUnit() {
        this.bmstore.reset();
        this.set('unit', null);

        if (this.unitId.length == 0 || this.unitId == 'unit/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('unit', result);
            return;
        }

        let query_unit_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_unit_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcourseunit/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('unit', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    queryMultiObjects() {
        this.bmmulti.reset();

        let query_units_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_units_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        // let eq2 = rd.Eqcond[1].serialize();
        rd_tmp['included'] = [eq.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcourseunitmulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('units', result);
                // if (res != null) {
                //     let tempArrPre = [];
                //     let tempArrGoing = [];
                //     let tempArrFinish = [];
                //     result.forEach((item) => {
                //         if (item.courseTotalCount == 0) {
                //             tempArrPre.push(item);
                //         } else {
                //             if(item.courseTotalCount == item.courseExpireCount) {
                //                 tempArrFinish.push(item);
                //             } else {
                //                 tempArrGoing.push(item);
                //             }
                //         }
                //     })
                //     that.set('units', result);
                //     that.set('allCls', result);
                //     that.set('preCls', tempArrPre);
                //     that.set('goingCls', tempArrGoing);
                //     that.set('finishCls', tempArrFinish);
                // } else {
                //     that.set('units', []);
                //     that.set('allCls', []);
                //     that.set('preCls', []);
                //     that.set('goingCls', []);
                //     that.set('finishCls', []);
                // }
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

        let rd = this.unit;
        
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
            url: '/api/v1/pushcourseunit/0',
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
    
    delete(callback,params) {
        let delete_unit_payload = this.genIdQuery();
        let rd = this.bmstore.sync(delete_unit_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        if(params){
            rd_tmp['included'][0].attributes.val = params.id
        }
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/deletecourseunit/0',
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

});
