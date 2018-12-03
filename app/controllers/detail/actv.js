import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    init() {
        this._super(...arguments);
        this.addObserver('showAddSessionDlg', this, 'generateSessionable');
    },

    bm_actv_service: service(),
    bm_sessionable_service: service(),
    bm_yard_service: service(),
    // toast: service(),
    // toastOptions: {
    //     closeButton: false,
    //     positionClass: 'toast-top-center',
    //     progressBar: false,
    //     timeOut: '2000',
    // },

    cur_idx: 0,
    cur_yard_id: '',

    tmpSessionable: '',

    showAddSessionDlg: false,
    deleteActvDlg: false,
    closeActvDlg: false,
    deleteSessionDlg: false,

    actions: {
        linkToActvField(idx) {
            this.transitionToRoute('detail.actv-field', idx, this.bm_actv_service.actv.id);
        },
        onOpenActvClick() {
            // this.toast.success('', '开启成功', this.toastOptions);
            let callback = {
                onSuccess: function() {
                    console.log('OpenActvsuccess')
                },
                onFail: function() {
                    console.log('OpenActvfail')
                }
            }
            this.set("bm_actv_service.actv.start_date", 0);
            this.set("bm_actv_service.actv.end_date", 0);
            this.bm_actv_service.saveUpdate(callback);
        },
        onShutdownActvClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    that.set('closeActvDlg', false);
                    // that.toast.success('', '关闭成功', that.toastOptions);
                    console.log('ShutdownActvsuccess')
                },
                onFail: function() {
                    console.log('ShutdownActvfail')
                }
            }
            this.set("bm_actv_service.actv.start_date", -1);
            this.set("bm_actv_service.actv.end_date", -1);
            this.bm_actv_service.saveUpdate(callback);
        },
        onDeleteActvClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    console.log('delete　reservable　success')
                    that.set('deleteActvDlg', false);
                    that.transitionToRoute('actv');
                    that.toast.success('', '删除活动成功', that.toastOptions);
                },
                onFail: function() {
                    console.log('delete　reservable　fail')
                }
            }
            this.bm_actv_service.deleteReservable(callback);
        },
        onEditSessionClick(params) {
            this.set('tmpSessionable', params);
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
                    console.log('delete　reservable　fail')
                }
            }
            this.bm_sessionable_service.deleteSessionable(callback,this.tmpSessionable);
            this.set('tmpSessionable', "");
        },
        cancelHandled() {
            this.set('showAddSessionDlg', false);
            this.set('deleteActvDlg', false);
            this.set('closeActvDlg', false);
            this.set('deleteSessionDlg', false);
        },
        successHandled() {
            let that = this;
            if (this.cur_yard_id.length == 0) {
                alert('shold add yard')
                return
            }

            let callback = {
                onSuccess: function() {
                    that.set('showAddSessionDlg', false);
                    that.toast.success('', '添加场次成功', that.toastOptions);
                    that.bm_sessionable_service.set('refresh_all_token', that.bm_sessionable_service.guid());
                    console.log('push sessionable success')
                },
                onFail: function() {
                    console.log('push sessionable fail')
                }
            }

            this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_actv_service.actv.SessionInfo.id);
            this.bm_sessionable_service.resetTechs([]);
            this.bm_sessionable_service.resetAttendee([]);
            if(this.tmpSessionable === ""){
                this.bm_sessionable_service.saveUpdate(callback);
            }else{
                this.bm_sessionable_service.saveUpdate(callback,this.tmpSessionable);
            }

            this.set('tmpSessionable', "");
            this.set('cur_yard_id', "");
        },
        reservableChanged() {
            let sel = document.getElementById('reservableselect');
            if (sel.selectedIndex != 0) {
                this.set('cur_yard_id', sel.options[sel.selectedIndex].value);
            }
        }
    },


    generateSessionable() {
        if (this.showAddSessionDlg == true) {
            this.bm_sessionable_service.set('sessionableid', 'sessionable/push');
            this.bm_sessionable_service.querySessionable();
        }
    }
});
