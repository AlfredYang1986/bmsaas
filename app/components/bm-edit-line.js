import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title', 'pholder', 'maxCount', 'isNeeded', 'inputVal','height', 'group'],
    count: computed('inputVal', function() {
        if (typeof this.inputVal == 'string')
            return this.inputVal.length;
        else return 0;
    }),
    countHint: computed('count', 'maxCount', function() {
        if (typeof this.maxCount == 'undefined') return '';
        else return `字数 (${this.count}/${this.maxCount})`;
    }),
});
