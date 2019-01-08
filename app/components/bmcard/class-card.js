import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['cls'],
    // attributeBindings: ['style'],
    classNameBindings: ['background'],
    hasSetCls: computed(function(){
        return this.cls != null;
    }),
    arrangedDate: computed('hasSetCls', function(){
        if (!this.hasSetCls || this.cls.start_date == null) {
            return '没有安排';
        } else {
            let s = new Date(this.cls.start_date);
            let e = new Date(this.cls.end_date);
            return s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() + 
                ' ---- ' + e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()
        }
    }),
    background: computed('background', function(){
        if (!this.hasSetCls || this.cls.start_date == null) {
            return;
        } else {
            if (this.cls.courseTotalCount == 0) {
                // return "#5A74DB";
                return "notarr";
            } else {
                if(this.cls.courseTotalCount == this.cls.courseExpireCount) {
                    // return "#98A0AF";
                    return "finish";
                } else {
                    // return "#5ACADC";
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
    }
});
