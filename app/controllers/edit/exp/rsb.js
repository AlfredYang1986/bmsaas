import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: true,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                // that.model.exp.sessioninfo = that.model.si;
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.exp.set('sessioninfo', tmp);
                that.model.exp.save().then(() => {
                    // that.transitionToRoute('exp');
                }, () => {
                    that.transitionToRoute('exp');
                })
            }
            let onFail = function () {
            }
            this.model.si.save().then(onSuccess, onFail);
        },
        reserveCourse() {
            this.transitionToRoute('exp');
        },
    },
});
