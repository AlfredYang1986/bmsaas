import Component from '@ember/component';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({

    bm_clsarr_service: service(),
    tagName: 'div',
    classNames: ['bm-time-skeleton'],
    attributeBindings: ['style'],
    height: 38,
    margin: 14,
    style: computed('height', 'margin', function(){
        return 'height:' + this.height + 'px;' + 'margin-right:' + this.margin + 'px;';
    }),

    mon_lst: A([]),
    tus_lst: A([]),
    wed_lst: A([]),
    thu_lst: A([]),
    fri_lst: A([]),
    sat_lst: A([]),
    sun_lst: A([]),

    actions: {
        panelInserted() {
            console.log('insert time units');
        }
    },

});
