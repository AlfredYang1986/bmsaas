import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    // bm_session_service: service(),
    positionalParams: ['session'],
    
    actions: {
        addPicOnClick() {
            // let newObj = this.bm_session_service.genNewImgObj('BmTagImg');
            // newObj.tag = "initTag"
            // let tempArr = [];
            // if (this.session.Tagimgs !== null) {
                // tempArr = this.session.Tagimgs;
            // }
            // tempArr.pushObject(newObj);
            // this.set('session.Tagimgs', tempArr)
        },
        deleteImg(param) {
            // this.session.Tagimgs.removeObject(param);
        },
    },
});
