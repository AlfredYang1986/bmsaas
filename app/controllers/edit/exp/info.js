import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    isCreate: false,
    isPushing: false,
    cur_cate_id: '',
    savePicDoneFlag: false,
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                if(that.model.course.category.get("id")) {
                    that.model.course.category.set('title', that.model.course.category.get("title"));
                    let cate = that.store.peekRecord("category", that.model.course.category.get("id"));
                    cate.save();
                }
                that.transitionToRoute('detail.exp', that.model.reservable.id);
            }
            let onFail = function ( /*err*/ ) {
                debug('error');
            }
            if(that.model.course.alb <= that.model.course.aub) {
                if(this.model.course.images.length === 0) {
                    this.model.course.save().then(onSuccess, onFail);
                } else {
                    this.model.course.images.forEach((item, index, arr) => {
                        if(index + 1 == arr.length) {
                            this.set("savePicDoneFlag", true);
                        }
                        if(item.dirtyType !== undefined) {
                            item.save().then(() => {
                                if(this.savePicDoneFlag) {
                                    this.model.course.save().then(onSuccess, onFail);
                                }
                            });
                        } else {
                            if(this.savePicDoneFlag) {
                                this.model.course.save().then(onSuccess, onFail);
                            }
                        }
                    });
                }
            } else {
                that.toast.error('', '请检查年龄信息', that.toastOptions);
            }
        },
        reserveCourse() {},
    },
});
