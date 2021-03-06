import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'th',
    classNames: ['bm-axis'],
    attributeBindings: ['style'],
    didInsertElement() {
        
    },
    width: 58,
    style: computed('width', function(){
        return 'width:' + this.width + 'px';
    })
});
