import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title', 'limit', 'candidate', 'titlecss', 'btncss'],
    titlecss: '',
    btncss: '',
    count: 0,
    actions: {
        onOneUnselected(ele) {
            this.set('count', this.count - 1);
            ele.set('isSelected', false);
        },
        onOneSelected(ele) {
            if (this.count < this.limit) {
                this.set('count', this.count + 1);
                ele.set('isSelected', true);
            }
        }
    }
});
