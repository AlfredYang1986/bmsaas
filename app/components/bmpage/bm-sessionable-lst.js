import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['titles'],
    bm_sessionable_service: service(),
    actions : {
            onClick: function(fieldId) {
                this.sendAction("action", fieldId);
        },
    }
});
