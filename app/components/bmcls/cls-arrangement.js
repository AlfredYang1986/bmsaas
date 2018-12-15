import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
// import { A } from '@ember/array';

export default Component.extend({
    bm_yard_service: service(),
    bm_clsarr_service: service(),
    selectedYard: '',
    showAddDlg: false,
    refreshSelected: computed(function(){
        var sel = document.getElementById("yardselect");
        this.set('selectedYard', sel.options[sel.selectedIndex].value);
        this.bm_clsarr_service.set('yardid', this.selectedYard);
        this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
        return '';
    }),

    init() {
        this._super(...arguments);
        this.start_date = this.initStartDate().getTime();
    },
    initStartDate() {
        let tmp = new Date();
        tmp.setHours(0);
        tmp.setMinutes(0);
        this.current_date = tmp.getTime();
        while (tmp.getDay() != 1) {
            tmp.setDate(tmp.getDate() - 1)
        }
        return tmp;
    },
    end_date: computed('start_date', function(){
        let tmp = new Date();
        let span = this.start_date + 6 * 24 * 60 * 60 * 1000;
        tmp.setTime(span);
        return tmp.getTime();
    }),
    actions: {
        prevBtnClicked(args) {
            let tmp = new Date();
            let span = this.start_date - 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp.getTime());
        },
        nextBtnClicked(args) {
            let tmp = new Date();
            let span = this.start_date + 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp.getTime());
        },
        todayBtnClicked(args) {

        },
        yardChanged() {
            var sel = document.getElementById("yardselect");
            this.set('selectedYard', sel.options[sel.selectedIndex].value);
            this.bm_clsarr_service.set('yardid', this.selectedYard);
            this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
        },
        cancelHandled() {
            this.set('showAddDlg', false);
        },
        successHandled() {
            this.set('showAddDlg', false);
            this.bm_clsarr_service.units.pushObject('b');
            this.bm_clsarr_service.time_uints.pushObject('ccc');
        }        
    }
});
