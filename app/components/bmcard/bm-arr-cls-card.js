import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
    bmOss: service(),
    positionalParams: ['unit'],
    attributeBindings: ['style'],
    style: computed('headColor', function(){
        return 'border-radius:' + '4px;' + 
               'background-color:' + this.headColor;
    }),

    headColor: '#FFB165',
    techPics: A([]),
    techPicsOverFlow: 0,
    isUnit: false,

    actions: {
        onCloseClick() {
            this.onCloseClick();
        },
        onEditClick() {
            this.onEditClick(this.unit);
        },
        onDeleteClick() {
            this.onDeleteClick(this.unit);
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
