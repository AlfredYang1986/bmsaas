import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    actions: {
        saveCourseBtnClicked() {

        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
