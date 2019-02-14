import Component from '@ember/component';
import { computed } from '@ember/object';
import { debug } from '@ember/debug';

export default Component.extend({

    init() {
        this._super(...arguments);
        this.get('resizeService').on('didResize', event => {
            debug(event)
            this.set('height', window.innerHeight - 344);
        })
    },

    positionalParams: ['height', 'overflow'],
    tagName: 'div',
    classNames: ['bm-scroller bm-time-grid-container'],
    height: computed(function(){
        return window.innerHeight - 344;
    }),
    attributeBindings: ['style'],
    overflow: 'hidden scroll',
    style: computed('height', 'overflow', function(){
        return 'overflow: ' + this.overflow + ';' +
                'height: ' + this.height + 'px;'
    }),
    inner_height: 1560,
    inner_margin: 0,
    actions: {
        onPanelClick(param) {
            this.onPanelClick(param);
        },
        onEditClick(unit) {
            this.onEditClick(unit);
        },
        onDeleteClick(unit) {
            this.onDeleteClick(unit);
        },
    },
});
