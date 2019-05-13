import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    bm_error_service: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    
    cur_idx: 0,
    urls: null,
    // qrCode: 'https://bm-web.oss-cn-beijing.aliyuncs.com/icon_QR.png',
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',

    deleteStudDlg: false,

    actions: {
        deleteStud() {
            this.model.stud.deleteRecord();
            this.model.stud.save().then(() => {
                    this.toast.success('', '学生删除成功', this.toastOptions);
                    this.set('deleteStudDlg', false);
                    this.transitionToRoute("stud")
            }, error => {
                this.bm_error_service.handleError(error, '学生删除失败')
            });
        },
        cancelHandled() {
            this.set('deleteStudDlg', false);
        },
        delBtnClick() {
            this.set('deleteStudDlg', true);
        }
    }

});
