import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: false,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            this.model.course.save();
            this.transitionToRoute('actv');
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
