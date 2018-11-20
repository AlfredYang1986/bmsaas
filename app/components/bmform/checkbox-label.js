import Component from '@ember/component';
import { computed } from '@ember/object';
// import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['title', 'limit', 'candidate', 'titlecss', 'btncss', 'curSel'],
    titlecss: '',
    btncss: '',
    curSel: '',
    count: computed('curSel', function(){
        if (this.curSel.length > 0) return 1;
        else return 0;
    }),
    // current: A([]),
    actions: {
        onOneUnselected(ele) {
            // this.set('count', this.count - 1);
            ele.set('isSelected', false);
            // current.removeObject(ele.value);
            this.set('curSel', '');
        },
        onOneSelected(ele) {
            if (this.count < this.limit) {
                // this.set('count', this.count + 1);
                ele.set('isSelected', true);
                // current.pushObject(ele.value);
                this.set('curSel', ele.text);
            }
        }
    }
});
