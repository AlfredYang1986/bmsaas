import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['width', 'height', 'bgcolor', 'display_str'],
    tagName: 'div',
    classNames: ['bm-content'],
    margin: 3,
    height: 30,
    width: 50,
    bgcolor: '#FF0000',
    display_str: '',
    attributeBindings: ['style'],
    style: computed('width', 'height', 'margin', 'bgcolor', function(){
        return 'width:' + this.width + 'px;' + 
               'height:' + this.height + 'px;' + 
               'background:' + this.bgcolor + ';' + 
               'margin:' + this.margin + 'px;';
    }),
    didInsertElement() {
        this.onPanelInserted(this);
    }
});
