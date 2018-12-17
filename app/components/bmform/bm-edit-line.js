import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title', 'pholder', 'maxCount', 'notNeeded', 'inputVal','height', 'group', 'largeInput', 'numberInput'],
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
