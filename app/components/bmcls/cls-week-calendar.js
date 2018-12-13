import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['start_date', 'end_date'],
    classNames: ['bm-view-container'],
    tagName: 'div',
});
