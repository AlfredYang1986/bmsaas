import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

    init() {
        this._super(...arguments);
        this.bm_actv_service.queryLocalMultiObject();
        this.bm_exp_service.queryLocalMultiObject();
        this.bm_yard_service.queryLocalMultiObject();
    },

    mock_data: service(),
    bm_actv_service: service(),
    bm_exp_service: service(),
    bm_yard_service: service(),
    bm_sessionable_service: service(),
    positionalParams: ['apply', 'selectedReservable', 'selectedYard', 'selectedDate', 'selectedActivity', 'selectedSession', 'innerCat', 'courseType'],
    courseReserve: true,
    experienceApply: false,
    course_lst: computed(function(){
        return this.mock_data.courseCandi();
    }),

    // yard_lst: computed(function(){
    //     return this.mock_data.yardCondi();
    // }),
    // activity_lst: computed(function(){
    //     return this.mock_data.activityCandi();
    // }),
    // session_lst: computed('selectedActivity', function(){
        // return this.mock_data.sessionCandi(this.selectedActivity);
    // }),

    exp_session_lst: computed('selectedReservable', function(){
        this.bm_sessionable_service.set('reservableid', this.selectedReservable);
        this.bm_sessionable_service.set('refresh_all_token', this.bm_sessionable_service.guid());
        return ''
    }),

    act_session_lst: computed("selectedActivity", function(){
        this.bm_sessionable_service.set('reservableid', this.selectedActivity);
        this.bm_sessionable_service.set('refresh_all_token', this.bm_sessionable_service.guid());
        return ''
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
        let date = new Date(this.apply.apply_time);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m;
    })
});
