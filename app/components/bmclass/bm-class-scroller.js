import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    init() {
        this._super(...arguments);
        this.get('resizeService').on('didResize', event => {
            this.set('height', window.innerHeight - 266);
        })
    },

    positionalParams: ['height', 'overflow', 'cls'],
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
