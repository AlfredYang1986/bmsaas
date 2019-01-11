import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    bm_class_service: service(),
    bm_session_service: service(),
    bm_sessionable_service: service(),
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },


    cur_idx: 0,

    editClassDlg: false,
    deleteClassDlg: false,
    addArrClassDlg: false,
    addStudDlg: false,
    addTechDlg: false,

    actions: {
        cancelHandled() {
            this.set('editClassDlg', false);
            this.set('deleteClassDlg', false);
            this.set('addArrClassDlg', false);
            this.set('addStudDlg', false);
            this.set('addTechDlg', false);
        },
        editClassHandled() {
            this.bm_class_service.resetInfoAndYard(this.bm_class_service.Yard.id, this.bm_class_service.SessionInfo.id);
            this.bm_class_service.resetTechs([]);
            this.bm_class_service.resetAttendee([]);
            let that = this
            let callback = {
                onSuccess: function() {
                    that.set('addClassDlg', false);
                    that.toast.success('', '编辑班级成功', that.toastOptions);
                    that.bm_class_service.set('refresh_all_token', that.bm_class_service.guid());
                    debug('push sessionable success')
                    that.set('addSuccessDlg', true);
                },
                onFail: function() {
                    that.toast.error('', '编辑班级失败', that.toastOptions);
                    debug('push sessionable fail')
                }
            }
            this.bm_class_service.saveUpdate(callback);
        },
        onTabClicked() {

        },
        onDeleteClassClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    debug('delete success')
                    that.set('deleteClassDlg', false);
                    that.transitionToRoute('classes');
                    that.toast.success('', '删除班级成功', that.toastOptions);
                },
                onFail: function() {
                    that.toast.error('', '删除班级失败', that.toastOptions);
                    debug('delete fail')
                }
            }
            this.bm_class_service.delete(callback);
        },
    },
});
