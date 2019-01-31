import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Component.extend({
    bmOss: service(),
    positionalParams: ['unit'],

    techPics: A([]),
    techPicsOverFlow: 0,

    actions: {
        onCloseClick() {
            this.onCloseClick();
        },
        onEditClick() {
            this.onEditClick();
        },
        onDeleteClick() {
            this.onDeleteClick();
        },
    },

    didReceiveAttrs() {
        if(this.unit.class.get("teachers") != null) {
            this.set("techPics", A([]));
            let client = this.bmOss.get('ossClient');
            for(let idx = 0;idx < this.unit.class.get("teachers").length;idx++) {
                if(idx < 3) {
                    let tmpObj = {};
                    tmpObj.url = client.signatureUrl(this.unit.class.get("teachers").objectAt(idx).icon);
                    this.techPics.pushObject(tmpObj)
                }
            }
            if(this.unit.class.get("teachers").length > 3) {
                this.set("techPicsOverFlow", this.unit.class.get("teachers").length - 3)
            }
        } else {
            this.set("techPics", A([]))
            this.set("techPicsOverFlow", 0)
        }
    }
});
