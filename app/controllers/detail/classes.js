import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    bm_class_service: service(),
    bm_sessionable_service: service(),

    cur_idx: 0,

    editClassDlg: false,
    deleteClassDlg: false,

    actions: {
        onTabClicked() {

        },
    },
});
