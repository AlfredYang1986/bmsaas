import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_stud_update_service: service(),

    isPushing: false,

    actions: {
        saveInputBtnClicked() {
            // TODO: ...
        },
    },

    studValidate() {
        let valiFlag = true;
        if (this.chd_name.length == 0 ||
            // this.chd_nickname.length == 0 ||
            this.chd_gender_str.length == 0 ||
            this.chd_school.length == 0 ||
            this.par_name.length == 0 ||
            // this.par_nickname.length == 0 ||
            // this.par_rs.length == 0 ||
            this.par_contact.length == 0) {
            valiFlag = false;
        }
        return valiFlag;
        // return this.chd_name.length != 0;
    },
});
