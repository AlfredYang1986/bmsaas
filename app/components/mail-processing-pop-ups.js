import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['apply'],
    courseReserve: true,
    experienceApply: false,
    actions: {
        courseReserve() {
            this.set('courseReserve', true);
            this.set('experienceApply', false);
        },
        experienceApply() {
            this.set('experienceApply', true);
            this.set('courseReserve', false)
        }
    },

    display_apply_date: computed(function(){
        let d = this.apply.apply_date;
        return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    })
});
