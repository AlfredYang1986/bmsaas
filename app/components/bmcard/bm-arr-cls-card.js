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
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',

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
        if(this.unit.get("teacher") != null) {
            this.set("techPics", A([]));
            let client = this.bmOss.get('ossClient');
            let tmpObj = {};
            let tmpIcon = this.unit.get("teacher").get("icon")
            if(tmpIcon == undefined || tmpIcon == '') {
                tmpObj.url = this.headImg
            } else {
                tmpObj.url = client.signatureUrl(tmpIcon);
            }
            this.techPics.pushObject(tmpObj)
        } else {
            this.set("techPics", A([]))
            this.set("techPicsOverFlow", 0)
        }
    }
});
