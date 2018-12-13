import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['margin', 'height'],
    tagName: 'div',
    classNames: ['bm-bg'],
    attributeBindings: ['style'],
    didInsertElement() {
        console.log('insert all day bg');
    },
    style: computed('margin', 'height', function(){
        // return 'margin-right:' + this.margin + 'px';
        return 'margin-right:' + this.margin + 'px;' + 'height:' + this.height + 'px';
    })
});