import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['width', 'height', 'bgcolor', 'display_str'],
    tagName: 'div',
    classNames: ['bm-content', 'line_container'],
    margin: 3,
    height: 30,
    width: 96,
    bgcolor: '#F2F6FF',
    display_str: '',
    attributeBindings: ['style'],
    style: computed('width', 'height', 'margin', 'bgcolor', function(){
        return 'width:' + this.width + '%;' + 
               'height:' + this.height + 'px;' + 
               'background:' + this.bgcolor + ';' + 
               'margin:' + this.margin + 'px;';
    }),
    didInsertElement() {
        this.onPanelInserted(this);
    }
});
