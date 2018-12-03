import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    tableTitle: ["参与者","孩子","生日","性别", "联系方式", "渠道"],
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

    deleteSessionDlg: false,
    showEditSessionDlg: false,

    actions: {
        onDeleteSessionableClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    that.set('deleteSessionDlg', false);
                    that.transitionToRoute('detail.actv', that.model.reactvid);
                    // that.toast.success('', '删除场次成功', that.toastOptions);
                },
                onFail: function() {
                    console.log('delete　reservable　fail')
                }
            }
            this.bm_sessionable_service.deleteSessionable(callback);
        },
        cancelHandled() {
            this.set('deleteSessionDlg', false);
            this.set('showEditSessionDlg', false);
        },
        successHandled() {
            let that = this;
            if (this.cur_yard_id.length == 0) {
                alert('shold add yard')
                return
            }

            let callback = {
                onSuccess: function() {
                    that.bm_sessionable_service.set('refresh_token', that.bm_sessionable_service.guid());
                    // that.toast.success('', '修改场次成功', that.toastOptions);
                },
                onFail: function() {
                    console.log('push sessionable fail')
                }
            }

            this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_actv_service.actv.SessionInfo.id);
            this.bm_sessionable_service.resetTechs([]);
            this.bm_sessionable_service.resetAttendee([]);
            this.bm_sessionable_service.saveUpdate(callback);

            this.set('cur_yard_id', "");
            this.set('showEditSessionDlg', false);
        },
        reservableChanged() {
            let sel = document.getElementById('reservableselect');
            if (sel.selectedIndex != 0) {
                this.set('cur_yard_id', sel.options[sel.selectedIndex].value);
            }
        },
    }
});
