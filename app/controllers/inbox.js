import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import bmSessionableService from '../services/bm-sessionable-service';

export default Controller.extend({
    bm_apply_service: service(),
    bm_sessionable_service: service(),
    bm_stud_service: service(),

    mock_data: service(),
    toast: service(),

    cur_tab_idx: 0,
    tabs: ['预约', '预注册'],
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    today_apply_count: computed(function(){
        return this.mock_data.todayApplies().length;
    }),
    older_apply_count: computed(function(){
        return this.mock_data.olderApplies().length;
    }),
    showhandledlg: false,
    current_apply: null,
    showcomfirmdlg: false,

    sr : null,
    sy: null,
    dt: '2018-10-01',

    sa: null,
    ss: null,
    isCourse: true,
    noteError: false,
    noSr: false,
    contentSubmit: computed('sr', 'sa', function() {
        let a = Date.parse( new Date());
        console.log(a)
        this.set('sy', null);
        this.set('ss', null);
        return this.sy == null && this.ss == null;
    }),
    // couldSubmit: computed('sy', 'ss', function() {
    //     return this.sr != null && this.sy != null || this.sa != null && this.ss != null;
    // }),
    actions: {
        saveInfo() {
            this.set('modal3',false);
            let that = this;
            setTimeout(function() {
                that.set('saveInfo',true)
            },500);
        },
        setCurrentApply(item) {
            console.log(item)
            this.set('sr', null);
            this.set('sy', null);
            this.set('sa', null);
            this.set('ss', null);
            this.set('isV', false);
            this.set('current_apply', item);
            this.set('showhandledlg', true);
        },
        toggleAction() {
            let that = this;
            this.set('noteError', false);
            if(this.current_apply.courseType == 1) {
                that.set('current_apply.courseType', 0)
            } else if (this.current_apply.courseType == 0) {
                that.set('current_apply.courseType', 1)
            }
        },
        successSave() {
            this.set('saveInfo',false);
        },
        reserveTypeChanged() {
            let sel = document.getElementById("selectReserve");
            let that = this;
            if (sel.selectedIndex == 1) {
                that.set('bm_apply_service.reserved', that.bm_apply_service.reserveTypeToday);
                that.set('bm_apply_service.amount', that.bm_apply_service.reserveTypeTodayAmount);
            } else {
                that.set('bm_apply_service.reserved', that.bm_apply_service.reserveType);
                that.set('bm_apply_service.amount', that.bm_apply_service.reserveTypeAmount);
            }
        },
        preRegisterChanged() {
            let sel = document.getElementById("selectReserve");
            let that = this;
            if (sel.selectedIndex == 1) {
                that.set('bm_apply_service.preRegistered', that.bm_apply_service.preRegisterToday);
                that.set('bm_apply_service.preAmount', that.bm_apply_service.preRegisterTodayAmount);
            } else {
                that.set('bm_apply_service.preRegistered', that.bm_apply_service.preRegister);
                that.set('bm_apply_service.preAmount', that.bm_apply_service.preRegisterAmount);
            }
        },
        successHandled() {
            if (this.checkValidate()) {
                this.set('couldSubmit', true);

                if (this.current_apply.courseType == 1) {
                    this.signCoureReserve();
                } else if(this.current_apply.courseType == 0){
                    this.signActivityReserve();
                }
                this.set('sr', null);
                this.set('sy', null);
                this.set('sa', null);
                this.set('ss', null);
                this.set('isV', false);
                this.set('current_apply', null);
                this.set('showhandledlg', false);
            } else {
                this.set('noteError', true);
                if (this.current_apply.courseType == 1) {
                    if( this.sr == null && this.sy == null ) {
                        this.set('noSr', true);
                        this.set('noSy', true);
                    } else if(this.sy == null && this.sr != null) {
                        this.set('noSy', true);
                    }
                } else {
                    if(this.sa == null && this.ss == null) {
                        this.set('noSa', true);
                        this.set('noSs', true);
                    } else if(this.sa != null && this.ss == null) {
                        this.set('noSs', true);
                    }
                }

            }

        },
        cancelHandled() {
            this.set('sr', null);
            this.set('sy', null);
            this.set('sa', null);
            this.set('ss', null);
            this.set('isV', false);
            this.set('current_apply', null);
            this.set('noteError', false);
            this.set('noSr', false);
            this.set('noSy', false);
            this.set('noSa', false);
            this.set('noSs', false);
            this.set('showhandledlg', false);
        },
    },
    checkValidate() {
        if (this.current_apply.courseType == 1) {
            // return this.sr != null && this.sy != null && this.dt.length > 0;
            return this.sr != null && this.sy != null
        } else if(this.current_apply.courseType == 0) {
            return this.sa != null && this.ss != null;
        }
    },
    signCoureReserve() {
        var that = this;
        var reservableid = this.sr;
        var sessionableid = this.sy;

        var setStud = {
            onSuccess: function() {
                // that.current_apply.set('status', 1);
                that.set('current_apply', null);
            },
            onFail: function() {
            }
        }

        let st2sess = {
            onSuccess: function() {
                let ori = that.bm_sessionable_service.sessionable.Attendees;
                let count = 0
                if (ori) {
                    count = ori.length;
                }
                let arr = []
                for (let idx = 0; idx < count; idx++) {
                    arr.push(ori[idx]);
                }
                let stud = {"id" : that.bm_stud_service.stud.id};
                arr.push(stud);

                let th = that.bm_sessionable_service.sessionable.Teachers;
                let th_count = 0
                if (th) {
                    th_count = th.length;
                }
                let arr_th = []
                for (let idx = 0; idx < th_count; idx++) {
                    arr_th.push(th[idx].id);
                }

                that.bm_sessionable_service.resetInfoAndYard(
                    that.bm_sessionable_service.sessionable.Yard.id,
                    that.bm_sessionable_service.sessionable.SessionInfo.id);

                that.bm_sessionable_service.resetAttendee(arr);
                that.bm_sessionable_service.resetTechs(arr_th);
                that.bm_sessionable_service.saveUpdate(setStud);
            },
            onFail: function() {
                console.log('query sessionable fail')
            }
        }

        let callback = {
            onSuccess: function() {
                that.bm_sessionable_service.set('reservableid', reservableid);
                that.bm_sessionable_service.set('sessionableid', sessionableid);
                that.bm_sessionable_service.querySessionable2(st2sess);
                that.toast.success('', '处理成功', that.toastOptions);
            },
            onFail: function() {
                that.toast.error('', '处理失败', that.toastOptions);
                console.log('push stud fail')
            }
        }

        let kid = this.current_apply.Kids[0];

        let stud_data = this.bm_stud_service.genPushQueryApply();
        let stud = this.bm_stud_service.bmstore.sync(stud_data);
        stud.name = kid.name;
        stud.nickname = kid.nickname;
        stud.gender = kid.gender;
        stud.reg_date = new Date().getTime();
        stud.dob = kid.dob;
        stud.applyId = this.current_apply.id;


        stud.Guardians[0].name = this.current_apply.Applyee.name;
        stud.Guardians[0].gender = this.current_apply.Applyee.gender;
        stud.Guardians[0].contact = this.current_apply.contact;
        stud.Guardians[0].reg_date = new Date().getTime();
        stud.Guardians[0].relation_ship = kid.guardian_role;

        this.bm_stud_service.set('stud', stud);
        this.bm_stud_service.saveUpdate(callback);

        let callbackPush = {
            onSuccess: function() {
                that.bm_apply_service.set('apply', this.current_apply);
            },
            onFail: function() {
                console.log('push apply fail')
            }
        }
        this.bm_apply_service.set('apply', this.current_apply);
        this.bm_apply_service.saveUpdate(callbackPush);
    },
    signActivityReserve() {
        var that = this;
        var reservableid = this.sa;
        var sessionableid = this.ss;

        var setStud = {
            onSuccess: function() {
                // that.current_apply.set('status', 1);
                that.set('current_apply', null);
            },
            onFail: function() {
            }
        }

        let st2sess = {
            onSuccess: function() {
                let ori = that.bm_sessionable_service.sessionable.Attendees;
                let count = 0
                if (ori) {
                    count = ori.length;
                }
                let arr = []
                for (let idx = 0; idx < count; idx++) {
                    arr.push(ori[idx]);
                }
                let stud = {"id" : that.bm_stud_service.stud.id};
                arr.push(stud);

                let th = that.bm_sessionable_service.sessionable.Teachers;
                let th_count = 0
                if (th) {
                    th_count = th.length;
                }
                let arr_th = []
                for (let idx = 0; idx < th_count; idx++) {
                    arr_th.push(th[idx].id);
                }

                that.bm_sessionable_service.resetInfoAndYard(
                    that.bm_sessionable_service.sessionable.Yard.id,
                    that.bm_sessionable_service.sessionable.SessionInfo.id);

                that.bm_sessionable_service.resetAttendee(arr);
                that.bm_sessionable_service.resetTechs(arr_th);
                that.bm_sessionable_service.saveUpdate(setStud);
            },
            onFail: function() {
                console.log('query sessionable fail')
            }
        }

        let callback = {
            onSuccess: function() {
                that.bm_sessionable_service.set('reservableid', reservableid);
                that.bm_sessionable_service.set('sessionableid', sessionableid);
                that.bm_sessionable_service.querySessionable2(st2sess);
                that.toast.success('', '处理成功', that.toastOptions);
            },
            onFail: function() {
                console.log('push stud fail')
                that.toast.error('', '处理成功', that.toastOptions);
            }
        }

        let kid = this.current_apply.Kids[0];

        let stud_data = this.bm_stud_service.genPushQueryApply();
        let stud = this.bm_stud_service.bmstore.sync(stud_data);
        stud.name = kid.name;
        stud.nickname = kid.nickname;
        stud.gender = kid.gender;
        stud.reg_date = new Date().getTime();
        stud.dob = kid.dob;

        stud.Guardians[0].name = this.current_apply.Applyee.name;
        stud.Guardians[0].gender = this.current_apply.Applyee.gender;
        stud.Guardians[0].contact = this.current_apply.contact;
        stud.Guardians[0].reg_date = new Date().getTime();
        stud.Guardians[0].relation_ship = kid.guardian_role;

        this.bm_stud_service.set('stud', stud);
        this.bm_stud_service.saveUpdate(callback);

        let callbackPush = {
            onSuccess: function() {
                console.log('push apply success')
            },
            onFail: function() {
                console.log('push apply fail')
            }
        }
        this.bm_apply_service.set('apply', this.current_apply);
        this.bm_apply_service.saveUpdate(callbackPush);
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
