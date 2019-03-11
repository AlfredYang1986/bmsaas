import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    positionalParams: ['session'],
    tempImgs: null,

    didReceiveAttrs() {
        this.set("tempImgs", this.session.images);
    },
    actions: {
        addPicOnClick() {
            let tempImg = this.store.createRecord("image")
            this.tempImgs.pushObject(tempImg)
        },
        deleteImg(param) {
            this.tempImgs.removeObject(param);
            // this.store.deleteRecord(param)
        },
    },
});
