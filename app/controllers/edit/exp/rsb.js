import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: true,
    isPushing: false,
    cur_cate_id: '',
    savePicDoneFlag: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let imgCount = 0;
            this.set('savePicDoneFlag', false)
            let that = this;
            let onSuccess = function () {
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.exp.set('sessioninfo', tmp);
                that.model.exp.set()
                that.model.exp.save()
                    .then((res) => {
                        that.transitionToRoute('detail.exp', res.id);
                    })
                    .catch(error => window.console.info(error))
            }
            let onFail = function () {
            }
            // this.model.si.save().then(onSuccess, onFail);
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
                            this.model.si.save().then(onSuccess, onFail);
                        }
                    }
                });
            }
        },
        reserveCourse() {
            this.transitionToRoute('exp');
        },
    },
});
