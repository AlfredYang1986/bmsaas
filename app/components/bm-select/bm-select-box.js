import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    sel_name: computed(function(){
        return this.guid();
    }),
    sel_id: computed(function(){
        return this.guid();
    }),
    actions: {
        valueChanged() {
            if (this.onValueChanged) {
                let sel = document.getElementById(this.sel_id);
                let sel_idx = sel.selectedIndex;
                this.onValueChanged(sel_idx, sel.options[sel_idx].value);
            }
        }
    },

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
