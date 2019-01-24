import Controller from '@ember/controller';

export default Controller.extend({

    isCreate: false,
    isPushing: false,

    savePicDoneFlag: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this;
            let onSuccess = function () {
                that.transitionToRoute('detail.actv', that.model.reservable.id);
                that.set("savePicDoneFlag", false)
            }
            let onFail = function ( /*err*/ ) {
                that.set("savePicDoneFlag", false)
                debug('error');
            }
            this.model.course.images.forEach((item, index, arr) => {
                if(index + 1 == arr.length) {
                    this.set("savePicDoneFlag", true);
                }
                if(item.dirtyType !== undefined) {
                    item.save().then(() => {
                        if(this.savePicDoneFlag) {
                            this.model.course.save().then(onSuccess, onFail);
                        }
                    });
                } else {
                    if(this.savePicDoneFlag) {
                        this.model.course.save().then(onSuccess, onFail);
                    }
                }
            });

            // this.model.course.save().then(onSuccess, onFail);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
