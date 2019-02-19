import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    deleteExpDlg: false,
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },
    actions: {
        cancelHandled() {
            this.set('deleteExpDlg', false);
        },
        onDeleteCourseClick() {
            let that = this;
            let onSuccess = function() {
                that.toast.success('', '删除课程成功', that.toastOptions);
                that.set('deleteExpDlg', false);
                that.transitionToRoute('course');
            }
            let onFail = function() {
                that.toast.error('', '删除课程失败', that.toastOptions);
            }
            this.model.course.deleteRecord(this.model.course)
            this.model.course.save().then(onSuccess, onFail);

        },
    }
});
