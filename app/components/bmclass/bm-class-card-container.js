import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Component.extend({
    bm_class_service: service(),
    positionalParams: ['outHeight'],
    tagName: 'div',
    classNames: ['class-content-panel'],
    attributeBindings: ['style'],
    // style: computed('outHeight', function(){
    //     return 'min-height: ' + (this.outHeight - 8) + "px;"
    // }),
    actions: {
        cardClicked(id) {
            debug('card clicked: ' + id);
        }
    }
});
