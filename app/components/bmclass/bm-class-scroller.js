import Component from '@ember/component';
import { debug } from '@ember/debug';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    bm_class_service: service(),

    init() {
        this._super(...arguments);
        this.get('resizeService').on('didResize', event => {
            debug(event);
            this.set('height', window.innerHeight - 266);
        })
    },

    positionalParams: ['height', 'overflow'],
    tagName: 'div',
    classNames: ['bm-scroller', 'class-content-panel-scroller'],
    height: computed(function() {
        return window.innerHeight - 266;
    }),
    attributeBindings: ['style'],
    overflow: 'hidden auto',
    style: computed('height', 'overflow', function(){
        return 'height: ' + this.height + 'px;'
         + 'overflow: ' + this.overflow + ';'
    }),
    // innerHeight: 
    actions: {
        cardClicked(id) {
            this.onCardClicked(id);
        }
    }
});
