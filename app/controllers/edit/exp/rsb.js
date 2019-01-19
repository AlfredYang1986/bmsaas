import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: true,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            this.model.si.save();
            this.model.exp.set('sessioninfo', this.model.si);
            this.model.exp.save();
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
