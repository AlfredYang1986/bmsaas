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
    savePicDoneFlag: false,
    actions: {
        saveCourseBtnClicked() {
            //新建
            if (this.model.isPushing) {
                let imgCount = 0;
                let that = this;
                let onSuccess = function () {
                    if(that.model.course.category.get("id")) {
                        that.model.course.category.set('title', that.model.course.category.get("title"));
                        let cate = that.store.peekRecord("category", that.model.course.category.get("id"));
                        cate.save().then(() => {

                        }, error => {
                            this.bm_error_service.handleError(error)
                        });
                    }
                    let tmp = that.store.peekRecord('sessioninfo', that.model.course.id)
                    that.model.reservable.set('sessioninfo', tmp);
                    that.model.reservable.save().then((res) => {
                        that.transitionToRoute('detail.course', res.id);
                    }, error => {
                        this.bm_error_service.handleError(error)
                    })
                        // .catch(error => window.console.info(error))
                }
                let onFail = function (error) {
                    that.bm_error_service.handleError(error)
                }
                if(that.model.course.cover) {
                    if(Number(that.model.course.alb) <= Number(that.model.course.aub)) {
                        if(this.model.course.images.length === 0) {
                            this.model.course.save().then(onSuccess, onFail);
                        } else {
                            this.model.course.images.forEach((item, index, arr) => {
                                // if(item.id != null && item.id != '') {
                                    if(item.dirtyType !== undefined) {
                                        item.save().then(() => {
                                            if(imgCount + 1 == arr.length) {
                                                this.set("savePicDoneFlag", true);
                                            } else {
                                                this.set("savePicDoneFlag", false);
                                            }
                                            imgCount ++;
                                            if(item.id != null && item.id != '') {
                                                if(this.savePicDoneFlag) {
                                                    this.model.course.save().then(onSuccess, onFail);
                                                }
                                            }
                                        }, error => {
                                            this.bm_error_service.handleError(error)
                                        });
                                    } else {
                                        if(item.id != null && item.id != '') {
                                            if(this.savePicDoneFlag) {
                                                this.model.course.save().then(onSuccess, onFail);
                                            }
                                        }

                                    }
                                // }
                            });
                        }
                    } else {
                        that.toast.error('', '请检查年龄信息', that.toastOptions);
                    }
                } else {
                    that.toast.error('', '请添加封面图片', that.toastOptions);
                }
            }
            //编辑
            else {
                if(Number(this.model.course.alb) > Number(this.model.course.aub)) {
                    this.toast.error('', '请检查年龄信息', this.toastOptions);
                    return;
                }
                let imgCount = 0;
                let that = this;
                let onSuccess = function () {
                    if(that.model.course.category.get("id")) {
                        that.model.course.category.set('title', that.model.course.category.get("title"));
                        let cate = that.store.peekRecord("category", that.model.course.category.get("id"));
                        cate.save().then(() => {
                        }, error => {
                            this.bm_error_service.handleError(error)
                        });
                    }
                    that.transitionToRoute("detail.course", that.model.reservable.id)
                }
                let onFail = function (error) {
                    that.bm_error_service.handleError(error)
                }
                if(that.model.course.cover) {
                    if(Number(that.model.course.alb) <= Number(that.model.course.aub)) {
                        if(this.model.course.images.length === 0) {
                            this.model.course.save().then(onSuccess, onFail);
                        } else {
                            this.model.course.images.forEach((item, index, arr) => {
                                if(imgCount + 1 == arr.length) {
                                    this.set("savePicDoneFlag", true);
                                } else {
                                    this.set("savePicDoneFlag", false);
                                }
                                imgCount ++;
                                // if(item.id != null && item.id != '') {
                                    if(item.dirtyType !== undefined) {
                                        item.save().then(() => {
                                            if(item.id != null && item.id != '') {
                                                if(this.savePicDoneFlag) {
                                                    this.model.course.save().then(onSuccess, onFail);
                                                }
                                            }
                                        }, error => {
                                            this.bm_error_service.handleError(error)
                                        });

                                    } else {
                                        if(item.id != null && item.id != '') {
                                            if(this.savePicDoneFlag) {
                                                this.model.course.save().then(onSuccess, onFail);
                                            }
                                        }
                                    }
                                // }
                            });
                        }
                    } else {
                        that.toast.error('', '请检查年龄信息', that.toastOptions);
                    }
                } else {
                    that.toast.error('', '请添加封面图片', that.toastOptions);
                }
            }
        },
        cancelCourseBtnClicked() {
            if(this.model.isPushing) {
                this.store.unloadRecord(this.model.course)
                this.store.unloadRecord(this.model.reservable);
                this.store.deleteRecord(this.model.cate);
                this.model.cate.save().then(() => {

                }, error => {
                    this.bm_error_service.handleError(error)
                })
                this.transitionToRoute('course');
            } else {
                let resid = this.model.reservable.id;
                this.store.unloadRecord(this.model.course);
                this.store.unloadRecord(this.model.reservable);
                this.transitionToRoute("detail.course", resid)
            }
        },
    },
});
