import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['cls'],
    hasSetCls: computed(function(){
        return this.cls != null;
    }),
    arrangedDate: computed('hasSetCls', function(){
        if (!this.hasSetCls || this.cls.get('start_date') == null) {
            return '没有安排';
        } else {
            let s = this.cls.get('start_date');
            let e = this.cls.get('end_date');
            return s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() + 
                ' ---- ' + e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()
        }
    }),
    click() {
        this.onClassCardClicked(this.cls.get('id'));
    }
});
