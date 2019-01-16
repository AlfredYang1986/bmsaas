import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';
import $ from 'jquery';

export default Service.extend({
    bm_config: service(),
    
    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryCourse');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
    },

    refresh_token: '',
    refresh_all_token: '',

    // page: 0,
    // steps: 10,
    curTabIdx: 0,

    courseId: '',
    course: null,
    courses: A([]),
    
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    genPushQuery() {

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
                        val: this.courseId
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
                    res: "BmReservable"
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

    queryCourse() {
        this.bmstore.reset();
        this.set('course', null);

        if (this.courseId.length == 0 || this.courseId == 'course/push') {
            let query_payload = this.genPushQuery();
            let result = this.bmstore.sync(query_payload);
            this.set('course', result);
            return;
        }

        let query_course_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_course_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findteacher/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('course', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    queryMultiObjects() {
        this.bmmulti.reset();

        let query_courses_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_courses_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        let eq2 = rd.Eqcond[1].serialize();
        rd_tmp['included'] = [eq.data, eq2.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findreservablemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('courses', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let rd = this.course;
        
        let arr = [];
        
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/pushbrand/0',
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
