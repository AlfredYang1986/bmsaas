import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    isCreate: true,
    isPushing: false,

    savePicDoneFlag: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.actv.set('sessioninfo', tmp);
                that.model.actv.save().then(() => {
                    // that.transitionToRoute('actv');
                }, () => {
                    that.transitionToRoute('actv');
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
            this.transitionToRoute('actv');
        },
    },
});
