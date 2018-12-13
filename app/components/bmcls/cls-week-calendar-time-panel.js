import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['left', 'top', 'width', 'height', 'bgcolor', 'display_str'],
    tagName: 'div',
    classNames: ['bm-time-event', 'bm-time-container-panel'],
    margin: 3,
    left: 0,
    top: 100,
    height: 30,
    width: 50,
    bgcolor: '#00FF00',
    display_str: '',
    attributeBindings: ['style'],
    style: computed('width', 'height', 'margin', 'bgcolor', function(){
        return 'left:' + this.left + 'px;' + 
               'top:' + this.top + 'px;' + 
               'width:' + this.width + 'px;' + 
               'height:' + this.height + 'px;' + 
               'background:' + this.bgcolor + ';' + 
               'margin:' + this.margin + 'px;';
    }),
    didInsertElement() {
        this.onPanelInserted(this);
    }
});
