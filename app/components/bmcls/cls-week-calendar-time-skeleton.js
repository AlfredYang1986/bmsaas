import Component from '@ember/component';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({

    bm_clsarr_service: service(),
    tagName: 'div',
    classNames: ['bm-time-skeleton'],
    attributeBindings: ['style'],
    panelColors: A(["#cddc39", "#8bc34a", "#4caf50", "#009688", "#00bcd4", "#03a9f4", "#2196f3", "#3f51b5", "#673ab7", "#9c27b0"]),
    height: 38,
    margin: 14,
    style: computed('height', 'margin', function(){
        return 'height:' + this.height + 'px;' + 'margin-right:' + this.margin + 'px;';
    }),

    actions: {
        panelInserted() {
            
        },
        onPanelClick(unit) {
            this.onPanelClick(unit);
        },
        onEditClick(unit) {
            this.onEditClick(unit);
        },
        onDeleteClick(unit) {
            this.onDeleteClick(unit);
        },
    },

});
