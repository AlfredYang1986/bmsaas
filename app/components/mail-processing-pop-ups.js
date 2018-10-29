import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    mock_data: service(),
    positionalParams: ['apply', 'selectedReservable', 'selectedYard', 'selectedDate', 'isValidate'],
    courseReserve: true,
    experienceApply: false,
    course_lst: computed(function(){
        return this.mock_data.courseCandi();
    }),
    yard_lst: computed(function(){
        return this.mock_data.yardCondi();
    }),
    isValidate: computed('selectedReservable', 'selectedYard', function(){
        if (this.selectedReservable == null || this.selectedYard == null) {
            return false;
        } else {
            return true;
        }
    }),
    actions: {
        courseReserve() {
            this.set('courseReserve', true);
            this.set('experienceApply', false);
        },
        experienceApply() {
            this.set('experienceApply', true);
            this.set('courseReserve', false)
        },
        reservableChanged() {
            var sel = document.getElementById("reservableselect");
            if (sel.selectedIndex == 0) {
                this.set('selectedReservable', null);
            } else {
                this.set('selectedReservable', sel.options[sel.selectedIndex].value);
            }
        },
        yardChanged() {
            var sel = document.getElementById("yardselect");
            if (sel.selectedIndex == 0) {
                this.set('selectedYard', null);
            } else {
                this.set('selectedYard', sel.options[sel.selectedIndex].value);
            }
        }
    },

    display_apply_date: computed(function(){
        let d = this.apply.apply_date;
        return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    })
});
