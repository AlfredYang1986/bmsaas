import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    reserve_number: computed(function(){
        return this.model.res.studs.length;
    }),
    actions: {
        deleteDetail() {
            this.set('reserveDetail', false);
            this.set('deleteDetail', true);
        }
    }
});
