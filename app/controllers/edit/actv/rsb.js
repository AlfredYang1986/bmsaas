import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    isCreate: true,
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
            let imgCount = 0;
            this.set('savePicDoneFlag', false)
            let onSuccess = function () {
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.actv.set('sessioninfo', tmp);
                that.model.actv.save()
                    .then((res) => {
                        that.transitionToRoute('detail.exp', res.id);
                    })
                    .catch(error => window.console.info(error))
            }
            let onFail = function () {
            }
            if(that.model.si.alb <= that.model.si.aub) {
                if(this.model.si.images.length === 0) {
                    this.model.si.save().then(onSuccess, onFail);
                } else {
                    this.model.si.images.forEach((item, index, arr) => {

                        if(item.dirtyType !== undefined) {
                            item.save().then(() => {
                                if(imgCount + 1 == arr.length) {
                                   this.set("savePicDoneFlag", true);
                               }
                               imgCount ++;
                                if(this.savePicDoneFlag) {
                                    this.model.si.save().then(onSuccess, onFail);
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
            this.transitionToRoute('actv');
        },
    },
});
