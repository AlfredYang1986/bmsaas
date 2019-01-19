import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: false,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                that.transitionToRoute('actv.exp', that.model.reservable.id);
            }
            let onFail = function ( /*err*/ ) {
                debug('error');
            }
            this.model.course.save().then(onSuccess, onFail);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
