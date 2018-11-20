import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
    positionalParams: ['title', 'subtitle', 'maxCount', 'isNeeded','rowsAmount', 'inputVal'],
    count: computed('inputVal', function() {
        if (typeof this.inputVal == 'string')
            return this.inputVal.length;
        else return 0;
    }),
    countHint: computed('count', 'maxCount', function() {
        return `字数 (${this.count}/${this.maxCount})`;
    })
});
