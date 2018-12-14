import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({

    init() {
        this._super(...arguments);
        this.addObserver('showAddSessionDlg', this, 'generateSessionable');
    },

    bm_exp_service: service(),
    bm_sessionable_service: service(),
    bm_yard_service: service(),
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    // openStatus: computed('bm_exp_service', function(){
    //     console.log(this.bm_exp_service.exp)
    //     if(this.bm_exp_service.exp.start_date === -1 || this.bm_exp_service.exp.end_date === -1){
    //         return 1;
    //     }else{
    //         return 0;
    //     }
    // }),


    cur_idx: 0,
    cur_yard_id: "",
    cur_tmp_date: "",
    cur_start_date: "",
    cur_end_date: "",
    edit_flag_info: "",
    noteError: false,
    // couldSubmit: computed('cur_yard_id', function() {
    //     console.log(this.cur_yard_id)
    //     console.log(this.cur_yard_id != null && this.cur_yard_id != "")
    //     return this.cur_yard_id != null && this.cur_yard_id != "";
    // }),

    tmpSessionable: '',


    showAddSessionDlg: false,
    deleteExpDlg: false,
    closeExpDlg: false,
    deleteSessionDlg: false,
    actions: {
        handlePageChange (pageNum) {
            this.set('bm_sessionable_service.page', pageNum - 1)
            this.bm_sessionable_service.queryMultiObjects();
        },
        onTabClicked(tabIdx) {
            this.set('bm_sessionable_service.page', 0)
            if (tabIdx == 0) {
                this.bm_sessionable_service.queryMultiObjects();
            } else {
                // this.bm_sessionable_service.queryMultiObjects();
            }
        },
        linkToExpField(idx) {
            console.log(this.model.expid)
            this.transitionToRoute('detail.exp-field', idx, this.bm_exp_service.exp.id);
        },
        onOpenExpClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    that.toast.success('', '开启成功', that.toastOptions);
                    console.log('OpenExpsuccess')
                },
                onFail: function() {
                    that.toast.error('', '开启失败', that.toastOptions);
                    console.log('OpenExpfail')
                }
            }
            this.set("bm_exp_service.exp.start_date", 0);
            this.set("bm_exp_service.exp.end_date", 0);
            this.bm_exp_service.saveUpdate(callback);
        },
        onShutdownExpClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    that.set('closeExpDlg', false);
                    that.toast.success('', '关闭成功', that.toastOptions);
                    console.log('ShutdownExpsuccess')
                },
                onFail: function() {
                    that.toast.error('', '关闭失败', that.toastOptions);
                    console.log('ShutdownExpfail')
                }
            }
            this.set("bm_exp_service.exp.start_date", -1);
            this.set("bm_exp_service.exp.end_date", -1);
            this.bm_exp_service.saveUpdate(callback);
        },
        onDeleteExpClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    console.log('delete　reservable　success')
                    that.set('deleteExpDlg', false);
                    that.transitionToRoute('exp');
                    that.toast.success('', '删除体验课成功', that.toastOptions);
                },
                onFail: function() {
                    that.toast.error('', '删除体验课失败', that.toastOptions);
                    console.log('delete　reservable　fail')
                }
            }
            this.bm_exp_service.deleteReservable(callback);
        },
        onEditSessionClick(params) {
            this.set('tmpSessionable', params);
            this.set('cur_yard_id', params.Yard.id);
            this.set('cur_tmp_date', params.tmp_date);
            this.set('cur_start_date', params.start_date);
            this.set('cur_end_date', params.end_date);
            this.set('edit_flag_info', "编辑");
            this.set('showAddSessionDlg', true);
            // let sel = document.getElementById('reservableselect');
            // console.log(sel)
            // for(let idx = 0;idx < sel.options.length;idx++){
            //     if (params.Yard.id === sel.options[idx].value) {
            //         sel.options[idx].selected = "selected";
            //     }
            // }
            console.log("onEditSessionClick")
        },
        onDeleteSessionClick(params) {
            this.set('tmpSessionable', params);
            this.set('deleteSessionDlg', true);
        },
        onDeleteSessionClickOk() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    that.bm_sessionable_service.set('refresh_all_token', that.bm_sessionable_service.guid());
                    that.toast.success('', '删除场次成功', that.toastOptions);
                    that.set('deleteSessionDlg', false);
                    console.log('delete　reservable　success')
                },
                onFail: function() {
                    that.toast.error('', '删除场次失败', that.toastOptions);
                    console.log('delete　reservable　fail')
                }
            }
            this.bm_sessionable_service.deleteSessionable(callback,this.tmpSessionable);
            this.set('tmpSessionable', "");
        },
        cancelHandled() {
            this.set('tmpSessionable', "");
            this.set('noteError', false);
            this.set('showAddSessionDlg', false);
            this.set('deleteExpDlg', false);
            this.set('closeExpDlg', false);
            this.set('deleteSessionDlg', false);
        },
        successHandled() {
            if (this.checkValidate()) {

                let that = this;
                let edit_flag_info = "添加";
                if (this.get('edit_flag_info')) {
                    edit_flag_info = this.get('edit_flag_info');
                }
                if (this.cur_yard_id.length == 0) {
                    alert('shold add yard')
                    return
                }
                
                
                let callback = {
                    onSuccess: function() {
                    that.set('showAddSessionDlg', false);
                    that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                    that.bm_sessionable_service.set('refresh_all_token', that.bm_sessionable_service.guid());
                    console.log('push sessionable success')
                },
                onFail: function() {
                    that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                    console.log('push sessionable fail')
                }
            }
            
            this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_exp_service.exp.SessionInfo.id);
            if(this.tmpSessionable === ""){
                this.bm_sessionable_service.resetTechs([]);
                this.bm_sessionable_service.resetAttendee([]);
                this.bm_sessionable_service.saveUpdate(callback);
            }else{
                this.set("tmpSessionable.tmp_date", this.cur_tmp_date);
                this.set("tmpSessionable.start_date", this.cur_start_date);
                this.set("tmpSessionable.end_date", this.cur_end_date);
                this.bm_sessionable_service.resetTechs(this.tmpSessionable.Teachers);
                this.bm_sessionable_service.resetAttendee(this.tmpSessionable.Attendees);
                this.bm_sessionable_service.saveUpdate(callback,this.tmpSessionable);
            }
            
            this.set('edit_flag_info', "");
            this.set('tmpSessionable', "");
            this.set('cur_yard_id', "");
        } else {
            this.set('noteError', true);
        }
        },
        reservableChanged() {
            let sel = document.getElementById('reservableselect');
            if (sel.selectedIndex != 0) {
                this.set('cur_yard_id', sel.options[sel.selectedIndex].value);
            } else {
                this.set('cur_yard_id', "");
            }
            console.log(this.cur_yard_id)
        }
    },

    checkValidate() {
        return this.cur_yard_id != null && this.cur_yard_id != "";
    },
    generateSessionable() {
        if (this.showAddSessionDlg == true) {
            this.bm_sessionable_service.set('sessionableid', 'sessionable/push');
            this.bm_sessionable_service.querySessionable();
        }
    }
});
