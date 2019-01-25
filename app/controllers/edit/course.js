import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    actions: {
        saveCourseBtnClicked() {
            let that = this;
            let onSuccess = function () {
                that.transitionToRoute('detail.course', that.model.course.id);
            }
            let onFail = function ( /*err*/ ) {
                debug('error');
            }
            // this.model.course.save().then(onSuccess, onFail);
            if(this.model.course.images.length === 0) {
                this.model.course.save().then(onSuccess, onFail);
            } else {
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
                    }
                });
            }
        },
        cancelCourseBtnClicked() {
            if(this.model.isPushing) {
                this.store.unloadRecord(this.model.course)
                this.transitionToRoute('course');
            } else {
                this.store.unloadRecord(this.model.course);
                this.transitionToRoute('detail.course', this.model.courseid);
            }
        },
    },
});
