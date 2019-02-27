import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    actions: {
        saveCourseBtnClicked() {
            if(Number(this.model.course.alb) > Number(this.model.course.aub)) {
                this.toast.error('', '请检查年龄信息', this.toastOptions);
                return;
            }
            let that = this;
            let onSuccess = function () {
                if(that.model.course.category.get("id")) {
                    that.model.course.category.set('title', that.model.course.category.get("title"));
                    let cate = that.store.peekRecord("category", that.model.course.category.get("id"));
                    cate.save();
                }
                that.transitionToRoute('detail.course', that.model.course.id);
            }
            let onFail = function ( /*err*/ ) {
            }
            // this.model.course.save().then(onSuccess, onFail);
            if(that.model.course.cover) {
                if(this.model.course.images.length === 0) {
                    this.model.course.save().then(onSuccess, onFail);
                } else {
                    this.model.course.images.forEach((item, index, arr) => {
                        if(index + 1 == arr.length) {
                            this.set("savePicDoneFlag", true);
                        }
                        // if(item.dirtyType !== undefined) {
                            item.save().then(() => {
                                if(this.savePicDoneFlag) {
                                    this.model.course.save().then(onSuccess, onFail);
                                }
                            });
                        // }
                    });
                }
            } else {
                that.toast.error('', '请添加封面图片', that.toastOptions);
            }

        },
        cancelCourseBtnClicked() {
            if(this.model.isPushing) {
                this.store.unloadRecord(this.model.course)
                this.transitionToRoute('course');
            } else {
                this.store.unloadRecord(this.model.course);
                this.transitionToRoute('detail.course', this.model.courseid);
            }
        },
    },
});
