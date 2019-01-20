import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    init() {
        this._super(...arguments);
        // this.addObserver('showAddSessionDlg', this, 'generateSessionable');
        // debug(this.bm_sessionable_service.page)
    },

    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    // openStatus: computed('bm_exp_service', function(){
    //     debug(this.bm_exp_service.exp)
    //     if(this.bm_exp_service.exp.start_date === -1 || this.bm_exp_service.exp.end_date === -1){
    //         return 1;
    //     }else{
    //         return 0;
    //     }
    // }),

    cur_idx: 0,
    cur_yard_id: "",
    cur_tmp_date: Date(),
    cur_start_date: Date(),
    cur_end_date: Date(),
    edit_flag_info: "",
    edit_flag: false,
    noteError: false,
    noteTimeError: false,
    // couldSubmit: computed('cur_yard_id', function() {
    //     debug(this.cur_yard_id)
    //     debug(this.cur_yard_id != null && this.cur_yard_id != "")
    //     return this.cur_yard_id != null && this.cur_yard_id != "";
    // }),

    tmpSessionable: '',

    showAddSessionDlg: false,
    deleteExpDlg: false,
    closeExpDlg: false,
    deleteSessionDlg: false,
    actions: {
        handlePageChange (pageNum) {
            // this.set('bm_sessionable_service.page', pageNum - 1);
            // this.bm_sessionable_service.queryMultiObjects();
        },
        onTabClicked(tabIdx) {
            // this.set('bm_sessionable_service.page', 0);
            // if (tabIdx == 0) {
            //     this.bm_sessionable_service.queryMultiObjects();
            // } else {
            //     // this.bm_sessionable_service.queryMultiObjects();
            // }
        },
        linkToExpField(idx) {
            debug(this.model.expid)
            this.transitionToRoute('detail.exp-field', idx, this.model.exp.id);
        },
        onOpenExpClick() {
            this.model.exp.set("startDate", 0)
            this.model.exp.set("endDate", 0)
            
            let that = this;
            let onSuccess = function() {
                that.set('closeExpDlg', false);
                that.toast.success('', '开启成功', that.toastOptions);
            }
            let onFail = function() {
                that.toast.error('', '开启失败', that.toastOptions);
            }
            this.model.exp.save().then(onSuccess, onFail);
        },
        onShutdownExpClick() {
            this.model.exp.set("startDate", -1)
            this.model.exp.set("endDate", -1)

            let that = this;
            let onSuccess = function() {
                that.set('closeExpDlg', false);
                that.toast.success('', '关闭成功', that.toastOptions);
            }
            let onFail = function() {
                that.toast.error('', '关闭失败', that.toastOptions);
            }
            this.model.exp.save().then(onSuccess, onFail);
        },
        onDeleteExpClick() {
            let that = this;
            for(let idx = 0;idx < this.model.exp.classes.length;idx++) {
                that.model.exp.classes.objectAt(idx).deleteRecord()
                that.model.exp.classes.objectAt(idx).save()
            }
            let onSuccess = function() {
                that.toast.success('', '删除体验课成功', that.toastOptions);
                that.set('deleteExpDlg', false);
                that.transitionToRoute('exp');
            }
            let onFail = function() {
                that.toast.error('', '删除体验课失败', that.toastOptions);
            }
            this.model.exp.deleteRecord(this.model.exp)
            this.model.exp.save().then(onSuccess, onFail);
            
        },
        onEditSessionClick(params) {
            this.set('tmpSessionable', params);
            // this.set('cur_yard_id', params.Yard.id);
            this.set('cur_tmp_date', this.getTimeDay(params.startDate));
            this.set('cur_start_date', params.startDate);
            this.set('cur_end_date', params.endDate);
            this.set('edit_flag_info', "编辑");
            this.set('edit_flag', true);
            this.set('showAddSessionDlg', true);
            // let sel = document.getElementById('reservableselect');
            // debug(sel)
            // for(let idx = 0;idx < sel.options.length;idx++){
            //     if (params.Yard.id === sel.options[idx].value) {
            //         sel.options[idx].selected = "selected";
            //     }
            // }
            debug("onEditSessionClick")
        },
        onDeleteSessionClick(params) {
            this.set('tmpSessionable', params);
            this.set('deleteSessionDlg', true);
        },
        onDeleteSessionClickOk() {
            let that = this;
            let onSuccess = function() {
                that.tmpSessionable.deleteRecord();
                that.tmpSessionable.save();
                that.toast.success('', '删除场次成功', that.toastOptions);
                that.set('deleteSessionDlg', false);
            }
            let onFail = function() {
                that.toast.error('', '删除场次失败', that.toastOptions);
            }
            this.model.exp.classes.removeObject(this.tmpSessionable)
            this.model.exp.save().then(onSuccess, onFail);

            // let callback = {
            //     onSuccess: function() {
            //         that.bm_sessionable_service.set('refresh_all_token', that.bm_sessionable_service.guid());
            //         that.toast.success('', '删除场次成功', that.toastOptions);
            //         that.set('deleteSessionDlg', false);
            //         debug('delete　reservable　success')
            //     },
            //     onFail: function() {
            //         that.toast.error('', '删除场次失败', that.toastOptions);
            //         debug('delete　reservable　fail')
            //     }
            // }
            // this.bm_sessionable_service.deleteSessionable(callback,this.tmpSessionable);
            // this.set('tmpSessionable', "");
        },
        cancelHandled() {
            this.set('tmpSessionable', "");
            this.set('noteError', false);
            this.set('noteTimeError', false);
            this.set('showAddSessionDlg', false);
            this.set('deleteExpDlg', false);
            this.set('closeExpDlg', false);
            this.set('deleteSessionDlg', false);
            this.set('edit_flag', false);
            this.set('cur_tmp_date', new Date());
            this.set('cur_start_date', new Date());
            this.set('cur_end_date', new Date());
        },
        successHandled() {
            if (this.checkValidate() & this.checkTime()) {
                
                let that = this;
                let edit_flag_info = "添加";
                if (this.get('edit_flag_info')) {
                    edit_flag_info = this.get('edit_flag_info');
                }

                if(this.edit_flag) {
                    let onSuccess = function() {
                        that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                        that.set('cur_tmp_date', new Date());
                        that.set('cur_start_date', new Date());
                        that.set('cur_end_date', new Date());
                        that.set('showAddSessionDlg', false);
                    }
                    let onFail = function() {
                        that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                    }
                    this.tmpSessionable.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                    this.tmpSessionable.set("endDate", new Date(this.cur_end_date).getTime())
                    this.tmpSessionable.save().then(onSuccess, onFail)
                    this.set('edit_flag', false);
                }else{
                    let onSuccess = function() {
                        tmpClass.set("yard",that.model.yard)
                        tmpClass.set("sessioninfo",that.model.exp.sessioninfo)
                        tmpClass.save()
                        that.model.exp.classes.pushObject(tmpClass)
                        that.model.exp.save().then(onSuccess1, onFail1)
                    }
                    let onFail = function() {
                        that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                    }

                    let onSuccess1 = function() {
                        that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                        that.set('cur_tmp_date', new Date());
                        that.set('cur_start_date', new Date());
                        that.set('cur_end_date', new Date());
                        that.set('showAddSessionDlg', false);
                    }
                    let onFail1 = function() {
                        that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                    }

                    let tmpClass = this.store.createRecord("class")
                    tmpClass.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                    tmpClass.set("endDate", new Date(this.cur_end_date).getTime())
                    tmpClass.set("status", 1)
                    // tmpClass.set("yard", this.model.yard)

                    tmpClass.save().then(onSuccess, onFail)
                }

                // if (this.cur_yard_id.length == 0) {
                //     alert('shold add yard')
                //     return
                // }
                                
                // let callback = {
                //     onSuccess: function() {
                //         that.set('showAddSessionDlg', false);
                //         that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                //         that.bm_sessionable_service.set('refresh_all_token', that.bm_sessionable_service.guid());
                //         debug('push sessionable success')
                //     },
                //     onFail: function() {
                //         that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                //         debug('push sessionable fail')
                //     }
                // }
            
                // this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_exp_service.exp.SessionInfo.id);
                // if(this.tmpSessionable === ""){
                //     this.bm_sessionable_service.resetTechs([]);
                //     this.bm_sessionable_service.resetAttendee([]);
                //     this.bm_sessionable_service.saveUpdate(callback);
                // }else{
                //     this.set("tmpSessionable.tmp_date", this.cur_tmp_date);
                //     this.set("tmpSessionable.start_date", this.cur_start_date);
                //     this.set("tmpSessionable.end_date", this.cur_end_date);
                //     this.bm_sessionable_service.resetTechs(this.tmpSessionable.Teachers);
                //     this.bm_sessionable_service.resetAttendee(this.tmpSessionable.Attendees);
                //     this.bm_sessionable_service.saveUpdate(callback,this.tmpSessionable);
                // }
            
                // this.set('edit_flag_info', "");
                // this.set('tmpSessionable', "");
                // this.set('cur_yard_id', "");
            } else if (!this.checkValidate() & this.checkTime()) {
                this.set('noteError', true);
                this.set('noteTimeError', false);

            } else if (this.checkValidate() & !this.checkTime()) {
                this.set('noteError', false);
                this.set('noteTimeError', true);
            } else {
                this.set('noteError', true);
                this.set('noteTimeError', true);
            }
        },
        reservableChanged() {
            let sel = document.getElementById('reservableselect');
            if (sel.selectedIndex != 0) {
                this.set('cur_yard_id', sel.options[sel.selectedIndex].value);
            } else {
                this.set('cur_yard_id', "");
            }
        }
    },

    checkValidate() {
        // return this.cur_yard_id != null && this.cur_yard_id != "";
        return true
    },
    checkTime() {
        let checkStart = null;
        let checkEnd = null;
        // if(this.tmpSessionable === "") {
        //     checkStart = new Date(this.bm_sessionable_service.sessionable.start_date);
        //     checkEnd = new Date(this.bm_sessionable_service.sessionable.end_date);
        // } else {
        checkStart = new Date(this.cur_start_date);
        checkEnd = new Date(this.cur_end_date);
        // }
        checkStart.setFullYear(2000);
        checkStart.setMonth(1);
        checkStart.setDate(1);
        checkStart.setSeconds(0);
        checkStart.setMilliseconds(0);
        checkEnd.setFullYear(2000);
        checkEnd.setMonth(1);
        checkEnd.setDate(1);
        checkEnd.setSeconds(0);
        checkEnd.setMilliseconds(0);
        return checkStart <= checkEnd;
    },
    // generateSessionable() {
    //     if (this.showAddSessionDlg == true) {
    //         this.bm_sessionable_service.set('sessionableid', 'sessionable/push');
    //         this.bm_sessionable_service.querySessionable();
    //     }
    // }
    handleDate(date,time) {
        let tmpDate = new Date(date)
        let tmpTime = new Date(time)
        let result = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate(), tmpTime.getHours(), tmpTime.getMinutes(), tmpTime.getSeconds())
        debug(tmpTime)
        debug(result)
        return result.getTime();
    },
    getTimeDay(time) {
        let tmpDate = new Date(time);
        tmpDate.setHours(0);
        tmpDate.setMinutes(0);
        tmpDate.setSeconds(0);
        return tmpDate.getTime();
    }
});
