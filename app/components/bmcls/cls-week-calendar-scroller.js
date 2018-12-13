import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['height', 'overflow'],
    tagName: 'div',
    classNames: ['bm-scroller bm-time-grid-container'],
    height: 300,
    attributeBindings: ['style'],
    overflow: 'hidden scroll',
    style: computed('height', 'overflow', function(){
        return 'overflow: ' + this.overflow + '; height: ' + this.height + 'px;';
    }),
    inner_height: 1000,
    inner_margin: 0,
});
