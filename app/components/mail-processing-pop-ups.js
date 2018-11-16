import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    mock_data: service(),
    store: service(),
    positionalParams: ['apply', 'selectedReservable', 'selectedYard', 'selectedDate', 'selectedActivity', 'selectedSession', 'innerCat'],
    courseReserve: true,
    experienceApply: false,
    course_lst: computed(function(){
        return this.mock_data.courseCandi();
    }),
    yard_lst: computed(function(){
        return this.mock_data.yardCondi();
    }),
    activity_lst: computed(function(){
        return this.mock_data.activityCandi();
    }),
    session_lst: computed('selectedActivity', function(){
        return this.mock_data.sessionCandi(this.selectedActivity);
    }),
    actions: {
        courseReserve() {
            this.set('courseReserve', true);
            this.set('experienceApply', false);
            this.set('innerCat', true);
        },
        experienceApply() {
            this.set('experienceApply', true);
            this.set('courseReserve', false)
            this.set('innerCat', false);
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
        },
        activityChanged() {
            var sel = document.getElementById('actselect');
            if (sel.selectedIndex == 0) {
                this.set('selectedActivity', null);
            } else {
                this.set('selectedActivity', sel.options[sel.selectedIndex].value);
            }
        },
        sessionChanged() {
            var sel = document.getElementById('sessionselect');
            if (sel.selectedIndex == 0) {
                this.set('selectedSession', null);
            } else {
                this.set('selectedSession', sel.options[sel.selectedIndex].value);
            }
        }
    },

    display_apply_date: computed(function(ele){
        let d = new Date(this.apply.apply_time);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    })
});
