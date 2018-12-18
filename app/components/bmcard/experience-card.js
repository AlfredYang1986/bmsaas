import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['activity'],
    periodCount: computed(function(){
        if (this.activity == null) {
            return 0;
        } else {
            return this.activity.periods.length
        }
    }),
    isSetActivity: computed(function(){
        return this.activity != null;
    }),
    click() {
        this.onExperienceCardClick(this.activity.get('id'));
    }
});
