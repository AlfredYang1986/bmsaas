import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import $ from 'jquery';
import { debug } from '@ember/debug';

export default Service.extend({
    bm_config: service(),

    bm_yard_service: service(),
    bm_session_service: service(),
    bm_tech_service: service(),
    bm_stud_service: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryRoom');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
        this.addObserver('refresh_all_token', this, 'queryRoomCount');
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
    },

    page: 0,
    steps: 10,
    roomid: '',
    yardid: '',
    refresh_token: '',
    room: null,
    rooms: A([]),
    totalCount: 0,
    totalPageCount: 0,
    // attendeesCount: 0,
    // attendeesPageCount: 0,
    // localAttendees: null,
    // localAttendeesPages: null,
    // curAttendeesPage: null,

    queryRoomCount() {
        this.bmstore.reset();

        let query_preCount_payload = this.genCountQuery();
        let rd = this.bmstore.sync(query_preCount_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [eq.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this;
        $.ajax({
            method: 'POST',
            url: '/api/v1/findcount/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('totalCount', result.count);
                let pageCount = result.count / that.steps;
                that.set('totalPageCount', Math.ceil(pageCount));
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },
    queryRoom(callback/*callback*/) {
        this.bmstore.reset();
        this.set('room', null);
        // this.set('localAttendees', null);
        // this.set('localAttendeesPages', null);
        // this.set('curAttendeesPage', null);

        // if (this.roomid.length == 0 || this.roomid == 'room/push') {
        //     let query_payload = this.genPushQuery();
        //     let result = this.bmstore.sync(query_payload);
        //     this.set('room', result);
        //     return;
        // }

        let query_room_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_room_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findroom/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('room', result);
                // that.set('room.tmp_date', result.start_date);
                // if (result.Attendees == null){
                //     that.set('attendeesCount', 0);
                //     that.set('attendeesPageCount', 0);
                // } else {
                //     that.set('attendeesCount', result.Attendees.length);
                //     let pageCount = result.Attendees.length / that.steps;
                //     that.set('attendeesPageCount', Math.ceil(pageCount));

                //     that.set('localAttendees', result.Attendees)
                //     let tmpArr = [];
                //     for(let i = 0, len = that.localAttendees.length;i < len ;i += that.steps){
                //         tmpArr.push(that.localAttendees.slice(i,i + that.steps));
                //     }
                //     that.set('localAttendeesPages',tmpArr)
                //     that.set('curAttendeesPage',tmpArr[0])

                // }
                debug(that.room)
                // console.log(callback)
                // if (callback.onSuccess) {
                //     callback.onSuccess();
                // }
            },
            error: function(err) {
                debug('error is : ', err);
                // if (callback.onFail) {
                //     callback.onFail(err);
                // }
            },
        })
    },
    
    queryMultiObjects() {
        this.bmmulti.reset();
        
        let query_room_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_room_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        let fm = rd.Fmcond.serialize();
        rd_tmp['included'] = [inc.data, fm.data];
        let dt = JSON.stringify(rd_tmp);
        
        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findroommulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                if(result !== undefined){
                    for(let idx = 0;idx < result.length;idx++){
                        result[idx].tmp_date = result[idx].start_date;
                    }
                }
                that.set('rooms', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },

    saveUpdate(callback,params) {
        if (!this.isValidate) {
            return ;
        }

        let ft = this.room;
        if(params){
            ft.id = params.id;
        }
        let arr = [];
        // let s = ft.SessionInfo.serialize();
        // arr.push(s.data);

        // let y = ft.Yard.serialize();
        // arr.push(y.data);

        // let ts = ft.Teachers
        // for (let idx = 0; idx < ts.length; idx++) {
        //     let tmp = ts[idx].serialize();
        //     arr.push(tmp.data);
        // }

        // let ss = ft.Attendees
        // for (let idx = 0; idx < ss.length; idx++) {
        //     let tmp = ss[idx].serialize();
        //     arr.push(tmp.data);
        // }

        let ft_tmp = JSON.parse(JSON.stringify(ft.serialize()));
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp);

        // let that = this;
        $.ajax({
            method: 'POST',
            url: '/api/v1/pushroom/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                // let result = null;
                // this.set("result", that.bmstore.sync(res));
                callback.onSuccess(res);
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },

    deleteRoom(callback) {
        let delete_room_payload = this.genIdQuery();
        let rd = this.bmstore.sync(delete_room_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/deleteroom/0',
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
    
    genCountQuery() {
        let eq = this.guid();
        return {
            data: {
                id: this.guid(),
                type: "Request",
                attributes: {
                    res: "BmRoom"
                },
                relationships: {
                    Eqcond: {
                        data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            },
                        ]
                    }
                }
            },
            included: [
                {
                    id: eq,
                    type: "Eqcond",
                    attributes: {
                        key: "yardId",
                        val: this.bm_yard_service.yardid
                    }
                },
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
                    res: "BmRoom"
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
                        val: this.roomid
                    }
                }
            ]
        }
    },
    

    genPushQuery(/*yardid, sinfoid*/) {
        // TODO: generate more stud

        let room = {
            data: {
                id: this.guid(),
                type: "BmRoom",
                attributes: {
                    title: '',
                    capacity: 0,
                    roomType: 0,
                    yardId: this.bm_yard_service.yardid,
                },
                relationships: {
                }
            },
            included: []
        }

        return room;
    },


    genMultiQuery() {
        let eq = this.guid();
        let fm = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmRoom"
                    },
                    relationships: {
                        Fmcond: {
                            data:
                            {
                                id: fm,
                                type: "Fmcond"
                            }
                        },
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
                        id: fm,
                        type: "Fmcond",
                        attributes: {
                            take: this.steps,
                            page: this.page
                        }
                    },
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "yardId",
                            val: this.bm_yard_service.yardid
                        }
                    },
                ]
            }
    },

    
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    isValidate() {
        return this.room.title.length > 0;
    },

    genNewRoom() {
        let query_payload = this.genPushQuery();
        let result = this.bmstore.sync(query_payload);
        this.set('room', result);
    }


    // resetInfoAndYard(yardid, sinfoid) {
    //     let yard = {
    //         data: {
    //             id: yardid,
    //             type: "BmYard",
    //             attributes: {
    //                 a:0
    //             }
    //         }
    //     }
    //     let sinfo = {
    //         data: {
    //             id: sinfoid,
    //             type: "BmSessionInfo",
    //             attributes: {
    //                 a:0
    //             }
    //         }
    //     }
    //     let yd = this.bmstore.find('BmYard', yardid);
    //     let bs = this.bmstore.find('BmSessionInfo', sinfoid);
    //     if(bs != null){
    //         this.bmstore.destroy(bs);
    //     }
    //     if(yd != null){
    //         this.bmstore.destroy(yd);
    //     }

    //     // this.room.SessionInfo = this.bmstore.sync(sinfo);
    //     // this.room.Yard = this.bmstore.sync(yard);
    //     this.set("room.SessionInfo",this.bmstore.sync(sinfo))
    //     this.set("room.Yard",this.bmstore.sync(yard))
    // },

    // resetTechs(techs) {
    //     let arr = []
    //     if(techs != null){
    //         for (let idx = 0; idx < techs.length; idx++) {
    //             let tech = {
    //                 data: {
    //                     id: techs[idx].id,
    //                     type: "BmTeacher",
    //                     attributes: {
    //                         a:0
    //                     }
    //                 }
    //             }
    //             let tc = this.bmstore.find('BmAttendee', techs[idx].id)
    //             if(tc != null){
    //                 this.bmstore.destroy(tc);
    //             }
    //             arr.push(this.bmstore.sync(tech))
    //         }
    //     }
    //     // this.room.Teachers = arr;
    //     this.set("room.Teachers",arr)
    // },

    // resetAttendee(studs) {
    //     let arr = []
    //     if(studs != null){
    //         for (let idx = 0; idx < studs.length; idx++) {
    //             let stud = {
    //                 data: {
    //                     id: studs[idx].id,
    //                     type: "BmAttendee",
    //                     attributes: {
    //                         a:0
    //                     }
    //                 }
    //             }
    //             let st = this.bmstore.find('BmAttendee', studs[idx].id)
    //             if(st != null){
    //                 this.bmstore.destroy(st);
    //             }
    //             arr.push(this.bmstore.sync(stud))
    //         }
    //     }
    //     // this.room.Attendees = arr;
    //     this.set("room.Attendees",arr)
    // },
});
