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
            this.model.course.save().then(onSuccess, onFail);
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
