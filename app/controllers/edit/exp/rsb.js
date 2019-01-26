import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: true,
    isPushing: false,

    savePicDoneFlag: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.exp.set('sessioninfo', tmp);
                that.model.exp.save().then(() => {
                    window.console.log("保存出错")
                }, () => {
                    window.console.log("保存正常")
                    that.transitionToRoute('exp');
                })
            }
            let onFail = function () {
            }
            // this.model.si.save().then(onSuccess, onFail);
            if(this.model.si.images.length === 0) {
                this.model.si.save().then(onSuccess, onFail);
            } else {
                this.model.si.images.forEach((item, index, arr) => {
                    if(index + 1 == arr.length) {
                        this.set("savePicDoneFlag", true);
                    }
                    if(item.dirtyType !== undefined) {
                        item.save().then(() => {
                            if(this.savePicDoneFlag) {
                                this.model.si.save().then(onSuccess, onFail);
                            }
                        });
                    }
                });
            }
        },
        reserveCourse() {
            this.transitionToRoute('exp');
        },
    },
});
