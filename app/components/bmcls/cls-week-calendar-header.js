import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['start_date', 'end_date'],
    tagName: 'div',
    classNames: ['bm-row', 'bm-widght-header'],
    attributeBindings: ['style'],
    didInsertElement() {
      
    },
    margin: 14,
    style: computed('margin', function(){
        return 'margin-right: ' + this.margin + 'px'; 
    }),
    cols: computed('start_date', 'end_date', function(){
        let cur = this.start_date;
        let result = A([]);
        do {
            result.pushObject(cur);
            cur += 60 * 60 * 1000 * 24;
        } while (cur <= this.end_date)
        return result;
    })

});
