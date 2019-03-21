import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    deleteExpDlg: false,
    bm_error_service: service(),
    toast: service(),
    urls: null,
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    actions: {
        onDeleteCourseClick() {
            let that = this;
            let onSuccess = function() {
                that.toast.success('', '删除课程成功', that.toastOptions);
                that.set('deleteExpDlg', false);
                that.transitionToRoute('course');
            }
            let onFail = function(error) {
                that.bm_error_service.handleError(error, '删除课程失败')
                // that.toast.error('', '删除课程失败', that.toastOptions);
            }
            this.model.course.deleteRecord(this.model.course)
            this.model.course.save().then(onSuccess, onFail);

        },
        onOpenExpClick() {
            this.model.course.set("startDate", 0)
            this.model.course.set("endDate", 0)

            let that = this;
            let onSuccess = function() {
                that.set('closeExpDlg', false);
                that.toast.success('', '开启成功', that.toastOptions);
            }
            let onFail = function(error) {
                that.bm_error_service.handleError(error, '开启失败')
                // that.toast.error('', '开启失败', that.toastOptions);
            }
            this.model.course.save().then(onSuccess, onFail);
        },

        onShutdownExpClick() {
            this.model.course.set("startDate", -1)
            this.model.course.set("endDate", -1)

            let that = this;
            let onSuccess = function() {
                that.set('closeExpDlg', false);
                that.toast.success('', '关闭成功', that.toastOptions);
            }
            let onFail = function(error) {
                that.bm_error_service.handleError(error, '关闭失败')
                that.toast.error('', '关闭失败', that.toastOptions);
            }
            this.model.course.save().then(onSuccess, onFail);
        },
        cancelHandled() {
            this.set('closeExpDlg', false);
        },
        linkToDetail() {
            this.transitionToRoute('edit.course',this.model.course.get('sessioninfo').get('id'), this.model.course.get('id'))
        }
    }
});
