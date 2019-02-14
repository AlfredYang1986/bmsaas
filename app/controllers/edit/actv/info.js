import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    isCreate: false,
    isPushing: false,

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
                that.transitionToRoute('detail.actv', that.model.reservable.id);
                that.set("savePicDoneFlag", false)
            }
            let onFail = function ( /*err*/ ) {
                that.set("savePicDoneFlag", false)
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
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
