import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['height', 'margin'],
    tagName: 'div',
    classNames: ['bm-slats'],
    attributeBindings: ['style'],
    style: computed('margin', 'height', function(){
        return 'margin-right:' + this.margin + 'px;' + 'height:' + this.height + 'px';
    }),
    times: A([
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
    ])
});
