import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    isCreate: true,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                let tmp = that.store.peekRecord('sessioninfo', that.model.si.id)
                that.model.actv.set('sessioninfo', tmp);
                that.model.actv.save().then(() => {}, () => {})
            }
            let onFail = function () {
            }
            this.model.si.save().then(onSuccess, onFail);
        },
        reserveCourse() {
            this.transitionToRoute('actv');
        },
    },
});
