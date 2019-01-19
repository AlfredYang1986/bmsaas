import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: false,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            // let that = this
            // let callback = {
            //     onSuccess: function() {
            //         that.transitionToRoute('detail.exp', that.bm_exp_service.expid);
            //     },
            //     onFail: function(/*err*/) {
            //         debug('error');
            //     }
            // }
            // this.bm_session_service.saveUpdate(callback);
            this.model.course.save();
            this.transitionToRoute('exp');
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
