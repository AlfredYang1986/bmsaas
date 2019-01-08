import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';
import $ from 'jquery';

export default Service.extend({
    bm_config: service(),
    
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
        // let fm = this.guid();
        // if(param == 'all') {
            // return {
            //     data: {
            //         id: this.guid(),
            //         type: "Request",
            //         attributes: {
            //             res: "BmSessionable"
            //         },
            //         relationships: {
            //             Fmcond: {
            //                 data:
            //                 {
            //                     id: fm,
            //                     type: "Fmcond"
            //                 }
            //             },
            //             Eqcond: {
            //                 data: [
            //                 {
            //                     id: eq,
            //                     type: "Eqcond"
            //                 }
            //                 ]
            //             }
            //         }
            //     },
            //     included: [
            //         {
            //             id: fm,
            //             type: "Fmcond",
            //             attributes: {
            //                 take: this.steps,
            //                 page: this.page
            //             }
            //         },
            //         {
            //             id: eq,
            //             type: "Eqcond",
            //             attributes: {
            //                 key: 'brandId',
            //                 val: localStorage.getItem('brandid')
            //             }
            //         }
            //     ]
            // }
        // } else {
            return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmSessionable"
                    },
                    relationships: {
                        // Fmcond: {
                        //     data:
                        //     {
                        //         id: fm,
                        //         type: "Fmcond"
                        //     }
                        // },
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
                    // {
                    //     id: fm,
                    //     type: "Fmcond",
                    //     attributes: {
                    //         take: this.steps,
                    //         page: this.page
                    //     }
                    // },
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
            // }
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

        let query_yard_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_yard_payload);
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
                that.set('class', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    queryMultiObjects() {
        this.bmmulti.reset();
        // this.set('classes', A([]));

        let query_classes_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_classes_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        let eq2 = rd.Eqcond[1].serialize();
        rd_tmp['included'] = [eq.data, eq2.data];
        // let fm = rd.Fmcond.serialize();
        // if (param) {
        //     let eq2 = rd.Eqcond[1].serialize();
        //     if(param == "pre") {
        //         eq2.val = 1;
        //         rd_tmp['included'] = [eq.data, eq2.data, fm.data];
        //     } else if(param == "going") {
        //         eq2.val = 2;
        //         rd_tmp['included'] = [eq.data, eq2.data, fm.data];
        //     } else if(param == "finish") {
        //         eq2.val = 3;
        //         rd_tmp['included'] = [eq.data, eq2.data, fm.data];
        //     } else {
        //         rd_tmp['included'] = [eq.data, fm.data];
        //     }
        // } else {
        //     rd_tmp['included'] = [eq.data, fm.data];
        // }
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
                // if(result !== undefined){
                //     for(let idx = 0;idx < result.length;idx++){
                //         result[idx].tmp_date = result[idx].start_date;
                //     }
                // }
                that.set('classes', result);
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

        let rd = this.class;
        
        let arr = [];
        // for (let idx = 0; idx < rd.Honors.length; idx++) {
        //     let tmp = rd.Honors[idx].serialize();
        //     arr.push(tmp.data);
        // }
        
        // for (let idx = 0; idx < rd.Certifications.length; idx++) {
        //     let tmp = rd.Certifications[idx].serialize();
        //     arr.push(tmp.data);
        // }
        
        // let c = rd.Cate.serialize();
        // arr.push(c.data);
        
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        // let tempArr = [];
        // for (let idx = 0;idx < rd_tmp.data.attributes.brand_tags.length;idx++) {
        //     tempArr.push(rd_tmp.data.attributes.brand_tags[idx].text);
        // }
        // rd_tmp.data.attributes.brand_tags = tempArr;

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
