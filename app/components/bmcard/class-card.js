import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default Component.extend({
    bmOss: service(),
    positionalParams: ['cls'],
    // attributeBindings: ['style'],
    classNameBindings: ['background'],
    techPics: A([]),
    techPicsOverFlow: 0,
    hasSetCls: computed(function(){
        return this.cls != null;
    }),
    arrangedDate: computed('hasSetCls', function(){
        if (!this.hasSetCls || this.cls.startDate == null) {
            return '没有安排';
        } else {
            let s = new Date(this.cls.startDate);
            let e = new Date(this.cls.endDate);
            return s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() +
                ' - ' + e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()
        }
    }),
    background: computed('hasSetCls', function(){
        if (!this.hasSetCls || this.cls.startDate == null) {
            return;
        } else {
            if (this.cls.courseTotalCount == 0) {
                return "notarr";
            } else {
                if(this.cls.courseTotalCount == this.cls.courseExpireCount) {
                    return "finish";
                } else {
                    return "going";
                }
            }
        }
    }),
    titleColor: computed('background', function(){
        return 'background: ' + this.background + ';'
    }),
    click() {
        this.onClassCardClicked(this.cls.id);
    },

    didReceiveAttrs() {
        if(this.cls.duties != null) {
            this.set("techPics", A([]));
            let client = this.bmOss.get('ossClient');
            for(let idx = 0;idx < this.cls.duties.length;idx++) {
                if(idx < 3) {
                    let tmpObj = {};
                    tmpObj.url = client.signatureUrl(this.cls.duties.objectAt(idx).teacher.get("icon"));
                    this.techPics.pushObject(tmpObj)
                }
            }
            if(this.cls.duties.length > 3) {
                this.set("techPicsOverFlow", this.cls.duties.length - 3)
            }
        } else {
            this.set("techPics", A([]))
            this.set("techPicsOverFlow", 0)
        }
    }

});
