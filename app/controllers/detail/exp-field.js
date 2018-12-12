import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    tableTitle: ["孩子","生日","性别", "联系方式", "渠道"],
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

    cur_yard_id: "",
    cur_tmp_date: "",
    cur_start_date: "",
    cur_end_date: "",
    noteError: false,
    // couldSubmit: computed('cur_yard_id', function() {
    //     return this.cur_yard_id != null && this.cur_yard_id != "";
    // }),

    deleteSessionDlg: false,
    showEditSessionDlg: false,

    actions: {
        onEditSessionable() {
            this.set('cur_yard_id', this.bm_sessionable_service.sessionable.Yard.id);
            this.set('cur_tmp_date', this.bm_sessionable_service.sessionable.tmp_date);
            this.set('cur_start_date', this.bm_sessionable_service.sessionable.start_date);
            this.set('cur_end_date', this.bm_sessionable_service.sessionable.end_date);
            this.set('showEditSessionDlg', true);
        },
        onDeleteSessionableClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    that.set('deleteSessionDlg', false);
                    that.transitionToRoute('detail.exp', that.model.reexpid);
                    that.toast.success('', '删除场次成功', that.toastOptions);
                },
                onFail: function() {
                    that.toast.error('', '删除场次失败', that.toastOptions);
                    console.log('delete　reservable　fail')
                }
            }
            this.bm_sessionable_service.deleteSessionable(callback);
        },
        cancelHandled() {
            this.set('noteError', false);
            this.set('deleteSessionDlg', false);
            this.set('showEditSessionDlg', false);
        },
        successHandled() {
            if (this.checkValidate()) {
            let that = this;
            if (this.cur_yard_id.length == 0) {
                alert('shold add yard')
                return
            }

            this.set("bm_sessionable_service.sessionable.tmp_date", this.cur_tmp_date);
            this.set("bm_sessionable_service.sessionable.start_date", this.cur_start_date);
            this.set("bm_sessionable_service.sessionable.end_date", this.cur_end_date);

            let callback = {
                onSuccess: function() {
                    that.bm_sessionable_service.set('refresh_token', that.bm_sessionable_service.guid());
                    that.toast.success('', '修改场次成功', that.toastOptions);
                },
                onFail: function() {
                    that.toast.error('', '修改场次失败', that.toastOptions);
                    console.log('push sessionable fail')
                }
            }

            this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_exp_service.exp.SessionInfo.id);
            console.log(this.bm_sessionable_service.sessionable.Attendees)
            this.bm_sessionable_service.resetTechs(this.bm_sessionable_service.sessionable.Teachers);
            this.bm_sessionable_service.resetAttendee(this.bm_sessionable_service.sessionable.Attendees);
            this.bm_sessionable_service.saveUpdate(callback);

            this.set('cur_yard_id', "");
            this.set('showEditSessionDlg', false);
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
        },
    },
    checkValidate() {
        return this.cur_yard_id != null && this.cur_yard_id != "";
    },
});
