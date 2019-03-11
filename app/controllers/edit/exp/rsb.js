import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    saveInfo: false,
    isCreate: true,
    isPushing: false,
    cur_cate_id: '',
    savePicDoneFlag: false,
    bm_error_service: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let imgCount = 0;
            this.set('savePicDoneFlag', false)
            let that = this;
            let onSuccess = function () {
                if(that.model.si.category.get("id")) {
                    that.model.si.category.set('title', that.model.si.category.get("title"));
                    let cate = that.store.peekRecord("category", that.model.si.category.get("id"));
                    cate.save().then(() => {

                    }, error => {
                        this.bm_error_service.handleError(error)
                    });
                }
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.exp.set('sessioninfo', tmp);
                that.model.exp.save()
                    .then((res) => {
                        that.transitionToRoute('detail.exp', res.id);
                    }, error => {
                        this.bm_error_service.handleError(error)
                    })
                    // .catch(error => window.console.info(error))
            }
            let onFail = function (error) {
                that.bm_error_service.handleError(error)
            }
            if(that.model.si.cover) {
                if(Number(that.model.si.alb) == -1 || Number(that.model.si.aub) == -1) {
                    that.set('saveInfo', true)
                } else if(Number(that.model.si.alb) < Number(that.model.si.aub)) {
                    that.set('saveInfo', true)
                } else {
                    that.set('saveInfo', false)
                }
                if(that.saveInfo) {
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
                                }, error => {
                                    this.bm_error_service.handleError(error)
                                });
                            } else {
                                if(this.savePicDoneFlag) {
                                    this.model.si.save().then(onSuccess, onFail);
                                }
                            }
                        });
                    }
                } else {
                    that.toast.error('', '请检查年龄信息', that.toastOptions);
                }
            } else {
                that.toast.error('', '请添加封面图片', that.toastOptions);
            }


        },
        reserveCourse() {
            this.transitionToRoute('exp');
        },
    },
});
