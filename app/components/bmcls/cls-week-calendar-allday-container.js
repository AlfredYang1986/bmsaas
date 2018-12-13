import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'div',
    classNames: ['bm-row', 'bm-week', 'bm-weiget-content'],
    attributeBindings: ['style'],
    didInsertElement() {
        console.log('insert all day container');
    },
    margin: 14,
    height: 38,
    style: computed('margin', 'height', function(){
        return 'margin-right:' + this.margin + 'px;' + 'height:' + this.height + 'px';
    })
});
