import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

    bm_clsarr_service: service(),
    
    positionalParams: ['start_date', 'end_date'],
    tagName: 'div',
    classNames: ['bm-scoller', 'bm-time-grid-container', 'bm-skeleton'],
    attributeBindings: ['style'],
    height: 38,
    margin: 14,
    style: computed('overflow', 'height', 'margin', function(){
        return 'height: ' + this.height + 'px;' + 'margin-right:' + this.margin + 'px'; 
    }),

    actions: {
        panelInserted() {
            let tmp = this.height;
            let rows = this.bm_clsarr_service.units.length; // TODO: 七天里面最多的一天
            tmp = rows * (30 + 3) + 3 + 1;
            this.set('height', tmp);
        }
    },
});
