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
        this.refresh_date();
        return '';
    }),

    init() {
        this._super(...arguments);
        this.start_date = this.initStartDate();
        this.end_date = this.computedEndDate();
    },
    initStartDate() {
        let tmp = new Date();
        tmp.setHours(0);
        tmp.setMinutes(0);
        this.current_date = tmp.getTime();
        while (tmp.getDay() != 1) {
            tmp.setDate(tmp.getDate() - 1)
        }
        return tmp.getTime();
    },
    computedEndDate() {
        let tmp = new Date();
        let span = this.start_date + 6 * 24 * 60 * 60 * 1000;
        tmp.setTime(span);
        return tmp.getTime();
    },
    refresh_date() {
        var sel = document.getElementById("yardselect");
        this.set('selectedYard', sel.options[sel.selectedIndex].value);
        this.bm_clsarr_service.set('yardid', this.selectedYard);
        this.bm_clsarr_service.set('st', this.start_date);
        this.bm_clsarr_service.set('et', this.end_date);
        this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
    },
    actions: {
        prevBtnClicked(/*args*/) {
            let tmp = new Date();
            let span = this.start_date - 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp.getTime());
            this.set('end_date', this.computedEndDate());
            this.refresh_date();
        },
        nextBtnClicked(/*args*/) {
            let tmp = new Date();
            let span = this.start_date + 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp.getTime());
            this.set('end_date', this.computedEndDate());
            this.refresh_date();
        },
        todayBtnClicked(/*args*/) {

        },
        yardChanged() {
            this.refresh_date();
        },
        cancelHandled() {
            this.set('showAddDlg', false);
        },
        successHandled() {
            this.set('showAddDlg', false);
        }        
    }
});
